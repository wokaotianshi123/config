// ============================================================================
// 国产剧网 / 橘子影视 (volcanoexpo.com) —— 小果影视 JS 沙箱站源
// 站点程序：Zanpiancms（赞片CMS）
// 运行环境：async/await + fetch + RegExp（不依赖 html.parse，兼容各版本沙箱）
// ============================================================================

// ⚠ meta 必须放在文件最前面：沙箱用裸正则抓第一个 id:/name:，
//   若写在 CATEGORIES（type_id/type_name）之后，会被误读成 dianshiju / 电视剧。
const meta = {
  id: "volcanoexpo-com",
  name: "国产剧网",
  version: "1.0.5",
  description: "国产剧网（橘子影视，volcanoexpo.com）——赞片CMS影视站源，含电视剧/电影/动漫/综艺/短剧等分类。",
  author: "",
  type: "video",
  icon: "",
  features: ["search", "categories"],
};

const BASE = 'https://www.volcanoexpo.com';
// ⚠ 该站 WAF 拦截「完整 Chrome UA」，会返回 404/548B 的 nginx 错误页。
//   实测短 UA（Mozilla/5.0 / curl / 空 UA）均正常返回 200，切勿改回长 UA。
const UA = 'Mozilla/5.0';

// 最近一次请求结果，列表全失败时显示成诊断条目（沙箱 console 是空实现）
var LAST_FETCH = '';

// 站点真实分类；「全部」由 App 自动插入，这里不要写。
// type_id 原样传回 category()，用它拼分类列表 URL。
const CATEGORIES = [
  { type_id: 'dianshiju', type_name: '电视剧' },
  { type_id: 'dianying', type_name: '电影' },
  { type_id: 'dongman', type_name: '动漫' },
  { type_id: 'zongyi', type_name: '综艺' },
  { type_id: 'duanju', type_name: '短剧' },
  { type_id: 'yulexinwen', type_name: '新闻' },
  { type_id: 'guocanju', type_name: '国产剧' },
  { type_id: 'xianggangju', type_name: '港剧' },
  { type_id: 'oumeiju', type_name: '欧美剧' },
  { type_id: 'ribenju', type_name: '日剧' },
  { type_id: 'haiwaiju', type_name: '海外剧' },
  { type_id: 'taiwanju', type_name: '台剧' },
  { type_id: 'hanguoju', type_name: '韩剧' },
  { type_id: 'taiguoju', type_name: '泰剧' },
];

// ---------------------------------------------------------------- 工具函数

function text(value) {
  return value == null ? '' : String(value).trim();
}

function stripTags(value) {
  return String(value == null ? '' : value).replace(/<[^>]*>/g, '');
}

function decodeEntities(value) {
  return String(value == null ? '' : value)
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** 从一段 HTML 标签串里取属性值，不依赖属性顺序。 */
function attrOf(tag, name) {
  const re = new RegExp('\\b' + name + '\\s*=\\s*["\']([^"\']*)["\']', 'i');
  const m = String(tag || '').match(re);
  return m ? decodeEntities(m[1]) : '';
}

/** 相对地址补全为绝对地址。 */
function abs(url) {
  const value = text(url);
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.indexOf('//') === 0) return 'https:' + value;
  if (value.charAt(0) === '/') return BASE + value;
  return BASE + '/' + value;
}

/** 封面归一：必须是 https 绝对地址，否则 App 会丢弃。 */
function cover(url) {
  let value = abs(url);
  if (!value) return '';
  if (value.indexOf('http://') === 0) value = 'https://' + value.slice(7);
  return value;
}

/**
 * 统一请求：永不抛错，失败返回 ''，原因记在 LAST_FETCH。
 * 依次尝试：带 UA+Referer → 只带 UA → 不带任何自定义头（规避沙箱/CORS/反爬差异）。
 * 该站有时返回 HTTP 404 但正文是完整 HTML，所以只要有 /forum/ 链接或 <html 就可用。
 */
async function fetchText(url, options) {
  const opts = options || {};
  const target = abs(url);
  const withRef = {
    'User-Agent': UA,
    Accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9',
  };
  if (opts.referer) withRef.Referer = opts.referer;
  const variants = [withRef, { 'User-Agent': UA }, {}];

  for (let i = 0; i < variants.length; i++) {
    try {
      const response = await fetch(target, {
        method: 'GET',
        headers: variants[i],
        timeoutMs: opts.timeoutMs || 8000,
      });
      let raw = '';
      if (typeof response === 'string') raw = response;
      else if (response && typeof response.text === 'function') raw = await response.text();
      else if (response && typeof response.body === 'string') raw = response.body;
      const status = response ? (response.status || response.statusCode || 0) : 0;
      // 404 但正文含 /forum/ 链接也可解析；否则 4xx 一律视为失败，
      // 避免把 548B 的 nginx 404 页误判成成功。
      const hasItems = /\/forum\/\d+\.html/i.test(raw);
      const looksPage = /<html|<body|<div|<li/i.test(raw);
      // JSON 接口（如搜索）里 /forum/ 常被转义成 \/forum\/，单独放行
      const looksJson = /^\s*[\{\[]/.test(raw) && /"status"|"data"|"vod_/i.test(raw);
      if (raw && (hasItems || looksJson || (status < 400 && looksPage))) {
        LAST_FETCH = 'OK ' + status + '/' + raw.length + 'B';
        return raw;
      }
      LAST_FETCH = 'BAD ' + status + '/' + (raw ? raw.length : 0) + 'B';
    } catch (e) {
      LAST_FETCH = 'FAIL ' + (e && e.message ? e.message : 'err');
    }
  }
  // 最后再试最朴素的 fetch(url)，有些沙箱不接受 options 对象
  try {
    const response = await fetch(target);
    let raw = '';
    if (typeof response === 'string') raw = response;
    else if (response && typeof response.text === 'function') raw = await response.text();
    else if (response && typeof response.body === 'string') raw = response.body;
    const status = response ? (response.status || response.statusCode || 0) : 0;
    const hasItems2 = /\/forum\/\d+\.html/i.test(raw);
    const looksPage2 = /<html|<body|<div|<li/i.test(raw);
    const looksJson2 = /^\s*[\{\[]/.test(raw) && /"status"|"data"|"vod_/i.test(raw);
    if (raw && (hasItems2 || looksJson2 || (status < 400 && looksPage2))) {
      LAST_FETCH = 'OK2 ' + status + '/' + raw.length + 'B';
      return raw;
    }
    LAST_FETCH = 'BAD2 ' + status + '/' + (raw ? raw.length : 0) + 'B';
  } catch (e) {
    LAST_FETCH = 'FAIL2 ' + (e && e.message ? e.message : 'err');
  }
  return '';
}

/** 列表彻底失败时的可见诊断条目（沙箱 console 为空，只能靠界面显示）。 */
function diagnostic(page) {
  return {
    page: page,
    pagecount: page,
    limit: 1,
    total: 1,
    list: [
      {
        vod_id: '0',
        vod_name: '[诊断] 请把这行字发给我：' + LAST_FETCH,
        vod_pic: '',
        vod_remarks: '',
        vod_episodes: 0,
        vod_category: '',
      },
    ],
  };
}

/**
 * 从分页区里找第 pg 页的真实链接（比拼 cid 更可靠，适配全部/分类/月份页）。
 */
function pageHref(body, pg) {
  let m = body.match(
    new RegExp('<a[^>]*href="([^"]+)"[^>]*data="p-' + pg + '"[^>]*>', 'i'),
  );
  if (m) return m[1];
  const re = /<a[^>]*href="([^"]+)"[^>]*>\s*(\d+)\s*<\/a>/gi;
  let x;
  while ((x = re.exec(body)) !== null) {
    if (Number(x[2]) === pg) return x[1];
  }
  return '';
}

/** 取分页总页数。 */
function pagecountOf(body, page) {
  let pagecount = 0;
  const nums = body.match(/data="p-(\d+)"/g) || [];
  for (let i = 0; i < nums.length; i++) {
    const n = parseInt(nums[i].replace(/\D/g, ''), 10);
    if (n > pagecount) pagecount = n;
  }
  if (!pagecount) {
    const m = body.match(/\b(\d+)\s*\/\s*(\d+)\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        const parts = m[i].match(/\d+/g) || [];
        if (parts.length >= 2) {
          const a = parseInt(parts[0], 10);
          const b = parseInt(parts[parts.length - 1], 10);
          if (a === page && b >= page) pagecount = b;
        }
      }
    }
  }
  if (!pagecount && /下一页|next/i.test(body)) pagecount = page + 1;
  return pagecount > page ? pagecount : page;
}

/**
 * 列表页 HTML → category/search 结构。
 *
 * 该站有两种列表布局，旧版只认 <li>+<h5> 导致「全部」空白：
 *   A. 分类页：<li class="col-sm-3"><a class="video-pic" data-original=...>
 *               <div class="title"><h5>标题</h5></div></li>
 *   B. 月份/最新页：<div class="details-info-min">
 *               <div><a class="video-pic" href=... title=... data-original=...></div>
 *               <div><ul class="info"><li><a ...>标题</a></li></ul></div></div>
 * 两种布局的条目主链接都是 <a class="video-pic" ...>，且 href/title/data-original
 * 都在这个标签上（属性顺序不固定），所以用正则逐个抓，布局无关。
 */
function parseVodList(body, page) {
  const items = [];
  const seen = {};
  const primary = [];
  const secondary = [];
  const reAnchor = /<a\b[^>]*>/gi;
  let m;

  while ((m = reAnchor.exec(body)) !== null) {
    if (/\bvideo-pic\b/i.test(m[0])) {
      primary.push({ s: m.index, e: reAnchor.lastIndex, tag: m[0] });
    }
  }
  // 补充：标题链接等其它 /forum/ 锚点（很多列表项并没有 video-pic 类）
  const reForum = /<a\b[^>]*\/forum\/\d+\.html[^>]*>/gi;
  while ((m = reForum.exec(body)) !== null) {
    if (/\bvideo-pic\b/i.test(m[0])) continue;
    secondary.push({ s: m.index, e: reForum.lastIndex, tag: m[0] });
  }

  const groups = [primary, secondary];
  for (let g = 0; g < groups.length; g++) {
    const anchors = groups[g];
    for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    const hm = a.tag.match(/\/forum\/(\d+)\.html/i);
    if (!hm) continue;
    const vid = hm[1];
    if (seen[vid]) continue;

    const nxt = i + 1 < anchors.length ? anchors[i + 1].s : Math.min(a.e + 4000, body.length);
    const win = body.slice(a.s, nxt);

    let title = decodeEntities(attrOf(a.tag, 'title'));
    if (!title) {
      const h5 = win.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i);
      if (h5) title = stripTags(h5[1]);
    }
    title = text(title);
    if (!title) continue;

    let picRaw =
      attrOf(a.tag, 'data-original') ||
      attrOf(a.tag, 'data-src') ||
      attrOf(a.tag, 'src');
    if (!picRaw) {
      const pm = win.match(/url\(['"]?([^'")]+\.(?:jpg|jpeg|png|webp)[^'")]*)['"]?\)/i);
      if (pm) picRaw = pm[1];
    }

    const note = win.match(/class="note[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    const remarks = note ? text(stripTags(note[1])) : '';

    seen[vid] = 1;
    items.push({
      vod_id: vid,
      vod_name: title,
      vod_pic: cover(picRaw),
      vod_remarks: remarks,
      vod_episodes: 0,
      vod_category: '',
    });
  }
  }

  return {
    page: page,
    pagecount: pagecountOf(body, page),
    limit: items.length,
    total: items.length,
    list: items,
  };
}

// ---------------------------------------------------------------- 必选函数

async function init(ext) {
  return true;
}

async function home(filter) {
  return { class: CATEGORIES, filters: {} };
}

/**
 * 分类列表。依次尝试多个地址，任何一个解析出条目就返回；
 * 全失败时返回可见诊断条目，便于定位沙箱里到底拿到了什么。
 */
async function category(tid, page, filter, extend) {
  const pg = Number(page) || 1;
  const id = text(tid).replace(/^\/+|\/+$/g, '');
  const dir = id || 'dianshiju';
  const api = '/index.php?s=home-up-show&dir=' + dir + '&type=ls&p=' + pg;

  const candidates = id
    ? ['/' + id + '/', '/' + id + '/1.html', api, '/new.html', '/']
    : ['/new.html', '/', '/dianshiju/', api];

  let body = '';
  let result = null;
  for (let i = 0; i < candidates.length; i++) {
    const b = await fetchText(candidates[i], { referer: BASE + '/' });
    const r = parseVodList(b, pg);
    if (r.list.length) {
      body = b;
      result = r;
      break;
    }
  }
  if (!result) return diagnostic(pg);

  // 第 N 页：优先用分页区 data="p-N" 的真实链接（API 候选已直接带 p 参数）
  if (pg > 1 && body) {
    const href = pageHref(body, pg);
    if (href) {
      const paged = await fetchText(href, { referer: BASE + '/' });
      const r2 = parseVodList(paged, pg);
      if (r2.list.length) result = r2;
    }
  }
  return result;
}

/**
 * 详情页：标题、封面、简介与多线路分集。
 *
 * 赞片CMS 详情页有多条线路，对应 con_playlist_1/2/3，
 * 线路名在 <a href="#con_playlist_N">快播/暴风/无尽</a>，
 * 分集链接形如 /bofang/{id}-{line}-{ep}.html（中间数字就是线路号）。
 * 旧版把所有线路混成一条、写死「暴风」，导致线路切换不出现。
 */
async function detail(id) {
  const sourceId = text(id).split(':').pop();
  const body = await fetchText('/forum/' + sourceId + '.html', { referer: BASE + '/' });

  const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1 ? text(stripTags(h1[1])) : '';

  let pic = '';
  const pm =
    body.match(/url\(['"]?([^'")]+\.(?:jpg|jpeg|png|webp)[^'")]*)['"]?\)/i) ||
    body.match(/data-original="([^"]+)"/i) ||
    body.match(/<img[^>]+src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
  if (pm) pic = cover(pm[1]);

  let desc = '';
  const dm =
    body.match(/class="details-content-all[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
    body.match(/class="details-content-default[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
  if (dm) desc = text(stripTags(dm[1]));

  // 线路名：#con_playlist_N → 中文名（如 快播 / 暴风 / 无尽）
  const routeNames = {};
  const reTab = /<a[^>]*href="#con_playlist_(\d+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = reTab.exec(body)) !== null) {
    if (!routeNames[m[1]]) routeNames[m[1]] = text(stripTags(m[2]));
  }

  // 线路编号：按 /bofang/{id}-{line}-{ep}.html 里 line 的出现顺序
  const lineOrder = [];
  const seenLine = {};
  const reAll = /\/bofang\/\d+-(\d+)-\d+\.html/gi;
  while ((m = reAll.exec(body)) !== null) {
    if (!seenLine[m[1]]) {
      seenLine[m[1]] = 1;
      lineOrder.push(m[1]);
    }
  }

  // 按线路号排序，保证顺序稳定（快播/暴风/无尽），不随 HTML 出现顺序变化
  lineOrder.sort(function (a, b) { return Number(a) - Number(b); });

  const routes = [];
  for (let i = 0; i < lineOrder.length; i++) {
    const line = lineOrder[i];
    const name = routeNames[line] || ('线路 ' + line);
    const eps = [];
    const seenEp = {};
    const re = new RegExp(
      '<a[^>]*href="(/bofang/\\d+-' + line + '-\\d+\\.html)"[^>]*>([\\s\\S]*?)</a>',
      'gi',
    );
    let x;
    while ((x = re.exec(body)) !== null) {
      const href = x[1];
      const em = href.match(/-(\d+)\.html$/);
      if (!em || seenEp[em[1]]) continue;
      seenEp[em[1]] = 1;
      // 集名用纯数字，兼容「详情页只展示第一条线路、播放页按线路 N 切换」的补丁
      const label = text(stripTags(x[2])).replace(/\D/g, '') || String(eps.length + 1);
      eps.push(label + '$' + href);
    }
    if (eps.length) routes.push({ name: name, eps: eps });
  }

  if (!title && !routes.length) return { list: [] };

  const names = [];
  const urls = [];
  let maxEp = 0;
  for (let i = 0; i < routes.length; i++) {
    names.push(routes[i].name);
    urls.push(routes[i].eps.join('#'));
    if (routes[i].eps.length > maxEp) maxEp = routes[i].eps.length;
  }

  return {
    list: [
      {
        vod_id: sourceId,
        vod_name: title || '视频 ' + sourceId,
        vod_pic: pic,
        vod_content: desc,
        vod_remarks: maxEp ? '全' + maxEp + '集' : '',
        vod_episodes: maxEp,
        vod_category: '',
        // 多线路：线路名与 $$$ 分段一一对应
        vod_play_from: names.join('$$$'),
        vod_play_url: urls.join('$$$'),
        routeCount: routes.length,
        vod_tag: '',
      },
    ],
  };
}

/**
 * 播放取流：请求播放页，从 zanpiancms_player 的 JSON 里取 url（m3u8/mp4）。
 */
async function play(flag, id, flags) {
  const target = text(id);

  // 已经是直链：直接交给播放器
  if (/^https?:\/\/.+\.(?:m3u8|mp4)(?:[?#]|$)/i.test(target)) {
    return { parse: 0, url: target, header: { 'User-Agent': UA, Referer: BASE + '/' } };
  }

  const pageUrl = target.charAt(0) === '/' ? target : '/bofang/' + target;
  let body = '';
  try {
    body = await fetchText(pageUrl, { referer: BASE + '/' });
  } catch (e) {
    return { parse: 0, url: '', header: {}, error: 'FETCH_FAIL' };
  }

  let url = '';

  // 1) var zanpiancms_player = {"url":"...m3u8", ...};
  const cfg = body.match(/zanpiancms_player\s*=\s*(\{[\s\S]*?\})\s*;?\s*<\/script>/i);
  if (cfg) {
    try {
      const parsed = JSON.parse(cfg[1]);
      url = text(parsed.url);
    } catch (_) {
      const u = cfg[1].match(/"url"\s*:\s*"((?:[^"\\]|\\.)+)"/i);
      if (u) {
        try { url = JSON.parse('"' + u[1] + '"'); } catch (_) { url = u[1]; }
      }
    }
  }

  // 2) 兜底：页面里任意 m3u8/mp4 直链
  if (!url) {
    const direct = body.match(/https?:\/\/[^"'\\\s<>]+\.(?:m3u8|mp4)(?:[?#][^"'\\\s<>]*)?/i);
    if (direct) url = direct[0];
  }

  if (!url) return { parse: 0, url: '', header: {}, error: 'NO_STREAM' };

  return {
    parse: 0,
    url: url,
    header: { 'User-Agent': UA, Referer: BASE + '/' },
  };
}

// ---------------------------------------------------------------- 可选函数

/**
 * 搜索：优先站点 JSON 接口 /index.php?s=/home/search/vod（最多 10 条），
 * 失败退化到静态 /search/{wd}.html。
 */
async function search(word, quick, page) {
  const pg = Number(page) || 1;
  const kw = text(word);

  try {
    const api =
      '/index.php?s=/home/search/vod&q=' + encodeURIComponent(kw) + '&limit=10';
    const raw = await fetchText(api, { referer: BASE + '/' });
    const obj = JSON.parse(raw);
    if (obj && (obj.status === 1 || obj.info === 'ok') && obj.data && obj.data.length) {
      const list = [];
      for (let i = 0; i < obj.data.length; i++) {
        const item = obj.data[i];
        const m = String(item.vod_url || '')
          .replace(/\\\//g, '/')
          .match(/\/forum\/(\d+)\.html/);
        if (!m) continue;
        list.push({
          vod_id: m[1],
          vod_name: text(item.vod_name),
          vod_pic: '',
          vod_remarks: text(item.vod_title),
          vod_episodes: 0,
          vod_category: '',
        });
      }
      if (list.length) {
        return { page: pg, pagecount: 1, limit: list.length, total: list.length, list: list };
      }
    }
  } catch (_) {
    // 继续走兜底
  }

  const kwEnc = encodeURIComponent(kw);
  const path = pg <= 1 ? '/search/' + kwEnc + '.html' : '/search/' + kwEnc + '-' + pg + '.html';
  let body = '';
  try {
    body = await fetchText(path, { referer: BASE + '/' });
  } catch (e) {
    return { page: pg, pagecount: pg, limit: 0, total: 0, list: [] };
  }
  return parseVodList(body, pg);
}

// ---------------------------------------------------------------- 导出
var spider = {
  meta: meta,
  init: init,
  home: home,
  category: category,
  detail: detail,
  play: play,
  search: search,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = spider;
}
