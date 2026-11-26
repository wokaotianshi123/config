var meta = {
  id: "hongguo-xianji",
  name: "红果显季",
  version: "1.0.0",
  description: "红果短剧：真人剧 / 漫剧 / AI剧，多季按线路展开",
  author: "Aharou",
  type: "video",
  icon: "",
  features: ["search", "seriesSeasons"]
};

var SITE = "https://hongguoduanju.com";
var V5_API = "https://api5-normal-sinfonlinea.fqnovel.com/novel/player/video_model/v1/";
var REGISTER_API = "https://log.snssdk.com/service/2/device_register/";
var WEB_UA = "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
var MEDIA_UA = "com.phoenix.read/71332";
var V5_UA = "com.phoenix.read/74532 (Linux; U; Android 16; zh_CN_#Hans; 25053RT47C; Build/BP2A;tt-ok/3.12.13.20)";
var REGISTER_UA = "com.phoenix.read/73532 (Linux; U; Android 16; zh_CN; 25053RT47C; Build/BP2A.250605.031.A3; Cronet/TTNetVersion:04657795 2026-01-23 QuicVersion:c67e9834 2025-09-08)";
var MEDIA_REFERER = "https://novel.snssdk.com/";

var V5_MAGIC = hexToBytes("2d4b4fca49750d433fb5ae2c226dcc56");
var V5_LICENSE = "646637794";
var V5_FIELD21 = 312;
var V5_SIGN_KEY = hexToBytes("b23c2a470a20d105dc3f8c4438f8272ed46d6c89ffdcdedd5108698d26e9489d");
var V5_SBOX = hexToBytes("53290fe9e51f316f90f74a7e034d367784ab49237cd0135cdc632c322fd3be0e2624a417ecd9151a7ff64f60730a87f9445ec6ada2f865d22b696c4188f24c0df37b75510b939f6bc2fe6883e68bc8c722181ba0bdb08c9871b50c9a16b46eea8eed20ba4b8a14e0fcf1468dbbef05a93e5a9d7dcf06898635c1fd99f5de287a80c594daaab19b6279fbd75070cb52eb2555c456e39e7839853874e2f0013ac0b64742d8ca10e4b79c955de8b843ce4ed464a6a72ed508091c92e7b3eedd1e1dd12afac321618fa3d65f9167c982f43d66a53c6a1997585b346dbf9672ff37cdbc073b2dae11453304df00815476b2a13fccdb30b957a8acafe127400248591238922563e36406d37a24100b7902a028044e218453c2a399199c9d13dc40c55ba67e502273850ebdc1a2e2188b8f2d9e3cb909b8c46a2a9f4a6dd93007eafa65b7b3a881aa908cc74f0ad76bbbb58617c37012ca05a469fd44e62eecf1e4272ce860c0ae5eadf99b20d8f0234174006f3f110d7657d01645d4eff8f71471cbfe1cb2f52648727bf3c9de55153e031b4d61757db63dbf7782eeafe9018a8891362fb14759ac32bab03b349aeb5a377c5156be4c8dfbe13a684bda39cf836697c894545fe0f2491acea9fc6252f4ff1e0fe72bd2df6e67a7f635e5bcc6d1a5dd951d89960887a18eb40c785cdb1f80ed42299333ab98cdd67f316cd54346585dccd759fb722789b08807cc0fda293f7e5e1819bb0353517020b31d3d00374952bea2c421e862040a9ec892a05b266b7a0d0cc316f483b81af39715657ffe32ad8de0c13077646035236ee5363e5f900e9a7cf850a81cd9960b6df73317226f99eaa6fff15cec34acb98246639b918ab2851466a7cdfc4ad1b52c2ae95a58d3734e47ddd5b7560193f644ef9c408b7dee39b4d6aabf4de761e3252d4c7ba3843187745d55e6a5db05d42b45caed43c0c5d0b64bfa9d94a4a9d8f2f0e1a108dcfd288fd2bc1fc7bd675412138169cb09249875ba3b68cfb11180afae104fc9789571c6dfce02413886796ae21e3c488cc21b9f423a066c2eabf98e2fdeeb5776e4f5d09a515ba58cbbab3e37b09fd4f6d9244df80512e84cd7956be301cf64f1429d58577cc241f3a2c655144f81aaf95a4e108da894b38970561ae9002619fbbac91fa922ed202bfc62cb08e0de2a7f3631435f8b47c8a3c563b4db4071ce74c46da6fa696a9e282d1e825d663b93bfd56c48dce1884bb10fccea063929f746443fd830a4232e53da21a1f2d1bdfebc3a02c10a1b8ad31d04fd616590d272ac737e98eb33af60528716bee78ec0ee8699031177277d9cff32542c67caf5f44591681335ae0e178f3409a7803db83892dde5b9b7f0c750e24aef077badd678a09b850b84ec1597e4963cb5e675df1c0d6fb618496ecd76c35c798325590c2fb27a5e");
var HASH_TABLE = [0xebb64faf, 0x07aadcc2, 0xcf3187bf, 0xe01138ff, 0x6d0bfcff, 0x5a30a3be, 0xb41ad638, 0x34180eb8, 0xf233eb6f, 0xb1a584cc, 0xccc30dc7, 0x47d1db51, 0xd55653de, 0x70a84fa1, 0x57473c12, 0xf76f0288, 0x2c077f0a, 0xda0dcad0, 0xfbb86f6c, 0xfdc4cf00, 0x688a020d, 0xe676c6a6, 0x8cd6338b, 0x1a3c8d0e, 0xcce8b06b, 0x6ad0ed0b, 0xa0522717, 0xdc71ac83, 0x2285db71, 0xd5b4dda6, 0x736f8650, 0x6560306c, 0x617ce2a6, 0xe423417e, 0x0a40e143, 0x544e4032, 0x88dffb2a, 0x716c1ae0, 0x4c467a88, 0x05b23bb3, 0xe1d0b866, 0xbaa3dcb8, 0xae3374d3, 0xc3381a50, 0x1702f75b, 0xfe6da368, 0xf0b4cf48, 0x4e0ffbb8, 0x72aad10d, 0x26c53a3d, 0xf2bce0f6, 0xb4557581, 0x4a257fdd, 0x8c3182a2, 0xab0b3b86, 0x3d5dfb14, 0x4f103634, 0xd37b52d7, 0x444eff16, 0xeb0a33d1, 0x6ca86f6e, 0x00284ba7, 0x08387cfa, 0x5fb37586];
var U32 = 4294967295;

var deviceCache = null;
var modelCache = {};
var detailCache = {};
var seasonCache = {};

function utf8Bytes(text) {
  var out = [];
  var value = String(text == null ? "" : text);
  for (var i = 0; i < value.length; i++) {
    var code = value.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < value.length) {
      var next = value.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
        i++;
      }
    }
    if (code < 0x80) out.push(code);
    else if (code < 0x800) out.push(0xc0 | (code >> 6), 0x80 | (code & 63));
    else if (code < 0x10000) out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 63), 0x80 | (code & 63));
    else out.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 63), 0x80 | ((code >> 6) & 63), 0x80 | (code & 63));
  }
  return new Uint8Array(out);
}

function concatBytes() {
  var parts = [];
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    var part = arguments[i];
    if (!part) continue;
    parts.push(part);
    total += part.length;
  }
  var out = new Uint8Array(total);
  var offset = 0;
  for (var j = 0; j < parts.length; j++) {
    out.set(parts[j], offset);
    offset += parts[j].length;
  }
  return out;
}

function hexToBytes(hex) {
  var text = String(hex == null ? "" : hex).replace(/[^0-9a-fA-F]/g, "");
  if (text.length % 2) text = "0" + text;
  var out = new Uint8Array(text.length / 2);
  for (var i = 0; i < out.length; i++) out[i] = parseInt(text.substr(i * 2, 2), 16);
  return out;
}

function bytesToHex(bytes) {
  var out = "";
  for (var i = 0; i < bytes.length; i++) out += (bytes[i] < 16 ? "0" : "") + bytes[i].toString(16);
  return out;
}

function le32(value) {
  var n = Number(value) >>> 0;
  return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
}

function u64FromLe(bytes, start) {
  var lo = (bytes[start] | (bytes[start + 1] << 8) | (bytes[start + 2] << 16) | (bytes[start + 3] << 24)) >>> 0;
  var hi = (bytes[start + 4] | (bytes[start + 5] << 8) | (bytes[start + 6] << 16) | (bytes[start + 7] << 24)) >>> 0;
  return [hi, lo];
}

function u64ToLe(value) {
  var hi = value[0];
  var lo = value[1];
  return new Uint8Array([lo & 255, (lo >>> 8) & 255, (lo >>> 16) & 255, (lo >>> 24) & 255, hi & 255, (hi >>> 8) & 255, (hi >>> 16) & 255, (hi >>> 24) & 255]);
}

function u64Add(a, b) {
  var loSum = a[1] + b[1];
  var lo = loSum >>> 0;
  var hi = (a[0] + b[0] + (loSum > 4294967295 ? 1 : 0)) >>> 0;
  return [hi, lo];
}

function u64Xor(a, b) {
  return [(a[0] ^ b[0]) >>> 0, (a[1] ^ b[1]) >>> 0];
}

function u64Ror(value, count) {
  var n = count & 63;
  var hi = value[0];
  var lo = value[1];
  if (!n) return [hi, lo];
  if (n >= 32) {
    var swap = hi;
    hi = lo;
    lo = swap;
    n -= 32;
  }
  if (n) return [((hi >>> n) | (lo << (32 - n))) >>> 0, ((lo >>> n) | (hi << (32 - n))) >>> 0];
  return [hi, lo];
}

function base64Encode(bytes) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = "";
  for (var i = 0; i < bytes.length; i += 3) {
    var a = bytes[i];
    var b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    var c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += alphabet[a >> 2];
    out += alphabet[((a & 3) << 4) | (b >> 4)];
    out += i + 1 < bytes.length ? alphabet[((b & 15) << 2) | (c >> 6)] : "=";
    out += i + 2 < bytes.length ? alphabet[c & 63] : "=";
  }
  return out;
}

function base64Decode(text) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var value = String(text == null ? "" : text).replace(/-/g, "+").replace(/_/g, "/").replace(/[^A-Za-z0-9+/=]/g, "");
  while (value.length % 4) value += "=";
  var out = [];
  var bits = 0;
  var buffer = 0;
  for (var i = 0; i < value.length; i++) {
    var ch = value.charAt(i);
    if (ch === "=") break;
    var index = alphabet.indexOf(ch);
    if (index < 0) continue;
    buffer = (buffer << 6) | index;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out.push((buffer >> bits) & 255);
    }
  }
  return new Uint8Array(out);
}

function ror32(value, count) {
  var n = count & 31;
  if (!n) return value >>> 0;
  return ((value >>> n) | (value << (32 - n))) >>> 0;
}

function rotl32(value, count) {
  var n = count & 31;
  if (!n) return value >>> 0;
  return ((value << n) | (value >>> (32 - n))) >>> 0;
}

function rl8(value, count) {
  var n = count & 7;
  if (!n) return value & 255;
  return ((value << n) | (value >>> (8 - n))) & 255;
}



function md5(data) {
  var source = data instanceof Uint8Array ? data : utf8Bytes(data);
  var length = source.length;
  var padded = new Uint8Array((((length + 8) >>> 6) + 1) << 6);
  padded.set(source);
  padded[length] = 128;
  var bitLo = (length << 3) >>> 0;
  var bitHi = Math.floor(length / 536870912) >>> 0;
  for (var i = 0; i < 4; i++) padded[padded.length - 8 + i] = (bitLo >>> (i * 8)) & 255;
  for (var i2 = 0; i2 < 4; i2++) padded[padded.length - 4 + i2] = (bitHi >>> (i2 * 8)) & 255;
  var h0 = 0x67452301;
  var h1 = 0xefcdab89;
  var h2 = 0x98badcfe;
  var h3 = 0x10325476;
  var k = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ];
  var s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];
  for (var offset = 0; offset < padded.length; offset += 64) {
    var m = new Array(16);
    for (var j = 0; j < 16; j++) {
      var at = offset + j * 4;
      m[j] = (padded[at] | (padded[at + 1] << 8) | (padded[at + 2] << 16) | (padded[at + 3] << 24)) >>> 0;
    }
    var a = h0;
    var b = h1;
    var c = h2;
    var d = h3;
    for (var i2 = 0; i2 < 64; i2++) {
      var f;
      var g;
      if (i2 < 16) {
        f = (b & c) | (~b & d);
        g = i2;
      } else if (i2 < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i2 + 1) & 15;
      } else if (i2 < 48) {
        f = b ^ c ^ d;
        g = (3 * i2 + 5) & 15;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i2) & 15;
      }
      var temp = d;
      d = c;
      c = b;
      b = (b + rotl32((a + f + k[i2] + m[g]) >>> 0, s[i2])) >>> 0;
      a = temp;
    }
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
  }
  var out = new Uint8Array(16);
  var words = [h0, h1, h2, h3];
  for (var w = 0; w < 4; w++) {
    out[w * 4] = words[w] & 255;
    out[w * 4 + 1] = (words[w] >>> 8) & 255;
    out[w * 4 + 2] = (words[w] >>> 16) & 255;
    out[w * 4 + 3] = (words[w] >>> 24) & 255;
  }
  return out;
}

function sm3(data) {
  var source = data instanceof Uint8Array ? data : utf8Bytes(data);
  var length = source.length;
  var padded = new Uint8Array((((length + 8) >>> 6) + 1) << 6);
  padded.set(source);
  padded[length] = 128;
  var bitLo = (length << 3) >>> 0;
  var bitHi = Math.floor(length / 536870912) >>> 0;
  for (var i = 0; i < 4; i++) {
    padded[padded.length - 8 + i] = (bitHi >>> (24 - i * 8)) & 255;
    padded[padded.length - 4 + i] = (bitLo >>> (24 - i * 8)) & 255;
  }
  var iv = [0x7380166f, 0x4914b2b9, 0x172442d7, 0xda8a0600, 0xa96f30bc, 0x163138aa, 0xe38dee4d, 0xb0fb0e4e];
  for (var offset = 0; offset < padded.length; offset += 64) {
    var w = new Array(68);
    for (var j = 0; j < 16; j++) {
      var at = offset + j * 4;
      w[j] = ((padded[at] << 24) | (padded[at + 1] << 16) | (padded[at + 2] << 8) | padded[at + 3]) >>> 0;
    }
    for (var j2 = 16; j2 < 68; j2++) {
      var x = (w[j2 - 16] ^ w[j2 - 9] ^ rotl32(w[j2 - 3], 15)) >>> 0;
      w[j2] = (x ^ rotl32(x, 15) ^ rotl32(x, 23) ^ rotl32(w[j2 - 13], 7) ^ w[j2 - 6]) >>> 0;
    }
    var w1 = new Array(64);
    for (var j3 = 0; j3 < 64; j3++) w1[j3] = (w[j3] ^ w[j3 + 4]) >>> 0;
    var a = iv[0], b = iv[1], c = iv[2], d = iv[3], e = iv[4], f = iv[5], g = iv[6], h = iv[7];
    for (var j4 = 0; j4 < 64; j4++) {
      var tj = j4 < 16 ? 0x79cc4519 : 0x7a879d8a;
      var ss1 = rotl32((rotl32(a, 12) + e + rotl32(tj, j4 % 32)) >>> 0, 7);
      var ss2 = (ss1 ^ rotl32(a, 12)) >>> 0;
      var ff = j4 < 16 ? (a ^ b ^ c) >>> 0 : ((a & b) | (a & c) | (b & c)) >>> 0;
      var gg = j4 < 16 ? (e ^ f ^ g) >>> 0 : ((e & f) | (~e & g)) >>> 0;
      var tt1 = (ff + d + ss2 + w1[j4]) >>> 0;
      var tt2 = (gg + h + ss1 + w[j4]) >>> 0;
      d = c;
      c = rotl32(b, 9);
      b = a;
      a = tt1;
      h = g;
      g = rotl32(f, 19);
      f = e;
      e = (tt2 ^ rotl32(tt2, 9) ^ rotl32(tt2, 17)) >>> 0;
    }
    iv[0] = (iv[0] ^ a) >>> 0;
    iv[1] = (iv[1] ^ b) >>> 0;
    iv[2] = (iv[2] ^ c) >>> 0;
    iv[3] = (iv[3] ^ d) >>> 0;
    iv[4] = (iv[4] ^ e) >>> 0;
    iv[5] = (iv[5] ^ f) >>> 0;
    iv[6] = (iv[6] ^ g) >>> 0;
    iv[7] = (iv[7] ^ h) >>> 0;
  }
  var out = new Uint8Array(32);
  for (var n = 0; n < 8; n++) {
    out[n * 4] = (iv[n] >>> 24) & 255;
    out[n * 4 + 1] = (iv[n] >>> 16) & 255;
    out[n * 4 + 2] = (iv[n] >>> 8) & 255;
    out[n * 4 + 3] = iv[n] & 255;
  }
  return out;
}

function sumMd5(data) {
  var check = 0x20220420;
  for (var i = 0; i < 12; i++) {
    var temp;
    if (i % 2 === 0) {
      temp = (check >>> 3) ^ check;
      check = data[i] ^ (check << 7);
    } else {
      temp = (check >>> 5) ^ check;
      check = data[i] | (check << 11);
      check ^= 0xffffffff;
    }
    check ^= temp;
    check = check >>> 0;
  }
  check = (check | 4) >>> 0;
  check = (check ^ 0x1000000) >>> 0;
  return check;
}

function getKeyHash(key, rand) {
  var toHash = new Uint8Array(68);
  toHash.set(key, 0);
  toHash[32] = rand & 255;
  toHash[33] = (rand >>> 8) & 255;
  toHash[34] = (rand >>> 16) & 255;
  toHash[35] = (rand >>> 24) & 255;
  toHash.set(key, 36);
  var d1 = (rand >>> 16) & 255;
  var d2 = ((d1 << 11) | (rand >>> 24)) >>> 0;
  d2 = (d2 ^ (d1 >>> 5) ^ d1) >>> 0;
  d2 = (~d2) >>> 0;
  return [sm3(toHash), le32(d2)];
}

function hashF13(querySm3, bodyMd5Bytes, tsBytes, khronos) {
  var ivV1 = 0x9d4a97c2;
  var countV1 = (ivV1 + khronos + 1) & 255;
  var countV2 = (ivV1 + khronos) >>> 0;
  var tt = new Array(HASH_TABLE.length);
  for (var t = 0; t < HASH_TABLE.length; t++) tt[t] = ror32(HASH_TABLE[t], countV1);
  var n0 = (countV2 + 2) & 7;
  var seed = [0xfa, 0x45, 0x61, 0xd7];
  var pad = new Uint8Array(4);
  for (var p = 0; p < 4; p++) pad[p] = (((seed[p] | (seed[p] << 8)) >>> n0) & 255);
  var data = concatBytes(querySm3, bodyMd5Bytes, tsBytes, pad, new Uint8Array([0, 0, 0, 0, 0, 0, 1, 0xa0]));
  var di = new Array(((data.length / 4) | 0) + 112 + 16);
  for (var i = 0; i < di.length; i++) di[i] = 0;
  var diLen = 0;
  for (var i2 = 0; i2 < data.length - 3; i2 += 4) {
    di[diLen++] = ((data[i2] << 24) | (data[i2 + 1] << 16) | (data[i2 + 2] << 8) | data[i2 + 3]) >>> 0;
  }
  var di0 = di[0];
  for (var i3 = 0; i3 < 112; i3++) {
    var di1 = di[i3 + 1];
    var di14 = di[i3 + 14];
    var r1 = (rotl32(di1, 14) ^ rotl32(di1, 25) ^ (di1 >>> 3)) >>> 0;
    var r2 = (rotl32(di14, 13) ^ rotl32(di14, 15) ^ (di14 >>> 10)) >>> 0;
    di[diLen++] = (di0 + di[i3 + 9] + r1 + r2) >>> 0;
    di0 = di1;
  }
  var initRaw = [0x7aba4fc8, 0x67166507, 0x6403fa00, 0x340f512f, 984304912, 3005047866, 2874125293, 2152413264];
  var init = new Array(8);
  for (var i4 = 0; i4 < 8; i4++) init[i4] = ror32(initRaw[i4], countV2 & 31);
  var chosen = [96, 1, 3, 4, 0, 6, 5, 2, 0, 7, 7];
  var d = init.slice();
  for (var i5 = 0; i5 < chosen[0]; i5++) {
    var base = (ivV1 + i5) >>> 0;
    var n0v = di[base & 127];
    var n1 = (((d[chosen[3]] ^ d[chosen[4]]) & d[chosen[1]]) ^ d[chosen[3]]) >>> 0;
    var n2 = (rotl32(d[chosen[1]], 26) ^ rotl32(d[chosen[1]], 21) ^ rotl32(d[chosen[1]], 7)) >>> 0;
    var n4 = (n0v + n1 + n2 + tt[base & 63] + d[chosen[5]]) >>> 0;
    var n5 = (rotl32(d[chosen[2]], 30) ^ rotl32(d[chosen[2]], 19) ^ rotl32(d[chosen[2]], 10)) >>> 0;
    var n6 = ((d[chosen[2]] & d[chosen[6]]) | ((d[chosen[2]] | d[chosen[6]]) & d[chosen[7]])) >>> 0;
    var n7 = (n5 + n6) >>> 0;
    var old = d[chosen[9]];
    var last = d[d.length - 1];
    for (var shiftIndex = d.length - 1; shiftIndex > 0; shiftIndex--) d[shiftIndex] = d[shiftIndex - 1];
    d[0] = last;
    d[chosen[10]] = (n7 + n4) >>> 0;
    d[chosen[8]] = (old + n4) >>> 0;
  }
  var ret = new Uint8Array(32);
  for (var i6 = 0; i6 < 8; i6++) {
    var value = (d[i6] + init[i6]) >>> 0;
    ret[i6 * 4] = (value >>> 24) & 255;
    ret[i6 * 4 + 1] = (value >>> 16) & 255;
    ret[i6 * 4 + 2] = (value >>> 8) & 255;
    ret[i6 * 4 + 3] = value & 255;
  }
  for (var i7 = 0; i7 < 16; i7++) ret[i7] = (ret[i7] ^ ret[i7 + 16]) & 255;
  var head = ret.slice(0, 16);
  var tail = (sumMd5(head) | 0x20) >>> 0;
  return concatBytes(head, le32(tail));
}

function aesV5(key, khronos) {
  var CON2 = [[2, 0, 3, 1], [1, 3, 2, 0], [3, 2, 1, 0], [2, 3, 1, 0]];
  var ORDER = [
    [0, 9, 14, 15, 4, 13, 2, 7, 8, 1, 6, 3, 12, 5, 10, 11],
    [0, 9, 14, 11, 4, 13, 2, 3, 8, 1, 6, 15, 12, 5, 10, 7],
    [0, 9, 14, 3, 4, 13, 2, 15, 8, 1, 6, 11, 12, 5, 10, 7],
    [0, 9, 14, 15, 4, 13, 2, 3, 8, 1, 6, 11, 12, 5, 10, 7]
  ];
  var WIRE = [6, 5, 3, 4, 2, 7, 1, 0];
  var COMPACT = [1, 7, 3, 6, 2, 0, 4, 5];
  var INIT = [0xbbb5de72, 0xd4638d5b, 0x92a5f73b, 0x89f8a1c9];
  var wordSize = khronos & 3;
  var box = V5_SBOX.slice(wordSize * 256, (wordSize + 1) * 256);
  var con2 = CON2[wordSize];
  var order = ORDER[wordSize];
  var init = INIT[wordSize];
  var initial = concatBytes(le32(init), le32(init), le32(init), le32(init));
  var mk = new Uint8Array(32);
  for (var i = 0; i < 32; i++) mk[i] = initial[i] ^ key[i];
  var expanded = new Uint8Array(64);
  expanded.set(mk, 0);
  var rounds = 8;
  for (var r = 4; r < 12; r++) {
    var at = 4 * (r - 1);
    var a = expanded[at];
    var b = expanded[at + 1];
    var c = expanded[at + 2];
    var d = expanded[at + 3];
    if ((r & 3) === 0) {
      var t = ((init >>> (rounds & 24)) ^ box[b]) & 255;
      b = box[c];
      c = box[d];
      d = box[a];
      a = t;
    }
    rounds += 2;
    expanded[at + 4] = (a ^ expanded[at - 12]) & 255;
    expanded[at + 5] = (b ^ expanded[at - 11]) & 255;
    expanded[at + 6] = (c ^ expanded[at - 10]) & 255;
    expanded[at + 7] = (d ^ expanded[at - 9]) & 255;
  }
  var keys = [];
  for (var k = 0; k < 12; k++) keys.push([expanded[k * 4], expanded[k * 4 + 1], expanded[k * 4 + 2], expanded[k * 4 + 3]]);

  function matrix(value) {
    var rows = [];
    for (var i2 = 0; i2 < 4; i2++) rows.push([value[i2 * 4], value[i2 * 4 + 1], value[i2 * 4 + 2], value[i2 * 4 + 3]]);
    return rows;
  }
  function flat(rows) {
    var out = new Uint8Array(16);
    for (var i2 = 0; i2 < 4; i2++) for (var j = 0; j < 4; j++) out[i2 * 4 + j] = rows[i2][j] & 255;
    return out;
  }
  function add(rows, keyRows) {
    for (var i2 = 0; i2 < 4; i2++) for (var j = 0; j < 4; j++) rows[i2][j] ^= keyRows[i2][j];
  }
  function addCon(rows, keyRows) {
    for (var i2 = 0; i2 < 4; i2++) for (var j = 0; j < 4; j++) rows[i2][j] ^= keyRows[i2][con2[j]];
  }
  function sub(rows) {
    for (var i2 = 0; i2 < 4; i2++) for (var j = 0; j < 4; j++) rows[i2][j] = box[rows[i2][j]];
    var old = [];
    for (var i3 = 0; i3 < 4; i3++) old.push(rows[i3].slice());
    for (var i4 = 0; i4 < 4; i4++) rows[i4] = old[con2[i4]];
  }
  function shift(rows) {
    var b = flat(rows);
    for (var i2 = 0; i2 < 16; i2++) rows[(i2 / 4) | 0][i2 % 4] = b[order[i2]];
  }
  function shiftCon(rows) {
    var old = [];
    for (var i2 = 0; i2 < 4; i2++) old.push(rows[i2].slice());
    for (var i3 = 0; i3 < 4; i3++) for (var j = 0; j < 4; j++) rows[i3][j] = old[i3][con2[j]];
  }
  function subKeys(start) {
    var out = [];
    for (var i2 = 0; i2 < 4; i2++) out.push(keys[start + i2].slice());
    return out;
  }
  function aesXt(x) {
    return ((x << 1) ^ (x & 128 ? 0x1b : 0)) & 255;
  }
  function mix(rows) {
    for (var i2 = 0; i2 < 4; i2++) {
      var t = rows[0][i2] ^ rows[1][i2] ^ rows[2][i2] ^ rows[3][i2];
      var u = rows[0][i2];
      rows[0][i2] ^= t ^ aesXt(rows[0][i2] ^ rows[1][i2]);
      rows[1][i2] ^= t ^ aesXt(rows[1][i2] ^ rows[2][i2]);
      rows[2][i2] ^= t ^ aesXt(rows[2][i2] ^ rows[3][i2]);
      rows[3][i2] ^= t ^ aesXt(rows[3][i2] ^ u);
    }
  }
  function block(value) {
    var rows = matrix(value);
    addCon(rows, subKeys(0));
    for (var i2 = 1; i2 < 3; i2++) {
      sub(rows);
      shift(rows);
      if (i2 === 1) {
        shiftCon(rows);
        mix(rows);
      }
      addCon(rows, subKeys(i2 * 4));
    }
    add(rows, subKeys(4));
    return flat(rows);
  }
  function encrypt(data, iv) {
    var plaintext = new Uint8Array(32);
    for (var i2 = 0; i2 < 31; i2++) {
      var at2 = i2 * 8;
      var acc = 0;
      for (var j = 0; j < 8; j++) {
        var byte = at2 + j < data.length ? data[at2 + j] : 0;
        acc |= (((byte >> WIRE[j]) & 1) << COMPACT[j]);
      }
      plaintext[i2] = acc & 255;
    }
    plaintext[31] = 1;
    var blocks = [];
    var previous = iv.slice();
    for (var i3 = 0; i3 < 32; i3 += 16) {
      var chunk = new Uint8Array(16);
      for (var j2 = 0; j2 < 16; j2++) chunk[j2] = plaintext[i3 + j2] ^ previous[j2];
      previous = block(chunk);
      blocks.push(previous);
    }
    var keyBytes = concatBytes(blocks[0], blocks[1]);
    var out = new Uint8Array(data.length);
    out.set(data);
    for (var i4 = 0; i4 < 31; i4++) {
      var at3 = i4 * 8;
      var kv = keyBytes[i4];
      for (var j3 = 0; j3 < 8; j3++) {
        var bit = WIRE[j3];
        var mask = 1 << bit;
        if (at3 + j3 < out.length) out[at3 + j3] = (out[at3 + j3] & (~mask & 255)) | (((kv >> COMPACT[j3]) & 1) << bit);
      }
    }
    return concatBytes(new Uint8Array([keyBytes[31]]), out);
  }
  return { encrypt: encrypt };
}

function xmxorTwo(data, key) {
  var encoded = new Uint8Array(data.length);
  for (var index = 0; index < data.length; index++) {
    var position = (index * 4) & 28;
    var d0 = key[position];
    var d1 = key[position + 1];
    var d2 = (rl8(data[index], 4) + d0) ^ d1;
    d2 = rl8((~d2) & 255, 3);
    d2 = ((d2 + d1) & 255) ^ d0;
    encoded[data.length - 1 - index] = (~d2) & 255;
  }
  return encoded;
}

function xmxor(data, key) {
  var value = xmxorTwo(data, key);
  var lastFlag = (value[value.length - 1] ^ value[value.length - 2]) & 255;
  var data0 = value[0];
  value[0] = ((~lastFlag) + value[0]) & 255;
  value[1] = ((value[0] ^ value[value.length - 1] ^ 254) + value[1]) & 255;
  value[2] = (value[2] + ((lastFlag - data0) ^ rl8(value[1], 3) ^ 2)) & 255;
  for (var index = 0; index < value.length - 4; index++) {
    var temp = (rl8(value[index + 2], 3) ^ value[index + 1] ^ (index + 3)) & 255;
    value[index + 3] = ((~temp) + value[index + 3]) & 255;
  }
  value[value.length - 1] ^= value[value.length - 2];
  var sum = 0;
  for (var i = 1; i < value.length; i++) sum += value[i];
  value[0] = ((value[0] ^ value[1]) + sum) & 255;
  return value;
}

function varint(value) {
  var n = Number(value);
  var out = [];
  while (n > 127) {
    out.push((n % 128) | 128);
    n = Math.floor(n / 128);
  }
  out.push(n & 255);
  return new Uint8Array(out);
}

function sint(value) {
  var n = Number(value);
  return n >= 0 ? n * 2 : (-n) * 2 - 1;
}

function protoField(field, value, kind) {
  if (value === null || value === undefined || value === "" || value === false || value === 0) {
    if (!(value instanceof Uint8Array) || value.length === 0) return new Uint8Array(0);
  }
  if (value instanceof Uint8Array && value.length === 0) return new Uint8Array(0);
  if (kind === "sint32" || kind === "sint64") {
    return concatBytes(varint((field << 3) | 0), varint(sint(value)));
  }
  var raw = value instanceof Uint8Array ? value : kind === "string" ? utf8Bytes(value) : value;
  return concatBytes(varint((field << 3) | 2), varint(raw.length), raw);
}

function proto(fields) {
  var parts = [];
  for (var i = 0; i < fields.length; i++) parts.push(protoField(fields[i][0], fields[i][1], fields[i][2]));
  return concatBytes.apply(null, parts);
}

function rndInt32() {
  var v = Math.floor(Math.random() * 4294967296) >>> 0;
  return v >= 0x80000000 ? v - 4294967296 : v;
}

function rnd32() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}

function randomBytes(size) {
  var out = new Uint8Array(size);
  for (var i = 0; i < size; i++) out[i] = Math.floor(Math.random() * 256);
  return out;
}

function base64UrlNoPad(bytes) {
  return base64Encode(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function getIv(iv, data) {
  for (var i = 0; i < data.length; i++) {
    if ((i & 1) === 0) {
      iv = ((iv >>> 4) ^ iv ^ (iv << 6) ^ data[i]) >>> 0;
    } else {
      iv = ~(((iv >>> 7) ^ iv ^ (data[i] | (iv << 12)))) >>> 0;
    }
  }
  return iv >>> 0;
}

function branchV5(query, body, khronos) {
  var bodyMd5 = body ? md5(body) : new Uint8Array(16);
  var q = sm3(utf8Bytes(query));
  var iv = getIv(0x20230928, q);
  iv = getIv(iv, bodyMd5);
  iv = getIv(iv, le32(khronos));
  return (iv & 15) === 12 ? 0 : 1;
}

function encodeV5Query(values) {
  var parts = [];
  for (var key in values) {
    if (!Object.prototype.hasOwnProperty.call(values, key)) continue;
    var encodedKey = encodeURIComponent(String(key)).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    var encodedValue = encodeURIComponent(String(values[key])).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    parts.push(encodedKey + "=" + encodedValue);
  }
  return parts.join("&");
}

function heliosV5(khronos, license, randValue) {
  var value = randValue === undefined ? rnd32() : randValue >>> 0;
  var digest = md5(concatBytes(le32(value), utf8Bytes("8662")));
  var keyBytes = utf8Bytes(bytesToHex(digest));
  var words = [
    u64FromLe(keyBytes, 0),
    u64FromLe(keyBytes, 8),
    u64FromLe(keyBytes, 16),
    u64FromLe(keyBytes, 24)
  ];
  var table = [words[0]];
  var first = words[0];
  var second = words[1];
  var queue = [words[2], words[3]];
  for (var index = 0; index < 0x22; index++) {
    var value2 = u64Add(u64Ror(second, 8), first);
    value2 = u64Xor(value2, [0, index]);
    queue.push(value2);
    value2 = u64Xor(value2, u64Ror(first, 61));
    table.push(value2);
    first = value2;
    second = queue.shift();
  }
  var raw = utf8Bytes(String(khronos) + "-" + (license || "1588093228") + "-8662");
  var pad = 16 - (raw.length % 16);
  var padded = new Uint8Array(raw.length + pad);
  padded.set(raw, 0);
  for (var p = 0; p < pad; p++) padded[raw.length + p] = pad;
  var out = [];
  for (var offset = 0; offset < padded.length; offset += 16) {
    var left = u64FromLe(padded, offset);
    var right = u64FromLe(padded, offset + 8);
    for (var i = 0; i < 0x22; i++) {
      right = u64Xor(table[i], u64Add(left, u64Ror(right, 8)));
      left = u64Xor(right, u64Ror(left, 61));
    }
    out.push(u64ToLe(left), u64ToLe(right));
  }
  return base64Encode(concatBytes(le32(value), concatBytes.apply(null, out)));
}

function medusaV5(url, body, khronos, who) {
  var bodyMd5 = body ? md5(body) : new Uint8Array(16);
  var query = url.indexOf("?") >= 0 ? url.slice(url.indexOf("?") + 1) : "";
  var querySm3 = sm3(utf8Bytes(query));
  var f13 = hashF13(querySm3, bodyMd5, le32(khronos), khronos);
  var version = who.version_name || "7.4.3.32";
  var nonce = base64UrlNoPad(randomBytes(18));
  var started = Date.now();
  var deviceInfo = proto([
    [1, 1, "sint32"], [2, 2, "sint32"], [3, "8662", "string"],
    [4, who.device_id || "", "string"], [5, nonce, "string"], [6, "!noperm!", "string"],
    [12, "Asia/Shanghai,8", "string"], [13, "zh_CN", "string"],
    [22, who.os_version || "12", "string"], [25, started, "sint64"],
    [30, who.device_type || "PGT-AN10", "string"], [31, "HONOR", "string"],
    [32, who.device_type || "PGT-AN10", "string"], [34, "HONOR", "string"]
  ]);
  var env = proto([
    [6, "v04.10.03.04-bugfix", "string"], [8, who.channel || "vivo_8662_64", "string"],
    [12, deviceInfo, "message"], [14, version, "string"]
  ]);
  var message = proto([
    [1, V5_MAGIC, "bytes"], [2, 5, "sint32"], [3, rndInt32(), "sint32"],
    [4, "8662", "string"], [5, who.device_id || "", "string"], [6, V5_LICENSE, "string"],
    [7, version, "string"], [8, "v04.10.03-ml-android", "string"],
    [9, 0x040a0300, "sint32"], [10, new Uint8Array(8), "bytes"],
    [12, khronos, "sint64"], [13, f13, "bytes"], [14, querySm3.slice(0, 6), "bytes"],
    [15, proto([[1, 1, "sint32"], [2, 1, "sint32"], [3, 1, "sint32"], [5, 1, "sint32"]]), "message"],
    [17, khronos, "sint64"], [20, "none", "string"], [21, V5_FIELD21, "sint32"],
    [23, env, "message"],
    [24, '{"cmr":16777216,"cmr2":16777216,"un_h":11,"vpn":0,"kd":0,"dyn":"","do":1,"tk":true}', "string"]
  ]);
  var signNonce = rndInt32() >>> 0;
  var keyHash = getKeyHash(V5_SIGN_KEY, signNonce);
  var transformed = xmxor(message, keyHash[0]);
  var mixed = new Uint8Array(8 + transformed.length);
  mixed.set(transformed, 8);
  mixed.reverse();
  for (var i = 0; i < mixed.length; i++) mixed[i] = (mixed[i] ^ keyHash[1][(~i) & 3]) & 255;
  var check = (((querySm3[0] & 63) << 14) | 0x18000001 | ((f13[0] & 63) << 8)) >>> 0;
  var packed = concatBytes(
    new Uint8Array([0xca]),
    le32(rndInt32() >>> 0),
    le32(check),
    mixed,
    new Uint8Array([(signNonce >>> 16) & 255, (signNonce >>> 24) & 255])
  );
  var encrypted = aesV5(md5(V5_SIGN_KEY.slice(0, 16)), khronos).encrypt(
    packed,
    md5(V5_SIGN_KEY.slice(16, 32))
  );
  var prefix = concatBytes(le32(5), V5_MAGIC);
  var tsLe = le32(khronos);
  for (var j = 0; j < prefix.length; j++) prefix[j] ^= tsLe[j & 3];
  return base64Encode(concatBytes(
    prefix,
    new Uint8Array([signNonce & 255, (signNonce >>> 8) & 255, 0, 1]),
    encrypted
  ));
}

function signPlaybackV5(base, values, body, nowMs) {
  var ts = Math.floor(nowMs / 1000);
  for (var offset = 0; offset < 1024; offset++) {
    var ticket = nowMs + offset;
    var merged = {};
    for (var key in values) if (Object.prototype.hasOwnProperty.call(values, key)) merged[key] = values[key];
    merged._rticket = String(ticket);
    var query = encodeV5Query(merged);
    if (branchV5(query, body, ts) !== 0) continue;
    var url = base + "?" + query;
    var headers = {
      "x-khronos": String(ts),
      "x-helios": heliosV5(ts, V5_LICENSE),
      "x-medusa": medusaV5(url, body, ts, values)
    };
    if (body) {
      headers["Content-Type"] = "application/json; charset=utf-8";
      headers["x-ss-stub"] = bytesToHex(md5(body)).toUpperCase();
    }
    return { url: url, headers: headers };
  }
  throw new Error("无法生成播放签名");
}

function safeJsonParse(text) {
  if (!text || typeof text !== "string") return null;
  try {
    var safe = text;
    if (/\d{15,}/.test(safe)) {
      var previous;
      do {
        previous = safe;
        safe = safe.replace(/([:\,\[]\s*)(\d{15,})(\s*[,\]\}])/g, '$1"$2"$3');
      } while (safe !== previous);
    }
    return JSON.parse(safe);
  } catch (error) {
    try { return JSON.parse(text); } catch (ignore) { return null; }
  }
}

function parseRouterData(html) {
  var match = /_ROUTER_DATA\s*=\s*/.exec(html || "");
  if (!match) return {};
  var start = match.index + match[0].length;
  var depth = 0;
  var quoted = false;
  var escaped = false;
  for (var i = start; i < html.length; i++) {
    var ch = html.charAt(i);
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (quoted) { if (ch === '"') quoted = false; continue; }
    if (ch === '"') { quoted = true; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return safeJsonParse(html.slice(start, i + 1)) || {};
    }
  }
  return {};
}

function absUrl(value) {
  var text = String(value == null ? "" : value).trim();
  if (!text) return "";
  if (text.indexOf("//") === 0) return "https:" + text;
  if (/^https?:\/\//i.test(text)) return text;
  return SITE + (text.charAt(0) === "/" ? text : "/" + text);
}

function pick() {
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value !== undefined && value !== null && String(value).trim() !== "") return value;
  }
  return "";
}

function itemFrom(row) {
  var x = row || {};
  var vd = x.video_data && typeof x.video_data === "object" ? x.video_data : x;
  var sid = String(pick(vd.series_id, x.series_id, x.keyword, vd.keyword, ""));
  var name = String(pick(vd.series_title, vd.series_name, x.series_name, x.name, "未命名"));
  var count = Number(pick(vd.episode_cnt, x.episode_cnt, 0)) || 0;
  return {
    vod_id: sid,
    vod_name: name,
    vod_pic: absUrl(pick(vd.series_cover, x.series_cover, "")),
    vod_remarks: count ? "全" + count + "集" : "",
    vod_content: String(pick(vd.series_intro, x.series_intro, ""))
  };
}

function cnNumber(value) {
  var n = Number(value) || 0;
  var digits = "零一二三四五六七八九";
  if (n <= 10) return n === 10 ? "十" : digits.charAt(n);
  if (n < 20) return "十" + digits.charAt(n % 10);
  if (n < 100) return digits.charAt(Math.floor(n / 10)) + "十" + (n % 10 ? digits.charAt(n % 10) : "");
  return String(n);
}

function cnValue(text) {
  var value = String(text == null ? "" : text).trim();
  if (/^\d+$/.test(value)) return Number(value);
  if (value === "十") return 10;
  if (value.charAt(0) === "十") return 10 + "零一二三四五六七八九".indexOf(value.charAt(1));
  var at = value.indexOf("十");
  if (at >= 0) {
    var left = "零一二三四五六七八九".indexOf(value.charAt(at - 1));
    var right = value.charAt(at + 1) ? "零一二三四五六七八九".indexOf(value.charAt(at + 1)) : 0;
    return left * 10 + right;
  }
  return "零一二三四五六七八九".indexOf(value);
}

function splitTitle(name) {
  var raw = String(name || "").trim();
  var colon = raw.indexOf("：");
  var ascii = raw.indexOf(":");
  if (colon < 0 || (ascii >= 0 && ascii < colon)) colon = ascii;
  if (colon > 0 && colon < raw.length - 1) return [raw.slice(0, colon).trim(), raw.slice(colon + 1).trim()];
  return [raw, ""];
}

function mainTailNumber(name) {
  var parts = splitTitle(name);
  if (!parts[1]) return 0;
  var match = /^(.*[^\d])(\d{1,2})$/.exec(parts[0]);
  if (!match) return 0;
  var n = Number(match[2]);
  return n > 0 && n <= 99 ? n : 0;
}

function seasonNo(name) {
  var text = String(name || "");
  var match = /第\s*([0-9]{1,3}|[一二三四五六七八九十]{1,3})\s*[季部]/.exec(text);
  if (match) return cnValue(match[1]);
  var tail = /(?:[\s·\-—_：:.、]+)?([0-9]{1,3}|[一二三四五六七八九十]{1,3})\s*$/.exec(text);
  if (tail) {
    var n = cnValue(tail[1]);
    if (n > 0 && n <= 99) return n;
  }
  return mainTailNumber(text);
}

function baseName(name) {
  var raw = String(name || "").trim();
  var explicit = /第\s*([0-9]{1,3}|[一二三四五六七八九十]{1,3})\s*[季部]/.test(raw);
  var base = raw.replace(/第\s*([0-9]{1,3}|[一二三四五六七八九十]{1,3})\s*[季部]/g, "").replace(/^[：:·\-—_ 　]+|[：:·\-—_ 　]+$/g, "");
  if (base === raw) {
    var tail = raw.replace(/(?:[\s·\-—_：:.、]+)?([0-9]{1,3}|[一二三四五六七八九十]{1,3})\s*$/, "").replace(/^[：:·\-—_ 　]+|[：:·\-—_ 　]+$/g, "");
    if (tail.length >= 4 && tail !== raw) base = tail;
  }
  if (!explicit) {
    var parts = splitTitle(raw);
    if (parts[1]) {
      var main = /^(.*[^\d])\d{1,2}$/.exec(parts[0]);
      if (main) base = main[1].trim() + "：" + parts[1];
    }
  }
  var min = explicit ? 2 : 4;
  return base.length >= min ? base : "";
}

function fetchText(url, headers, timeoutMs) {
  return fetch(url, {
    method: "GET",
    headers: headers || {},
    timeoutMs: timeoutMs || 15000
  }).then(function (response) {
    return response.text().then(function (text) {
      if (response.status < 200 || response.status >= 300) {
        throw new Error("HTTP " + response.status);
      }
      return text;
    });
  });
}

function fetchJson(url, headers, timeoutMs) {
  return fetchText(url, headers, timeoutMs).then(function (text) {
    return safeJsonParse(text) || {};
  });
}

function pageHeaders() {
  return {
    "User-Agent": WEB_UA,
    "Referer": SITE + "/",
    "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9"
  };
}

function fetchDetail(sid) {
  var key = String(sid || "");
  var cached = detailCache[key];
  if (cached && Date.now() - cached.time < 15 * 60 * 1000) return Promise.resolve(cached.data);
  return fetchText(SITE + "/detail?series_id=" + encodeURIComponent(key), pageHeaders(), 20000).then(function (html) {
    var data = parseRouterData(html);
    var page = (data.loaderData || {}).detail_page || {};
    var sd = page.seriesDetail || {};
    if (sd && sd.series_id) detailCache[key] = { data: sd, time: Date.now() };
    return sd || {};
  }).catch(function () { return {}; });
}

function fetchCategory(route, cat, page) {
  var path = "/category/" + route;
  if (cat) path += "/" + cat;
  return fetchText(SITE + path + "?page=" + Math.max(1, Number(page) || 1), pageHeaders(), 20000).then(function (html) {
    var data = parseRouterData(html);
    var loader = data.loaderData || {};
    var rows = [];
    for (var key in loader) {
      if (!Object.prototype.hasOwnProperty.call(loader, key)) continue;
      var part = loader[key] || {};
      if (Array.isArray(part.recommendList)) rows = rows.concat(part.recommendList);
    }
    var pagination = {};
    for (var key2 in loader) {
      if (Object.prototype.hasOwnProperty.call(loader, key2)) {
        var part2 = loader[key2] || {};
        if (part2.pagination) pagination = part2.pagination;
      }
    }
    return { rows: rows, pagination: pagination };
  });
}

function searchApi(keyword, page) {
  var params = "aid=8662&query=" + encodeURIComponent(String(keyword || "")) + "&page=" + Math.max(1, Number(page) || 1);
  return fetchJson(SITE + "/api/search/result?" + params, {
    "User-Agent": WEB_UA,
    "Referer": SITE + "/",
    "Accept": "application/json, text/plain, */*"
  }, 12000).catch(function () { return {}; });
}

function searchRows(keyword, page) {
  return searchApi(keyword, page).then(function (data) {
    var rows = Array.isArray(data.searchList) ? data.searchList : [];
    return { rows: rows, totalPages: Math.max(1, Number(data.totalPages) || 1), hasMore: !!data.hasMore };
  });
}

function uuid() {
  var text = "";
  for (var i = 0; i < 32; i++) text += Math.floor(Math.random() * 16).toString(16);
  return text.slice(0, 8) + "-" + text.slice(8, 12) + "-4" + text.slice(13, 16) + "-" + text.slice(16, 20) + "-" + text.slice(20, 32);
}

function randomDigits(size) {
  var text = String(Math.floor(Math.random() * 9) + 1);
  for (var i = 1; i < size; i++) text += Math.floor(Math.random() * 10);
  return text;
}

function registerDevice() {
  if (deviceCache) return Promise.resolve(deviceCache);
  var header = {
    display_name: "红果免费短剧", aid: 8662, app_version: "7.3.5.32", version_code: 73532,
    manifest_version_code: 73532, update_version_code: 73532, channel: "update_64",
    package: "com.phoenix.read", app_language: "zh", os: "Android", os_version: "16", os_api: 36,
    device_model: "25053RT47C", device_brand: "Redmi", device_manufacturer: "Xiaomi",
    cpu_abi: "arm64-v8a", density_dpi: 520, display_density: "xxhdpi", resolution: "2772x1280",
    language: "zh", timezone: 8, access: "wifi", openudid: randomDigits(16),
    clientudid: uuid(), cdid: uuid(), region: "CN", tz_name: "Asia/Shanghai", tz_offset: 28800,
    sim_region: "cn", device_platform: "android", not_request_sender: 0, is_system_app: 0,
    sdk_flavor: "china", rom: "OS2.0", rom_version: "BP2A.250605.031.A3"
  };
  var body = JSON.stringify({ magic_tag: "ss_app_log", header: header, _gen_time: Date.now() });
  var url = REGISTER_API + "?req_id=" + encodeURIComponent(uuid()) + "&_rticket=" + Date.now();
  return fetch(url, {
    method: "POST",
    headers: { "User-Agent": REGISTER_UA, "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
    body: body,
    timeoutMs: 15000
  }).then(function (response) {
    return response.text().then(function (text) {
      var data = safeJsonParse(text) || {};
      var did = String(pick(data.device_id_str, data.device_id, ""));
      var iid = String(pick(data.install_id_str, data.install_id, ""));
      if (/^\d{10,24}$/.test(did) && /^\d{10,24}$/.test(iid) && did !== "0" && iid !== "0") {
        deviceCache = { device_id: did, install_id: iid };
        return deviceCache;
      }
      throw new Error("device register invalid");
    });
  }).catch(function () {
    deviceCache = { device_id: randomDigits(18), install_id: randomDigits(18) };
    return deviceCache;
  });
}

function fetchV5Model(vid) {
  var key = String(vid);
  var cached = modelCache[key];
  if (cached && cached.expire > Date.now()) return Promise.resolve(cached.model);
  return registerDevice().then(function (device) {
    var values = {
      aid: "8662", app_name: "novelread", version_code: "74532", version_name: "7.4.5.32",
      update_version_code: "74532", manifest_version_code: "74532", os: "android", ssmix: "a",
      channel: "update_64", device_platform: "android", device_type: "25053RT47C",
      device_brand: "Redmi", os_version: "16", os_api: "36", ac: "wifi", language: "zh",
      host_abi: "arm64-v8a", iid: device.install_id, device_id: device.device_id
    };
    var biz = {
      detail_page_version: 0, device_level: 1, disable_digg_stat: false,
      disable_video_relate_book: true, dr_scene: "player", need_all_video_definition: true,
      need_mp4_align: false, use_os_player: false, use_server_dns: false, video_platform: 1024
    };
    var payload = { biz_param: biz, mixed_video_id_map: { "1004": [key] }, video_id: key };
    var body = JSON.stringify(payload);
    var signed = signPlaybackV5(V5_API, values, utf8Bytes(body), Date.now());
    var headers = { "User-Agent": V5_UA, "Accept": "application/json" };
    for (var name in signed.headers) if (Object.prototype.hasOwnProperty.call(signed.headers, name)) headers[name] = signed.headers[name];
    return fetch(signed.url, { method: "POST", headers: headers, body: body, timeoutMs: 25000 }).then(function (response) {
      return response.text().then(function (text) {
        if (response.status !== 200 || !text) throw new Error("EMPTY_RESPONSE");
        var root = safeJsonParse(text) || {};
        if (Number(root.code || root.Code || 0) !== 0) throw new Error("BUSINESS_" + (root.code || root.Code));
        var data = root.data || {};
        var entry = data[key];
        if (!entry && data["1004"] && data["1004"][key]) entry = data["1004"][key];
        if (!entry) {
          for (var bucket in data) {
            if (Object.prototype.hasOwnProperty.call(data, bucket) && data[bucket] && data[bucket][key]) {
              entry = data[bucket][key];
              break;
            }
          }
        }
        var model = entry && entry.video_model ? entry.video_model : data.video_model;
        if (typeof model === "string") model = safeJsonParse(model);
        if (!model) throw new Error("EMPTY_MODEL");
        var expire = Number(data.expire_time) || 0;
        if (expire > 1000000000 && expire < 1000000000000) expire *= 1000;
        modelCache[key] = { model: model, expire: Math.min(expire || Date.now() + 300000, Date.now() + 300000) };
        return model;
      });
    });
  }).catch(function () {
    if (cached) return cached.model;
    throw new Error("NO_STREAM");
  });
}

function gearQuality(item) {
  var texts = [item.gear_des_key, item.quality, item.definition, item.vheight, item.height];
  var meta = item.video_meta || {};
  texts.push(meta.definition, meta.vheight, meta.height, meta.quality);
  for (var i = 0; i < texts.length; i++) {
    var text = String(texts[i] == null ? "" : texts[i]).toLowerCase();
    var match = /(2160|1440|1080|720|576|540|480|360)p?/.exec(text);
    if (match) return Number(match[1]);
  }
  return 0;
}

function deriveContentKey(spade) {
  var raw = base64Decode(spade);
  if (raw.length < 3) return "";
  var size = raw.length - (raw[0] ^ raw[1] ^ raw[2]) + 47;
  if (size <= 0 || 1 + size > raw.length) size = raw.length - 1;
  if (size < 33) return "";
  var value = raw.slice(1, 1 + size);
  var va = 85;
  var vb = 246;
  for (var index = 0; index < value.length; index++) {
    var previous = index & 1 ? va : vb;
    if (index & 1) va = value[index];
    else vb = value[index];
    var count = 0;
    var temp = index;
    while (temp) { count += temp & 1; temp >>>= 1; }
    value[index] = (-21 - count + (previous ^ value[index])) & 255;
  }
  var hex = "";
  for (var i = 1; i < 33 && i < value.length; i++) hex += String.fromCharCode(value[i]);
  if (!/^[0-9a-f]{32}$/i.test(hex)) return "";
  return hex.toLowerCase();
}

function collectVariants(model) {
  var list = model.video_list || model.dynamic_video_list || [];
  if (!Array.isArray(list)) list = [];
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i] || {};
    var url = pick(item.main_url, item.backup_url, item.backup_url_1, item.play_addr, item.url, "");
    if (Array.isArray(url)) url = url[0] || "";
    if (!url) continue;
    var info = item.encrypt_info && typeof item.encrypt_info === "object" ? item.encrypt_info : {};
    var spade = pick(item.spade_a, info.spade_a, "");
    out.push({
      url: String(url),
      quality: gearQuality(item),
      key: spade ? deriveContentKey(spade) : ""
    });
  }
  return out;
}

function selectVariant(variants, wanted) {
  var order = [2160, 1440, 1080, 720, 576, 540, 480, 360];
  var preferred = Number(wanted) || 1080;
  for (var i = 0; i < variants.length; i++) if (variants[i].quality === preferred) return variants[i];
  for (var j = 0; j < order.length; j++) {
    if (order[j] === preferred) continue;
    for (var k = 0; k < variants.length; k++) if (variants[k].quality === order[j]) return variants[k];
  }
  return variants[0];
}

function qualityOfFlag(flag) {
  var text = String(flag || "");
  var match = /(2160|1440|1080|720|576|540|480|360)/.exec(text);
  if (match) return Number(match[1]);
  if (text.indexOf("超清") >= 0) return 1080;
  if (text.indexOf("高清") >= 0) return 720;
  if (text.indexOf("标准") >= 0) return 540;
  if (text.indexOf("流畅") >= 0) return 480;
  if (text.indexOf("极速") >= 0) return 360;
  return 1080;
}

function episodeLines(vids, lineNames) {
  var lines = [];
  var segments = [];
  for (var i = 0; i < lineNames.length; i++) {
    var eps = [];
    for (var j = 0; j < vids.length; j++) eps.push("第" + (j + 1) + "集$" + vids[j]);
    lines.push(lineNames[i]);
    segments.push(eps.join("#"));
  }
  return { lines: lines, segments: segments };
}

function discoverSeasons(sid, sd) {
  var info = sd.season_info || {};
  var group = String(info.series_group_id || "");
  var name = String(sd.series_name || "");
  if (!group) return Promise.resolve([{ no: 0, sd: sd }]);
  var base = baseName(name);
  if (!base) return Promise.resolve([{ no: 0, sd: sd }]);
  var cacheKey = "season:" + sid;
  var cached = seasonCache[cacheKey];
  if (cached && Date.now() - cached.time < 15 * 60 * 1000) return Promise.resolve(cached.list);
  return searchRows(base, 1).then(function (result) {
    var candidates = [];
    var seen = {};
    seen[String(sid)] = true;
    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows[i];
      var vd = row.video_data && typeof row.video_data === "object" ? row.video_data : row;
      var cid = String(pick(vd.series_id, row.series_id, ""));
      var cname = String(pick(row.name, vd.series_title, vd.series_name, ""));
      if (!/^\d{5,}$/.test(cid) || seen[cid]) continue;
      seen[cid] = true;
      var no = seasonNo(cname);
      if (!no && cname === base) no = 1;
      candidates.push({ id: cid, name: cname, no: no });
      if (candidates.length >= 12) break;
    }
    var known = {};
    known[seasonNo(name) || 1] = String(sid);
    for (var j = 0; j < candidates.length; j++) {
      if (candidates[j].no && !known[candidates[j].no]) known[candidates[j].no] = candidates[j].id;
    }
    var wanted = Object.keys(known).map(function (key) { return { no: Number(key), id: known[key] }; });
    var chain = Promise.resolve([]);
    wanted.forEach(function (entry) {
      chain = chain.then(function (list) {
        if (String(entry.id) === String(sid)) return list.concat([{ no: entry.no, sd: sd }]);
        return fetchDetail(entry.id).then(function (other) {
          if (other && String((other.season_info || {}).series_group_id || "") === group) {
            list.push({ no: seasonNo(other.series_name) || entry.no, sd: other });
          }
          return list;
        });
      });
    });
    return chain.then(function (list) {
      var map = {};
      for (var k = 0; k < list.length; k++) if (list[k].sd && list[k].sd.vid_list && list[k].sd.vid_list.length) map[list[k].no || k + 1] = list[k];
      var max = 0;
      for (var key in map) if (Object.prototype.hasOwnProperty.call(map, key)) max = Math.max(max, Number(key) || 0);
      var missing = [];
      for (var n = 1; n <= max + 1 && missing.length < 2; n++) if (!map[n]) missing.push(n);
      var probe = Promise.resolve(map);
      missing.forEach(function (no) {
        probe = probe.then(function (current) {
          return searchRows(base + "第" + cnNumber(no) + "季", 1).then(function (result) {
            var pickId = "";
            for (var i = 0; i < result.rows.length && !pickId; i++) {
              var row = result.rows[i];
              var vd = row.video_data && typeof row.video_data === "object" ? row.video_data : row;
              var cid = String(pick(vd.series_id, row.series_id, ""));
              var cname = String(pick(row.name, vd.series_title, vd.series_name, ""));
              if (/^\d{5,}$/.test(cid) && seasonNo(cname) === no) pickId = cid;
            }
            if (!pickId) return current;
            return fetchDetail(pickId).then(function (other) {
              if (other && String((other.season_info || {}).series_group_id || "") === group) current[no] = { no: no, sd: other };
              return current;
            });
          });
        });
      });
      return probe.then(function (finalMap) {
        var out = [];
        for (var key2 in finalMap) if (Object.prototype.hasOwnProperty.call(finalMap, key2)) out.push(finalMap[key2]);
        out.sort(function (a, b) { return (a.no || 1) - (b.no || 1); });
        if (out.length < 2) out = [{ no: 0, sd: sd }];
        seasonCache[cacheKey] = { list: out, time: Date.now() };
        return out;
      });
    });
  }).catch(function () { return [{ no: 0, sd: sd }]; });
}

async function init(extend) {
  return true;
}

async function home(filter) {
  var classes = [
    { type_id: "real-drama", type_name: "真人剧" },
    { type_id: "comic-drama", type_name: "漫剧" },
    { type_id: "ai-drama", type_name: "AI剧" }
  ];
  var filters = {
    "real-drama": [{ key: "cat", name: "分类", value: [
      { n: "全部", v: "" }, { n: "爱情", v: "romance" }, { n: "年代", v: "period" }, { n: "逆袭", v: "comeback" },
      { n: "传奇", v: "legend" }, { n: "成长", v: "growth" }, { n: "家庭", v: "family" }, { n: "都市", v: "urban" }
    ] }],
    "comic-drama": [{ key: "cat", name: "分类", value: [
      { n: "全部", v: "" }, { n: "脑洞", v: "creative" }, { n: "玄幻", v: "fantasy" }, { n: "末世", v: "apocalypse" }
    ] }],
    "ai-drama": [{ key: "cat", name: "分类", value: [
      { n: "全部", v: "" }, { n: "脑洞", v: "creative" }, { n: "玄幻", v: "fantasy" }, { n: "末世", v: "apocalypse" }
    ] }]
  };
  var list = [];
  try {
    var page = await category("real-drama", 1, {}, {});
    list = page.list || [];
  } catch (error) {}
  return { class: classes, filters: filters, list: list };
}

async function category(tid, page, filter, extend) {
  var pg = Math.max(1, Number(page) || 1);
  var route = String(tid || "real-drama");
  if (route === "comic") return { page: pg, pagecount: pg, limit: 0, total: 0, list: [] };
  var ext = extend || {};
  var cat = String(ext.cat || ext["分类"] || "");
  if (!cat && filter && typeof filter === "object") cat = String(filter.cat || filter["分类"] || "");
  if (cat === "all" || cat === "全部" || cat === "0") cat = "";
  var result = await fetchCategory(route, cat, pg);
  var rows = result.rows || [];
  var list = [];
  var seen = {};
  for (var i = 0; i < rows.length; i++) {
    var item = itemFrom(rows[i]);
    if (!item.vod_id || seen[item.vod_id]) continue;
    seen[item.vod_id] = true;
    list.push(item);
  }
  var pagination = result.pagination || {};
  var totalPages = Math.max(1, Number(pagination.totalPages) || 1);
  if (!list.length) totalPages = pg;
  return {
    page: pg,
    pagecount: totalPages,
    limit: list.length,
    total: Number(pagination.total) || list.length,
    list: list
  };
}

async function search(word, quick, page) {
  var pg = Math.max(1, Number(page) || 1);
  var keyword = String(word || "").trim() || "短剧";
  var data = await searchRows(keyword, pg);
  var list = [];
  var seen = {};
  for (var i = 0; i < data.rows.length; i++) {
    var item = itemFrom(data.rows[i]);
    if (!item.vod_id || seen[item.vod_id]) continue;
    seen[item.vod_id] = true;
    list.push(item);
  }
  var totalPages = data.totalPages;
  if (!list.length) totalPages = pg;
  return { page: pg, pagecount: totalPages, limit: list.length, total: list.length, list: list };
}

async function seriesSeasons(rawId) {
  var sid = String(rawId || "").replace(/^hongguo:/, "").replace(/^hg-series-v1:/, "");
  var sd = await fetchDetail(sid);
  if (!sd || !sd.series_id) return { list: [] };
  var seasons = await discoverSeasons(sid, sd);
  if (!seasons.length || (seasons.length === 1 && !seasons[0].no)) return { list: [] };
  var out = [];
  for (var i = 0; i < seasons.length; i++) {
    var one = seasons[i];
    var item = one.sd || {};
    var vids = item.vid_list || [];
    out.push({
      vod_id: String(item.series_id || sid),
      vod_name: String(item.series_name || ""),
      vod_pic: absUrl(item.series_cover || ""),
      vod_content: String(item.series_intro || ""),
      vod_episodes: Number(item.episode_cnt || vids.length || 0),
      vod_remarks: vids.length ? "全" + vids.length + "集" : String(item.episode_right_text || ""),
      season: Number(one.no || i + 1),
      playable: true,
      status: ""
    });
  }
  return { list: out };
}

async function detail(id) {
  var sid = String(id || "").replace(/^hongguo:/, "").replace(/^hg-series-v1:/, "");
  var sd = await fetchDetail(sid);
  if (!sd || !sd.series_id) {
    var found = await search(sid, true, 1);
    if (found.list && found.list.length) return { list: [found.list[0]] };
    return { list: [] };
  }
  var vids = (sd.vid_list || []).map(function (value) { return String(value); }).filter(function (value) { return /^\d+$/.test(value); });
  var seasons = await discoverSeasons(sid, sd);
  var lines = [];
  var segments = [];
  if (seasons.length > 1) {
    var ordered = [];
    for (var i = 0; i < seasons.length; i++) if (String((seasons[i].sd || {}).series_id || "") === sid) ordered.push(seasons[i]);
    for (var j = 0; j < seasons.length; j++) if (String((seasons[j].sd || {}).series_id || "") !== sid) ordered.push(seasons[j]);
    var used = {};
    for (var k = 0; k < ordered.length; k++) {
      var one = ordered[k];
      var other = one.sd || {};
      var evids = (other.vid_list || []).map(function (value) { return String(value); }).filter(function (value) { return /^\d+$/.test(value); });
      if (!evids.length) continue;
      var token = evids.join(",");
      if (used[token]) continue;
      used[token] = true;
      var label = "第" + cnNumber(one.no || k + 1) + "季 超清";
      if (lines.indexOf(label) >= 0) label += "2";
      lines.push(label);
      var eps = [];
      for (var n = 0; n < evids.length; n++) eps.push("第" + (n + 1) + "集$" + evids[n]);
      segments.push(eps.join("#"));
    }
  }
  if (!lines.length) {
    var names = ["超清", "高清", "标准", "流畅", "极速"];
    var built = episodeLines(vids, names);
    lines = built.lines;
    segments = built.segments;
  }
  var actors = [];
  var celebs = sd.celebrities || [];
  for (var c = 0; c < celebs.length; c++) if (celebs[c] && celebs[c].nickname) actors.push(String(celebs[c].nickname));
  return {
    list: [{
      vod_id: sid,
      vod_name: String(sd.series_name || ""),
      vod_pic: absUrl(sd.series_cover || ""),
      vod_year: "",
      vod_area: "",
      vod_director: "",
      vod_actor: actors.join(","),
      vod_content: String(sd.series_intro || ""),
      vod_remarks: vids.length ? "全" + vids.length + "集" : String(sd.episode_right_text || ""),
      vod_play_from: lines.join("$$$"),
      vod_play_url: segments.join("$$$")
    }]
  };
}

async function play(flag, id, flags) {
  var target = String(id || "").replace(/^hongguo:/, "");
  var vid = "";
  var match = /\/player\/([^/?#]+)\/(\d+)/.exec(target);
  if (match) vid = match[2];
  if (!vid) {
    var digits = target.match(/\d{10,}/g);
    if (digits && digits.length) vid = digits[digits.length - 1];
  }
  if (!/^\d+$/.test(vid)) return { parse: 0, url: "", header: {}, error: "MISSING_EPISODE" };
  var quality = qualityOfFlag(flag);
  if (Array.isArray(flags)) {
    for (var i = 0; i < flags.length; i++) {
      var value = flags[i];
      if (value && typeof value === "object" && Number(value.quality) > 0) quality = Math.round(Number(value.quality));
    }
  }
  var model;
  try {
    model = await fetchV5Model(vid);
  } catch (error) {
    return { parse: 0, url: "", header: {}, error: error.message || "NO_STREAM" };
  }
  var variants = collectVariants(model);
  if (!variants.length) return { parse: 0, url: "", header: {}, error: "NO_VARIANTS" };
  var chosen = selectVariant(variants, quality);
  return {
    parse: 0,
    url: chosen.url,
    header: { "User-Agent": MEDIA_UA, "Referer": MEDIA_REFERER },
    decryptionKey: chosen.key || ""
  };
}

var spider = {
  meta: meta,
  init: init,
  home: home,
  category: category,
  search: search,
  detail: detail,
  play: play,
  seriesSeasons: seriesSeasons
};

if (typeof module !== "undefined" && module.exports) module.exports = spider;
