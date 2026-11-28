#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""根据目录里的脚本，重新生成 xiaoguo.json 订阅清单。

用法：
    python scripts/update_xiaoguo.py xiaoguojs .js
    python scripts/update_xiaoguo.py xiaoguopy .py
    python scripts/update_xiaoguo.py xiaoguojs .js --check   # 只校验不写盘

做的事：
1. 扫描目录下的 .js / .py 文件（跳过 README、zip、示例 json 等）；
2. 从脚本里读显示名：js 取 `meta` 对象里的 `name`，py 取 `getName()` 的返回；
   读不到就沿用旧 xiaoguo.json 里同文件名的 name，再不行用文件名；
3. 按 `{"name": ..., "url": ".\\xx.js"}` 写出 `xiaoguo.json`；
4. 校验：JSON 能解析、每项字段齐全、url 指向的文件真实存在。

退出码：0 正常（含无变化），1 校验失败或参数错误。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

CONFIG_NAME = "xiaoguo.json"
# 目录里可能混着这些，不是脚本。
SKIP_NAMES = {"readme.md", "readme.txt", "license", ".gitkeep", ".ds_store"}


# ── 标题提取 ────────────────────────────────────────────────────────────


def _balanced_braces(text: str, start: int) -> str:
    """从 `text[start] == '{'` 开始，返回配对的 {...} 片段。

    简单括号计数即可：脚本里的 meta 对象几乎不会出现字符串内含未转义花括号
    的情况，且我们只用来找 name 字段，找错也只是退回文件名。
    """
    depth = 0
    in_str: str | None = None
    i = start
    while i < len(text):
        ch = text[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == in_str:
                in_str = None
        elif ch in "\"'`":
            in_str = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[start : i + 1]
        i += 1
    return text[start:]


def js_title(text: str) -> str:
    """js 源：从 `meta = { name: "..." }` 里取显示名。"""
    for match in re.finditer(r"\bmeta\s*=\s*\{", text):
        obj = _balanced_braces(text, match.end() - 1)
        found = re.search(r"""\bname\s*:\s*(['"`])(.*?)\1""", obj, re.S)
        if found:
            title = found.group(2).strip()
            if title:
                return title
    return ""


def _method_body(text: str, start: int) -> str:
    """截出 def 后面的方法体：到下一个同级 def / class 之前。"""
    rest = text[start:]
    probe = "\n" + rest[1:] if rest else "\n"
    found = re.search(r"^[ \t]*(?:def|class)\s+", probe, re.M)
    return rest if found is None else rest[: found.start()]


def py_title(text: str) -> str:
    """py 源显示名：优先 `getName()`，其次 name 属性，最后 meta 字典。

    与 App 侧 `pyNameFromScript` 保持同一套优先级，避免工作流生成的
    `xiaoguo.json` 和沙箱里显示的名字不一致。
    """
    # 1) def getName(self) 的返回值。
    method = re.search(
        r"def\s+getName\s*\(\s*self[^)]*\)\s*(?:->\s*[^:\n]+)?\s*:", text
    )
    if method:
        body = _method_body(text, method.end())
        returned = re.search(r"""\breturn\s+[fFrRbBuU]{0,2}(['"])(.*?)\1""", body, re.S)
        if returned:
            title = returned.group(2).strip()
            if title and "{" not in title:
                return title

    # 2) self.name / name 赋值（卡单词边界，避免 file_name 之类误取）。
    assigned = re.search(r"""(?:^|\W)(?:self\.)?name\s*=\s*(['"])(.*?)\1""", text, re.M)
    if assigned:
        title = assigned.group(2).strip()
        if title and "{" not in title:
            return title

    # 3) meta 字典里的 "name"。
    meta_name = re.search(r"""["']name["']\s*:\s*(['"])(.*?)\1""", text)
    if meta_name:
        title = meta_name.group(2).strip()
        if title and "{" not in title:
            return title

    return ""


def title_of(path: Path) -> str:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return ""
    suffix = path.suffix.lower()
    if suffix == ".js":
        return js_title(text)
    if suffix == ".py":
        return py_title(text)
    return ""


# ── 清单读写 ────────────────────────────────────────────────────────────


def load_existing(config: Path) -> dict[str, str]:
    """旧清单里的「文件名 → name」，用于脚本读不到标题时兜底。"""
    if not config.is_file():
        return {}
    try:
        data = json.loads(config.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    rows = data.get("sources") if isinstance(data, dict) else data
    if not isinstance(rows, list):
        return {}
    mapping: dict[str, str] = {}
    for row in rows:
        if not isinstance(row, dict):
            continue
        url = str(row.get("url") or "").replace("\\", "/").split("/")[-1]
        name = str(row.get("name") or "").strip()
        if url and name:
            mapping[url.lower()] = name
    return mapping


def collect(directory: Path, suffix: str, existing: dict[str, str]):
    """返回 [(文件名, name)]，按文件名排序。"""
    entries = []
    for path in sorted(directory.iterdir(), key=lambda p: p.name.lower()):
        if not path.is_file():
            continue
        if path.name.lower() in SKIP_NAMES:
            continue
        if path.name.lower() == CONFIG_NAME:
            continue
        if path.suffix.lower() != suffix:
            continue
        name = title_of(path) or existing.get(path.name.lower(), "")
        if not name:
            name = path.stem
        entries.append((path.name, name))
    return entries


def render(entries) -> str:
    """生成 JSON 文本。url 用 `.\\xx.js` 形式，json 转义后是 `".\\\\xx.js"`。"""
    rows = [{"name": name, "url": ".\\" + file_name} for file_name, name in entries]
    return json.dumps({"sources": rows}, ensure_ascii=False, indent=2) + "\n"


# ── 校验 ────────────────────────────────────────────────────────────────


def validate(config: Path, directory: Path, suffix: str) -> list[str]:
    problems: list[str] = []
    if not config.is_file():
        return [f"缺少 {config}"]
    try:
        data = json.loads(config.read_text(encoding="utf-8"))
    except ValueError as error:
        return [f"JSON 解析失败：{error}"]

    rows = data.get("sources") if isinstance(data, dict) else None
    if not isinstance(rows, list):
        return ["顶层必须是 {\"sources\": [...]}"]
    if not rows:
        problems.append("sources 是空的")

    seen: set[str] = set()
    for index, row in enumerate(rows):
        where = f"sources[{index}]"
        if not isinstance(row, dict):
            problems.append(f"{where} 不是对象")
            continue
        name = row.get("name")
        url = row.get("url")
        if not isinstance(name, str) or not name.strip():
            problems.append(f"{where}.name 缺失或为空")
        if not isinstance(url, str) or not url.strip():
            problems.append(f"{where}.url 缺失或为空")
            continue
        raw = url.strip()
        # 必须是以 .\ 开头的相对路径（Windows 写法），指向同目录脚本。
        if not raw.startswith(".\\") and not raw.startswith("./"):
            problems.append(f"{where}.url 应为相对路径（.\\xx{suffix}），实际 {raw!r}")
        target = raw.replace("\\", "/").split("/")[-1]
        if not target.lower().endswith(suffix):
            problems.append(f"{where}.url 后缀应为 {suffix}，实际 {target!r}")
        if not (directory / target).is_file():
            problems.append(f"{where}.url 指向的文件不存在：{target}")
        if target.lower() in seen:
            problems.append(f"{where}.url 重复：{target}")
        seen.add(target.lower())

    # 反向检查：目录里的脚本都应该出现在清单里。
    for path in directory.iterdir():
        if (
            path.is_file()
            and path.suffix.lower() == suffix
            and path.name.lower() not in SKIP_NAMES
            and path.name.lower() not in seen
        ):
            problems.append(f"脚本未收录：{path.name}")

    return problems


# ── 入口 ────────────────────────────────────────────────────────────────


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="生成并校验 xiaoguo.json")
    parser.add_argument("directory", help="脚本所在目录，如 xiaoguojs")
    parser.add_argument("suffix", help="脚本后缀，如 .js 或 .py")
    parser.add_argument(
        "--check",
        action="store_true",
        help="只校验现有清单，不写盘",
    )
    args = parser.parse_args(argv)

    directory = Path(args.directory)
    if not directory.is_dir():
        print(f"[x] 目录不存在：{directory}", file=sys.stderr)
        return 1
    suffix = args.suffix if args.suffix.startswith(".") else "." + args.suffix
    config = directory / CONFIG_NAME

    if not args.check:
        existing = load_existing(config)
        entries = collect(directory, suffix, existing)
        if not entries:
            print(f"[!] {directory} 里没有 {suffix} 脚本，保留现有清单")
        else:
            text = render(entries)
            old = config.read_text(encoding="utf-8") if config.is_file() else ""
            if old.strip() == text.strip():
                print(f"[=] {config} 无变化（{len(entries)} 项）")
            else:
                config.write_text(text, encoding="utf-8", newline="\n")
                print(f"[+] 已更新 {config}（{len(entries)} 项）")
                for file_name, name in entries:
                    print(f"      {name}  ->  .\\{file_name}")

    problems = validate(config, directory, suffix)
    if problems:
        print(f"\n[x] 校验失败，{len(problems)} 个问题：", file=sys.stderr)
        for item in problems:
            print(f"    - {item}", file=sys.stderr)
        return 1

    print(f"[ok] {config} 校验通过")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
