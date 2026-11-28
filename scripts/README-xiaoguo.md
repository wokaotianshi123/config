# 自动更新 xiaoguo.json

`xiaoguojs/` 与 `xiaoguopy/` 各有一个 `xiaoguo.json` 订阅清单，列出该目录下
所有可导入的脚本。这两个清单由工作流自动维护，不需要手改。

## 工作流

| 文件 | 目录 | 脚本类型 |
| --- | --- | --- |
| `.github/workflows/update-xiaoguo-js.yml` | `xiaoguojs/` | `.js` |
| `.github/workflows/update-xiaoguo-py.yml` | `xiaoguopy/` | `.py` |

两个工作流**互相独立**，可以分别触发：

- **自动**：往对应目录推送改动（新增 / 删除 / 修改脚本）时触发。
  只改 `xiaoguojs/` 不会跑 py 工作流，反之亦然。
- **手动**：Actions 页面选 `更新 xiaoguo.json（JS）` 或 `更新 xiaoguo.json（PY）`，
  点 **Run workflow**。两个可以单独 Run，互不影响。

跑完会自动提交更新后的 `xiaoguo.json`；内容没变化时不会产生空提交。

## 生成规则

扫描目录下所有 `.js`（或 `.py`），为每个脚本生成一条：

```json
{
  "name": "官方免费短剧",
  "url": ".\\hongguo.js"
}
```

`url` 统一写成 `.\文件名` 的 Windows 相对路径（JSON 里转义成 `.\\文件名`），
客户端按清单自身所在目录解析，因此清单和脚本放在同一目录即可离线导入。

`name` 按以下顺序取：

1. **从脚本里读**：js 取 `meta = { name: "…" }` 的 `name`；
   py 取 `def getName(self): return "…"` 的返回值（也认 `self.name = "…"`
   和 `meta = {"name": "…"}` 两种老写法）。
2. 读不到时，沿用旧 `xiaoguo.json` 里同名文件原来的 `name`（保护已有中文名）。
3. 再取不到，用文件名去扩展名（如 `untitled`）。

App 的 PY 沙箱用的是**同一套优先级**（`pyNameFromScript`），所以清单里的
名称和导入后沙箱里显示的名称一致。

## 校验

工作流里有一道独立的校验步骤（`--check`，只读不写），任何一条不满足都会
让 workflow 失败：

- JSON 能正常解析（单个反斜杠 `.\\x.js` 这类非法转义会被拦下）
- 顶层是 `{"sources": [...]}`，且数组非空
- 每项都有非空的 `name` 和 `url`
- `url` 是以 `.\` 或 `./` 开头的相对路径，后缀与目录类型一致
- `url` 指向的文件真实存在
- 没有重复的 `url`
- **反向检查**：目录里的每个脚本都必须被收录，防止漏项

## 本地手动跑

需要 Python 3.9+，无第三方依赖：

```bash
# 生成 + 校验
python scripts/update_xiaoguo.py xiaoguojs .js
python scripts/update_xiaoguo.py xiaoguopy .py

# 只校验，不改文件
python scripts/update_xiaoguo.py xiaoguojs .js --check
python scripts/update_xiaoguo.py xiaoguopy .py --check
```

退出码 `0` 表示通过（含「无变化」），`1` 表示校验失败或参数错误。
