#!/usr/bin/env node
/**
 * X短剧（x-duanju.com）会员会话注入工具（配合 guoapp 站源模块 x-duanju-com 使用）
 *
 * 背景：guoapp 的 JS 站源模块没有「App 内填站点账号」的 UI 入口，会员 Cookie 要手动
 * 写到模块状态文件：
 *   <应用数据目录>\module-x-duanju-com-member
 * 之后 App 里切换任意集时，模块 main.js 的 resolveMedia 会自动读状态文件、取 ?g= 身份票，
 * 让服务端签「全清单」（不截断试看 + 含 1080P）。
 *
 * 用法（Node 18+，无第三方依赖）：
 *   node xduanju-login.js login  <邮箱> <密码> [选项]     # 走站点登录接口取会话
 *   node xduanju-login.js login  --cookie "a=1; b=2" [选项]  # 直接注入浏览器复制的 Cookie
 *   node xduanju-login.js status [选项]                   # 查看已存登录态
 *   node xduanju-login.js logout [选项]                    # 删除已存登录态
 *
 * 选项（定位模块状态文件所在的应用数据目录）：
 *   --dir <路径>   直接指定应用数据目录（里面会有 module-xxx 状态文件 / logs 目录）
 *   --exe <路径>   指定可执行文件路径：便携版取 <exe目录>\userdata，标准版取 exe 同级的 data 目录
 *   （都不带则自动扫描 %LOCALAPPDATA% 下含 module-* 文件的应用数据目录）
 *
 * 状态文件格式：{"cookie":"k1=v1; k2=v2","email":"...","at":"ISO时间"}
 */

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const BASE = "https://x-duanju.com";
const UA =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36";
const STATE_FILE = "module-x-duanju-com-member";
const PROBE_EID = "508055"; // 用于验证登录态的集 id（接口对无效 id 也返回 JSON，安全）

const fail = (msg) => {
  console.error("✗ " + msg);
  process.exit(1);
};

// ---------- 参数解析 ----------

function parseArgs(argv) {
  const args = argv.slice(2);
  const positional = [];
  const opts = {};
  let cookieMode = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--cookie") {
      cookieMode = true;
      opts.cookie = args[++i] || fail("--cookie 需要 Cookie 字符串");
    } else if (a === "--dir") opts.dir = args[++i];
    else if (a === "--exe") opts.exe = args[++i];
    else if (a === "--no-verify") opts.noVerify = true;
    else if (a === "--help" || a === "-h") opts.help = true;
    else positional.push(a);
  }
  return { command: positional[0], email: positional[1], password: positional[2], opts, cookieMode };
}

// ---------- 定位应用数据目录 ----------

function looksLikeDataDir(dir) {
  try {
    const entries = fs.readdirSync(dir);
    if (entries.some((e) => /^module-/.test(e))) return true;
    const logs = path.join(dir, "logs");
    if (fs.existsSync(logs)) return true;
  } catch (e) {}
  return false;
}

function findDataDir(opts) {
  if (opts.dir) {
    if (!fs.existsSync(opts.dir) || !looksLikeDataDir(opts.dir)) {
      fail(`--dir 路径不是应用数据目录（缺少 module-* 文件或 logs/）：${opts.dir}`);
    }
    return path.resolve(opts.dir);
  }
  if (opts.exe) {
    const exeDir = path.dirname(path.resolve(opts.exe));
    for (const sub of ["userdata", "data", ""]) {
      const dir = sub ? path.join(exeDir, sub) : exeDir;
      if (fs.existsSync(dir) && looksLikeDataDir(dir)) return dir;
    }
    fail(`--exe 同级找不到应用数据目录（试了 userdata/ data/ 本身）：${exeDir}`);
  }
  const localAppData =
    process.env.APPDATA || path.join(os.homedir(), "AppData", "Local");
  const candidates = [];
  const roots = [localAppData];
  if (process.env.APPDATA) roots.push(process.env.APPDATA);
  if (process.platform === "win32") roots.push("C:\\ProgramData");
  // 递归两层（AppData 下常是 <org>\<app> 两级）
  const scanDir = (dir, depth) => {
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = path.join(dir, entry.name);
      if (looksLikeDataDir(full)) candidates.push(full);
      if (depth < 2) scanDir(full, depth + 1);
    }
  };
  for (const root of roots) scanDir(root, 0);
  // 便携版：exe 旁的 userdata
  if (process.env.PORTABLE_APPDIR) {
    const dir = process.env.PORTABLE_APPDIR;
    if (looksLikeDataDir(dir)) candidates.push(dir);
  }
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1) {
    console.error("发现多个候选数据目录，请用 --dir 指定：");
    candidates.forEach((c) => console.error("  " + c));
    fail("目录不唯一");
  }
  fail(
    "没找到应用数据目录。启动一次小果影视（或把 App 放到固定位置）后重试，\n" +
      "或用 --dir 手动指定（里面应有 module-* 文件；Windows 标准版一般在 %LOCALAPPDATA%\\<应用名>，\n" +
      "便携版在 <exe 目录>\\userdata）。"
  );
}

// ---------- 站点请求 ----------

async function postLogin(email, password) {
  const res = await fetch(BASE + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": UA,
      Referer: BASE + "/denglu",
      Origin: BASE,
    },
    body: JSON.stringify({ email, password }),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {}
  if (!res.ok || (json && json.ok === false)) {
    fail("登录失败：" + (json && json.error ? json.error : "HTTP " + res.status));
  }
  // 读 Set-Cookie
  let setCookies = [];
  if (typeof res.headers.getSetCookie === "function") {
    setCookies = res.headers.getSetCookie();
  } else {
    const raw = res.headers.get("set-cookie");
    if (raw) setCookies = raw.split(/\r?\n/);
  }
  const cookieString = setCookies
    .map((c) => String(c).split(";")[0].trim())
    .filter(Boolean)
    .join("; ");
  return { cookieString, json };
}

async function checkAccess(cookieString) {
  if (!cookieString) return { loggedIn: false, member: false, hasGrant: false };
  try {
    const res = await fetch(
      `${BASE}/api/play/access?e=${PROBE_EID}`,
      {
        headers: {
          "User-Agent": UA,
          Cookie: cookieString,
          Referer: BASE + "/",
        },
      }
    );
    const json = await res.json();
    return {
      loggedIn:
        Object.prototype.hasOwnProperty.call(json, "progress") ||
        json.member === true ||
        typeof json.grant === "string",
      member: json.member === true,
      hasGrant: typeof json.grant === "string",
      previewCut: json.preview ? json.preview.cut : null,
      raw: json,
    };
  } catch (e) {
    fail("验证登录态失败：" + e.message);
  }
}

function statePath(dataDir) {
  return path.join(dataDir, STATE_FILE);
}

function writeState(dataDir, cookieString, email) {
  const p = statePath(dataDir);
  fs.writeFileSync(
    p,
    JSON.stringify({ cookie: cookieString, email: email || "", at: new Date().toISOString() }),
    "utf8"
  );
  console.log("✓ 已写入 " + p);
}

function readState(dataDir) {
  const p = statePath(dataDir);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

// ---------- 主流程 ----------

async function main() {
  const parsed = parseArgs(process.argv);
  if (parsed.opts.help || !parsed.command) {
    console.log(
      [
        "X短剧会员会话注入工具（配合 guoapp 模块 x-duanju-com）",
        "",
        "  login  <邮箱> <密码> [选项]      走站点登录接口取会话并写入状态文件",
        '  login  --cookie "a=1; b=2" [选项] 直接注入浏览器复制的 Cookie',
        "  status [选项]                   查看已存登录态",
        "  logout [选项]                   删除已存登录态",
        "",
        "选项：",
        "  --dir <路径>   指定应用数据目录（含 module-* 文件）",
        "  --exe <路径>   指定可执行文件（便携版取同级 userdata）",
        "  --no-verify    跳过在线验证（离线写入）",
        "  -h / --help    显示本帮助",
      ].join("\n")
    );
    if (!parsed.command) process.exit(0);
  }

  const dataDir = findDataDir(parsed.opts);
  console.log("数据目录：" + dataDir);

  if (parsed.command === "logout") {
    const p = statePath(dataDir);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log("✓ 已删除 " + p);
    } else {
      console.log("（状态文件不存在，无需删除）");
    }
    return;
  }

  if (parsed.command === "status") {
    const state = readState(dataDir);
    if (!state || !state.cookie) {
      console.log("未存登录 Cookie：状态文件 " + statePath(dataDir) + " 不存在或为空");
      return;
    }
    console.log("已存 Cookie：" + state.cookie.slice(0, 40) + "…（" + state.cookie.length + " 字符）");
    if (state.email) console.log("登录邮箱：" + state.email);
    if (state.at) console.log("写入时间：" + state.at);
    if (parsed.opts.noVerify) return;
    const check = await checkAccess(state.cookie);
    console.log(
      check.loggedIn
        ? `✓ 会话有效：member=${check.member} grant=${check.hasGrant}${check.previewCut ? " 试看截断 " + check.previewCut + "s" : ""}`
        : "✗ 会话已失效，请重新 login"
    );
    return;
  }

  if (parsed.command !== "login") {
    fail("未知命令：" + parsed.command + "（可用 login / status / logout）");
  }

  let cookieString = "";
  let email = "";
  if (parsed.cookieMode) {
    cookieString = parsed.opts.cookie.trim();
    email = "";
    console.log("使用 --cookie 直接注入");
  } else {
    if (!parsed.email || !parsed.password) {
      fail("需要 <邮箱> <密码>，或用 --cookie 直接注入");
    }
    email = parsed.email;
    console.log("登录 " + BASE + "（" + email + "）…");
    const login = await postLogin(email, parsed.password);
    if (!login.cookieString) {
      fail("登录成功但响应没有 Set-Cookie，无法还原会话。改用在浏览器登录后复制 Cookie，用 --cookie 注入。");
    }
    cookieString = login.cookieString;
    console.log("✓ 取得会话 Cookie：" + cookieString.slice(0, 40) + "…");
  }

  if (!parsed.opts.noVerify) {
    const check = await checkAccess(cookieString);
    if (!check.loggedIn) {
      console.warn("警告：带该 Cookie 访问 /api/play/access 仍为游客态（Cookie 可能不完整或已失效）");
    } else {
      console.log(
        "✓ 会话有效：member=" +
          check.member +
          " 有身份票(grant)=" +
          check.hasGrant +
          (check.previewCut ? "，非会员试看截断 " + check.previewCut + "s" : "")
      );
      if (check.member && !check.hasGrant) {
        console.log("  提示：是会员但接口未直接给 grant 字段；播放时由 ?g= 链路实时取票。");
      }
    }
  }

  writeState(dataDir, cookieString, email);
  console.log("");
  console.log("完成。回到 App 里切换任意一集即可（无需重启）：");
  console.log("  - 有会员 Cookie 时 resolveMedia 自动取 ?g= 身份票 → 全量分片 + 1080P");
  console.log("  - 无 Cookie 或 Cookie 失效时退回游客清单（试看段），不影响正常播放");
}

main().catch((e) => fail(e.message || String(e)));
