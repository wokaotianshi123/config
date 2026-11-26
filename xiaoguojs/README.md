# JS 沙箱订阅包示例

这个目录是按 App「导出订阅包」的格式生成的真实样例，用于核对导出 / 导入是否符合预期。

## 包内结构

`guoapp-js-3-2026-11-26.zip`：

```text
guoapp-js-3-2026-11-26.zip
├── volcanoexpo-com.js   国产剧网（id=volcanoexpo-com，v1.0.5）
├── hongguo.js           官方免费短剧（id=hongguo，v1.1.0-dev.24）
├── redguoxianji.js      红果显季（id=hongguo-xianji，v1.0.0）
└── xiaoguo.json         订阅配置（与脚本同层）
```

`xiaoguo.json`:

```json
{
  "sources": [
    {
      "name": "国产剧网",
      "url": ".\\volcanoexpo-com.js"
    },
    {
      "name": "官方免费短剧",
      "url": ".\\hongguo.js"
    },
    {
      "name": "红果显季",
      "url": ".\\redguoxianji.js"
    }
  ]
}
```

> JSON 文件里的 `\\` 是转义，实际值是一个反斜杠：`.\hongguo.js`。

## 预期导入结果

### 1. App / 本地服务版：选这个 zip 导入

`xiaoguo.json` 在包根目录，三条地址都相对它：

```text
.\volcanoexpo-com.js -> 包内 volcanoexpo-com.js -> 安装，meta id=volcanoexpo-com
.\hongguo.js          -> 包内 hongguo.js          -> 安装，meta id=hongguo
.\redguoxianji.js     -> 包内 redguoxianji.js     -> 安装，meta id=hongguo-xianji
```

结果：`已导入 3 个脚本源`，失败列表为空。当前没有启用源时会启用第一个装上的源。

### 2. App：解压后只选 `xiaoguo.json`

App 会读取配置所在目录（`configPath` 的父目录），按相对地址找同目录脚本：

```text
.\hongguo.js -> <解压目录>\hongguo.js -> 读取并安装
```

结果：`已导入 3 个脚本源`。如果只把 `xiaoguo.json` 单独拷走，会逐条提示
`同目录下找不到 hongguo.js`。

### 3. 网址导入订阅

订阅地址是：

```text
https://raw.githubusercontent.com/wokaotianshi123/config/refs/heads/main/xiaoguojs/xiaoguojs.json
```

按订阅自身目录（`.../main/xiaoguojs/`）解析：

```text
.\hongguo.js -> .../main/xiaoguojs/hongguo.js（200）
```

结果：3 个都导入。**注意**：现在仓库里的 `xiaoguojs.json` 仍写成
`.\xiaoguojs\hongguo.js`，按同级目录会解析成
`.../main/xiaoguojs/xiaoguojs/hongguo.js`（404）。新版不再向上级目录猜，
需要把订阅里的地址改成 `.\hongguo.js`，或写绝对地址。

### 4. 单个反斜杠的 JSON

`xiaoguo-单个反斜杠示例.json` 是常见的人写写法：

```json
{"sources":[
 {"name":"国产剧网","url":".\volcanoexpo-com.js"},
 {"name":"官方免费短剧","url":".\hongguo.js"},
 {"name":"红果显季","url":".\redguoxianji.js"}
]}
```

严格 JSON 里 `\h` 是非法转义，直接 `JSON.parse` 会整份失败。导入时会先尝试
严格解析，失败后只修复「`.js` 结尾的字符串」里的单个反斜杠，再解析一次。
因此选它（同目录有 3 个脚本）仍然会导入 3 个源。
