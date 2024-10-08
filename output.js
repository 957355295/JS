//Tue Oct 08 2024 04:02:40 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("霸王茶姬"),
  axios = require("axios"),
  axiosRetry = require("axios-retry").default,
  {
    sendNotify
  } = require("./sendNotify"),
  SyncRequest = require("sync-request"),
  CryptoJS = require("crypto-js");
let notifyStr = "",
  appid = atob("d3hhZmVjNmY4NDIyY2IzNTdi");
(async () => {
  axiosRetry(axios, {
    retries: 3
  });
  checkVersion("bwcj.js", "17a37c69b8d4379b051c38586803e8c9");
  const _0x21c81d = process.env.bwcj_ck;
  if (!_0x21c81d) {
    logAndNotify("bwcj_ck");
    return;
  }
  let _0x759e39 = _0x21c81d.replaceAll("&", "\n").split("\n");
  for (let _0x4b6b22 = 0; _0x4b6b22 < _0x759e39.length; _0x4b6b22++) {
    if (_0x759e39[_0x4b6b22].indexOf("#") === -1) {
      logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 ck格式有变化，新版本需要有userId");
      continue;
    }
    const _0x4bd7c3 = _0x759e39[_0x4b6b22].split("#")[0],
      _0x42cc8e = _0x759e39[_0x4b6b22].split("#")[1];
    logAndNotify("🧐" + _0x42cc8e + "🧐");
    const _0x5906fb = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x4bd7c3);
    if (!_0x5906fb.data.status) {
      logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 登录失败☹");
      continue;
    }
    const _0x261efd = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userSignStatistics", _0x4bd7c3, {
      activityId: "947079313798000641",
      appid: appid
    });
    if (_0x261efd.data.status) {
      logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 连续签到" + _0x261efd.data.data.signDays + "天");
      if (_0x261efd.data.data.signStatus != 1) {
        const _0x14e1c5 = new Date().getTime(),
          _0x3761b4 = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/takePartInSign", _0x4bd7c3, {
            activityId: "947079313798000641",
            appid: appid,
            storeId: 49006,
            timestamp: _0x14e1c5,
            signature: sgin(_0x14e1c5, _0x42cc8e),
            store_id: 49006
          });
        if (!_0x3761b4.data.status) {
          _0x3761b4.data.message.indexOf("已签到") !== -1 && logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 签到失败：【" + _0x3761b4.data.message + "】");
          if (_0x3761b4.data.message.indexOf("请重试") !== -1) {
            logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 签到失败：【" + _0x3761b4.data.message + "】");
            logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 触发ip限制 本次不再执行脚本，号多的每天多运行几次脚本，间隔2小时以上");
            break;
          } else {
            logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 签到失败☹：【" + _0x3761b4.data.message + "】");
          }
        } else {
          logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 签到成功");
        }
      } else {
        logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 已签到");
      }
    }
    const _0x5ab6d4 = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x4bd7c3);
    _0x5ab6d4.data.status && logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 积分：【" + _0x5ab6d4.data.data.customerAssertInfo.integral + "】");
    const _0x5b27fc = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userReward", _0x4bd7c3, {
      activityId: "947079313798000641",
      appid: appid,
      pageNo: 1,
      pageSize: 30
    });
    if (_0x5b27fc.data.status) {
      const _0x471933 = _0x5b27fc.data.data.list;
      for (let _0x38239b = 0; _0x38239b < _0x471933.length; _0x38239b++) {
        if (_0x471933[_0x38239b].rewardType === 1) {
          logAndNotify("账号【" + (_0x4b6b22 + 1) + "】 奖品领取时间【" + _0x471933[_0x38239b].date + "】【" + _0x471933[_0x38239b].rewardName + "】");
        }
      }
    }
  }
})().catch(_0x2c9a4f => {
  logAndNotify(_0x2c9a4f);
}).finally(() => {
  sendNotify("霸王茶姬", notifyStr);
  $.done();
});
async function sendPostRequest(_0x40b70c, _0x317bbb, _0x3c8910) {
  try {
    const _0x23b450 = {
        scene: 1027,
        "Qm-From": "wechat",
        "store-id": 49006,
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
      },
      _0x1c939a = {
        ..._0x23b450,
        ...{
          "Qm-User-Token": _0x317bbb
        }
      },
      _0x2245a6 = axios.create({
        headers: _0x1c939a,
        timeout: 60000
      });
    return _0x2245a6.post(_0x40b70c, _0x3c8910);
  } catch (_0x13147f) {
    if (axios.isAxiosError(_0x13147f)) {
      _0x13147f.code === "ECONNABORTED" && _0x13147f.message.includes("timeout") ? console.error("请求超时：", _0x13147f.message) : console.error("其他错误：", _0x13147f.message);
    } else {
      console.error("未知错误：", _0x13147f);
    }
    throw _0x13147f;
  }
}
async function sendGetRequest(_0x263cbd, _0xa143d2) {
  try {
    const _0x4039e9 = {
        scene: 1027,
        "Qm-From": "wechat",
        "store-id": 49006,
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
      },
      _0x234cb3 = {
        ..._0x4039e9,
        ...{
          "Qm-User-Token": _0xa143d2
        }
      },
      _0x1f5b0c = axios.create({
        headers: _0x234cb3,
        timeout: 60000
      });
    return _0x1f5b0c.get(_0x263cbd);
  } catch (_0x4d8ff8) {
    if (axios.isAxiosError(_0x4d8ff8)) {
      if (_0x4d8ff8.code === "ECONNABORTED" && _0x4d8ff8.message.includes("timeout")) {
        console.error("请求超时：", _0x4d8ff8.message);
      } else {
        console.error("其他错误：", _0x4d8ff8.message);
      }
    } else {
      console.error("未知错误：", _0x4d8ff8);
    }
    throw _0x4d8ff8;
  }
}
function delay(_0x22b0a2) {
  return new Promise(_0x3dcbf5 => setTimeout(_0x3dcbf5, _0x22b0a2));
}
function logAndNotify(_0x3702fb) {
  1;
  $.log(_0x3702fb);
  notifyStr += _0x3702fb;
  notifyStr += "\n";
}
function sgin(_0x4b70e6, _0x27aefc) {
  var _0x244ff8 = "947079313798000641",
    _0x59cf07 = 49006,
    _0x9894b2 = _0x59cf07 ? _0x59cf07.toString() : undefined,
    _0x5df7b0 = {
      activityId: _0x244ff8,
      sellerId: _0x9894b2,
      timestamp: _0x4b70e6,
      userId: _0x27aefc
    },
    _0x44cc31 = Object.keys(_0x5df7b0).sort(),
    _0x5398f1 = _0x44cc31.reduce(function (_0x1517d4, _0x43215d) {
      _0x1517d4[_0x43215d] = _0x5df7b0[_0x43215d];
      return _0x1517d4;
    }, {}),
    _0x32e7f5 = Object.entries(_0x5398f1).map(function (_0x16d773) {
      var [_0x39f4bf, _0x466142] = _0x16d773;
      return _0x39f4bf + "=" + _0x466142;
    }).join("&") + "&key=" + _0x244ff8.split("").reverse().join(""),
    _0x55272c = CryptoJS.MD5(_0x32e7f5).toString(CryptoJS.enc.Hex).toUpperCase();
  return _0x55272c;
}
function Env(_0xde8bb7, _0x4618c0) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x4e8e7f {
    constructor(_0x5b5655) {
      this.env = _0x5b5655;
    }
    send(_0x307664, _0x3bf85b = "GET") {
      _0x307664 = "string" == typeof _0x307664 ? {
        url: _0x307664
      } : _0x307664;
      let _0x20d0d2 = this.get;
      "POST" === _0x3bf85b && (_0x20d0d2 = this.post);
      return new Promise((_0x2e53f0, _0x2ec287) => {
        _0x20d0d2.call(this, _0x307664, (_0x2a3aee, _0x118e56, _0x261c36) => {
          _0x2a3aee ? _0x2ec287(_0x2a3aee) : _0x2e53f0(_0x118e56);
        });
      });
    }
    get(_0x69fe1c) {
      return this.send.call(this.env, _0x69fe1c);
    }
    post(_0x3e95e6) {
      return this.send.call(this.env, _0x3e95e6, "POST");
    }
  }
  return new class {
    constructor(_0x47dcc8, _0x469117) {
      this.name = _0x47dcc8;
      this.http = new _0x4e8e7f(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x469117);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0x4eeb80, _0x47f0e8 = null) {
      try {
        return JSON.parse(_0x4eeb80);
      } catch {
        return _0x47f0e8;
      }
    }
    toStr(_0x30f092, _0x148392 = null) {
      try {
        return JSON.stringify(_0x30f092);
      } catch {
        return _0x148392;
      }
    }
    getjson(_0x2b14c2, _0x81d0c7) {
      let _0x335365 = _0x81d0c7;
      const _0x10bcb1 = this.getdata(_0x2b14c2);
      if (_0x10bcb1) {
        try {
          _0x335365 = JSON.parse(this.getdata(_0x2b14c2));
        } catch {}
      }
      return _0x335365;
    }
    setjson(_0x5646d6, _0x4c960b) {
      try {
        return this.setdata(JSON.stringify(_0x5646d6), _0x4c960b);
      } catch {
        return !1;
      }
    }
    getScript(_0x2ba47c) {
      return new Promise(_0x14637c => {
        this.get({
          url: _0x2ba47c
        }, (_0x5cb43e, _0x9ffd98, _0x7a596b) => _0x14637c(_0x7a596b));
      });
    }
    runScript(_0x52a448, _0x28b240) {
      return new Promise(_0xa9ded0 => {
        let _0x3a613d = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x3a613d = _0x3a613d ? _0x3a613d.replace(/\n/g, "").trim() : _0x3a613d;
        let _0x2cc976 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x2cc976 = _0x2cc976 ? 1 * _0x2cc976 : 20;
        _0x2cc976 = _0x28b240 && _0x28b240.timeout ? _0x28b240.timeout : _0x2cc976;
        const [_0x25a2ab, _0x35ef9a] = _0x3a613d.split("@"),
          _0x30e339 = {
            url: "http://" + _0x35ef9a + "/v1/scripting/evaluate",
            body: {
              script_text: _0x52a448,
              mock_type: "cron",
              timeout: _0x2cc976
            },
            headers: {
              "X-Key": _0x25a2ab,
              Accept: "*/*"
            }
          };
        this.post(_0x30e339, (_0x1e194a, _0x18c0d0, _0x10cc44) => _0xa9ded0(_0x10cc44));
      }).catch(_0x4d24fa => this.logErr(_0x4d24fa));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x11bf40 = this.path.resolve(this.dataFile),
          _0x44e156 = this.path.resolve(process.cwd(), this.dataFile),
          _0x2c927d = this.fs.existsSync(_0x11bf40),
          _0x125f67 = !_0x2c927d && this.fs.existsSync(_0x44e156);
        if (!_0x2c927d && !_0x125f67) {
          return {};
        }
        {
          const _0x2d809d = _0x2c927d ? _0x11bf40 : _0x44e156;
          try {
            return JSON.parse(this.fs.readFileSync(_0x2d809d));
          } catch (_0x1066c9) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x4546fb = this.path.resolve(this.dataFile),
          _0x26ac91 = this.path.resolve(process.cwd(), this.dataFile),
          _0x164d41 = this.fs.existsSync(_0x4546fb),
          _0x323d13 = !_0x164d41 && this.fs.existsSync(_0x26ac91),
          _0x240006 = JSON.stringify(this.data);
        _0x164d41 ? this.fs.writeFileSync(_0x4546fb, _0x240006) : _0x323d13 ? this.fs.writeFileSync(_0x26ac91, _0x240006) : this.fs.writeFileSync(_0x4546fb, _0x240006);
      }
    }
    lodash_get(_0x3038ed, _0x35407d, _0x29bfef) {
      const _0x228c9d = _0x35407d.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x54ded9 = _0x3038ed;
      for (const _0x5782e1 of _0x228c9d) if (_0x54ded9 = Object(_0x54ded9)[_0x5782e1], void 0 === _0x54ded9) {
        return _0x29bfef;
      }
      return _0x54ded9;
    }
    lodash_set(_0x5a61db, _0x36f1ff, _0x562b20) {
      return Object(_0x5a61db) !== _0x5a61db ? _0x5a61db : (Array.isArray(_0x36f1ff) || (_0x36f1ff = _0x36f1ff.toString().match(/[^.[\]]+/g) || []), _0x36f1ff.slice(0, -1).reduce((_0x2ffb15, _0x11ec4f, _0x1a71fc) => Object(_0x2ffb15[_0x11ec4f]) === _0x2ffb15[_0x11ec4f] ? _0x2ffb15[_0x11ec4f] : _0x2ffb15[_0x11ec4f] = Math.abs(_0x36f1ff[_0x1a71fc + 1]) >> 0 == +_0x36f1ff[_0x1a71fc + 1] ? [] : {}, _0x5a61db)[_0x36f1ff[_0x36f1ff.length - 1]] = _0x562b20, _0x5a61db);
    }
    getdata(_0x5f31e9) {
      let _0x2fcaf8 = this.getval(_0x5f31e9);
      if (/^@/.test(_0x5f31e9)) {
        const [, _0x4832e7, _0xae69c5] = /^@(.*?)\.(.*?)$/.exec(_0x5f31e9),
          _0x96d208 = _0x4832e7 ? this.getval(_0x4832e7) : "";
        if (_0x96d208) {
          try {
            const _0x267344 = JSON.parse(_0x96d208);
            _0x2fcaf8 = _0x267344 ? this.lodash_get(_0x267344, _0xae69c5, "") : _0x2fcaf8;
          } catch (_0x46b563) {
            _0x2fcaf8 = "";
          }
        }
      }
      return _0x2fcaf8;
    }
    setdata(_0x7d31b9, _0x384d33) {
      let _0x51a0e6 = !1;
      if (/^@/.test(_0x384d33)) {
        const [, _0x3705f, _0x5348a5] = /^@(.*?)\.(.*?)$/.exec(_0x384d33),
          _0x1ffbb0 = this.getval(_0x3705f),
          _0x325527 = _0x3705f ? "null" === _0x1ffbb0 ? null : _0x1ffbb0 || "{}" : "{}";
        try {
          const _0x1a3775 = JSON.parse(_0x325527);
          this.lodash_set(_0x1a3775, _0x5348a5, _0x7d31b9);
          _0x51a0e6 = this.setval(JSON.stringify(_0x1a3775), _0x3705f);
        } catch (_0x5f159f) {
          const _0x236f9a = {};
          this.lodash_set(_0x236f9a, _0x5348a5, _0x7d31b9);
          _0x51a0e6 = this.setval(JSON.stringify(_0x236f9a), _0x3705f);
        }
      } else {
        _0x51a0e6 = this.setval(_0x7d31b9, _0x384d33);
      }
      return _0x51a0e6;
    }
    getval(_0x183cd7) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x183cd7) : this.isQuanX() ? $prefs.valueForKey(_0x183cd7) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x183cd7]) : this.data && this.data[_0x183cd7] || null;
    }
    setval(_0x21ec29, _0x580d1a) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x21ec29, _0x580d1a) : this.isQuanX() ? $prefs.setValueForKey(_0x21ec29, _0x580d1a) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x580d1a] = _0x21ec29, this.writedata(), !0) : this.data && this.data[_0x580d1a] || null;
    }
    initGotEnv(_0x5f13ac) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x5f13ac && (_0x5f13ac.headers = _0x5f13ac.headers ? _0x5f13ac.headers : {}, void 0 === _0x5f13ac.headers.Cookie && void 0 === _0x5f13ac.cookieJar && (_0x5f13ac.cookieJar = this.ckjar));
    }
    get(_0x1f733f, _0x2e1c95 = () => {}) {
      _0x1f733f.headers && (delete _0x1f733f.headers["Content-Type"], delete _0x1f733f.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x1f733f.headers = _0x1f733f.headers || {}, Object.assign(_0x1f733f.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x1f733f, (_0x4c9f18, _0x1f20e1, _0x1336c0) => {
        !_0x4c9f18 && _0x1f20e1 && (_0x1f20e1.body = _0x1336c0, _0x1f20e1.statusCode = _0x1f20e1.status);
        _0x2e1c95(_0x4c9f18, _0x1f20e1, _0x1336c0);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x1f733f.opts = _0x1f733f.opts || {}, Object.assign(_0x1f733f.opts, {
        hints: !1
      })), $task.fetch(_0x1f733f).then(_0x4a24e5 => {
        const {
          statusCode: _0x4f5422,
          statusCode: _0x57baef,
          headers: _0x103bd6,
          body: _0x59241f
        } = _0x4a24e5;
        _0x2e1c95(null, {
          status: _0x4f5422,
          statusCode: _0x57baef,
          headers: _0x103bd6,
          body: _0x59241f
        }, _0x59241f);
      }, _0x5cff76 => _0x2e1c95(_0x5cff76))) : this.isNode() && (this.initGotEnv(_0x1f733f), this.got(_0x1f733f).on("redirect", (_0x21aa9c, _0x56eb50) => {
        try {
          if (_0x21aa9c.headers["set-cookie"]) {
            const _0x27153f = _0x21aa9c.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x27153f && this.ckjar.setCookieSync(_0x27153f, null);
            _0x56eb50.cookieJar = this.ckjar;
          }
        } catch (_0xd5573) {
          this.logErr(_0xd5573);
        }
      }).then(_0x44e929 => {
        const {
          statusCode: _0x3017d6,
          statusCode: _0x1e7df3,
          headers: _0x4a43f6,
          body: _0x468fe7
        } = _0x44e929;
        _0x2e1c95(null, {
          status: _0x3017d6,
          statusCode: _0x1e7df3,
          headers: _0x4a43f6,
          body: _0x468fe7
        }, _0x468fe7);
      }, _0x2a5fe7 => {
        const {
          message: _0x4334b7,
          response: _0x3893e2
        } = _0x2a5fe7;
        _0x2e1c95(_0x4334b7, _0x3893e2, _0x3893e2 && _0x3893e2.body);
      }));
    }
    post(_0x300727, _0x4dd1da = () => {}) {
      if (_0x300727.body && _0x300727.headers && !_0x300727.headers["Content-Type"] && (_0x300727.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x300727.headers && delete _0x300727.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x300727.headers = _0x300727.headers || {}, Object.assign(_0x300727.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x300727, (_0x10f5a7, _0x38938f, _0x1082c5) => {
          !_0x10f5a7 && _0x38938f && (_0x38938f.body = _0x1082c5, _0x38938f.statusCode = _0x38938f.status);
          _0x4dd1da(_0x10f5a7, _0x38938f, _0x1082c5);
        });
      } else {
        if (this.isQuanX()) {
          _0x300727.method = "POST";
          this.isNeedRewrite && (_0x300727.opts = _0x300727.opts || {}, Object.assign(_0x300727.opts, {
            hints: !1
          }));
          $task.fetch(_0x300727).then(_0xe35192 => {
            const {
              statusCode: _0x5c4ba8,
              statusCode: _0x44985d,
              headers: _0x1f397d,
              body: _0x39889a
            } = _0xe35192;
            _0x4dd1da(null, {
              status: _0x5c4ba8,
              statusCode: _0x44985d,
              headers: _0x1f397d,
              body: _0x39889a
            }, _0x39889a);
          }, _0x461ac5 => _0x4dd1da(_0x461ac5));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x300727);
            const {
              url: _0x49af2c,
              ..._0x14b748
            } = _0x300727;
            this.got.post(_0x49af2c, _0x14b748).then(_0x36c80 => {
              const {
                statusCode: _0xea1b84,
                statusCode: _0x106d34,
                headers: _0x9e71c2,
                body: _0x417a65
              } = _0x36c80;
              _0x4dd1da(null, {
                status: _0xea1b84,
                statusCode: _0x106d34,
                headers: _0x9e71c2,
                body: _0x417a65
              }, _0x417a65);
            }, _0x1009c4 => {
              const {
                message: _0x488d9f,
                response: _0x47706c
              } = _0x1009c4;
              _0x4dd1da(_0x488d9f, _0x47706c, _0x47706c && _0x47706c.body);
            });
          }
        }
      }
    }
    time(_0x186d3e, _0x29a795 = null) {
      const _0x4691ba = _0x29a795 ? new Date(_0x29a795) : new Date();
      let _0x2d36cf = {
        "M+": _0x4691ba.getMonth() + 1,
        "d+": _0x4691ba.getDate(),
        "H+": _0x4691ba.getHours(),
        "m+": _0x4691ba.getMinutes(),
        "s+": _0x4691ba.getSeconds(),
        "q+": Math.floor((_0x4691ba.getMonth() + 3) / 3),
        S: _0x4691ba.getMilliseconds()
      };
      /(y+)/.test(_0x186d3e) && (_0x186d3e = _0x186d3e.replace(RegExp.$1, (_0x4691ba.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x51326a in _0x2d36cf) new RegExp("(" + _0x51326a + ")").test(_0x186d3e) && (_0x186d3e = _0x186d3e.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x2d36cf[_0x51326a] : ("00" + _0x2d36cf[_0x51326a]).substr(("" + _0x2d36cf[_0x51326a]).length)));
      return _0x186d3e;
    }
    msg(_0x2dfa26 = _0xde8bb7, _0x849dc5 = "", _0x3ca7fd = "", _0x26235d) {
      const _0x43a7f5 = _0x5113ad => {
        if (!_0x5113ad) {
          return _0x5113ad;
        }
        if ("string" == typeof _0x5113ad) {
          return this.isLoon() ? _0x5113ad : this.isQuanX() ? {
            "open-url": _0x5113ad
          } : this.isSurge() ? {
            url: _0x5113ad
          } : void 0;
        }
        if ("object" == typeof _0x5113ad) {
          if (this.isLoon()) {
            let _0x542873 = _0x5113ad.openUrl || _0x5113ad.url || _0x5113ad["open-url"],
              _0x4cfb70 = _0x5113ad.mediaUrl || _0x5113ad["media-url"];
            return {
              openUrl: _0x542873,
              mediaUrl: _0x4cfb70
            };
          }
          if (this.isQuanX()) {
            let _0x5cc1cc = _0x5113ad["open-url"] || _0x5113ad.url || _0x5113ad.openUrl,
              _0x4c0ff0 = _0x5113ad["media-url"] || _0x5113ad.mediaUrl;
            return {
              "open-url": _0x5cc1cc,
              "media-url": _0x4c0ff0
            };
          }
          if (this.isSurge()) {
            let _0x4ebe66 = _0x5113ad.url || _0x5113ad.openUrl || _0x5113ad["open-url"];
            return {
              url: _0x4ebe66
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x2dfa26, _0x849dc5, _0x3ca7fd, _0x43a7f5(_0x26235d)) : this.isQuanX() && $notify(_0x2dfa26, _0x849dc5, _0x3ca7fd, _0x43a7f5(_0x26235d))), !this.isMuteLog) {
        let _0x187eee = ["", "==============📣系统通知📣=============="];
        _0x187eee.push(_0x2dfa26);
        _0x849dc5 && _0x187eee.push(_0x849dc5);
        _0x3ca7fd && _0x187eee.push(_0x3ca7fd);
        console.log(_0x187eee.join("\n"));
        this.logs = this.logs.concat(_0x187eee);
      }
    }
    log(..._0x19b08a) {
      _0x19b08a.length > 0 && (this.logs = [...this.logs, ..._0x19b08a]);
      console.log(_0x19b08a.join(this.logSeparator));
    }
    logErr(_0x38e926, _0x5e1eab) {
      const _0x1e2215 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x1e2215 ? this.log("", "❗️" + this.name + ", 错误!", _0x38e926.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x38e926);
    }
    wait(_0x991660) {
      return new Promise(_0x31661d => setTimeout(_0x31661d, _0x991660));
    }
    done(_0x15fe20 = {}) {
      const _0x18219f = new Date().getTime(),
        _0x53b6a6 = (_0x18219f - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x53b6a6 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x15fe20);
    }
  }(_0xde8bb7, _0x4618c0);
}
function checkVersion(_0x18fcc4, _0x8e075) {
  try {
    logAndNotify("文件md5：" + _0x8e075);
    const _0x22e4a8 = SyncRequest("GET", "https://checktoke.filegear-sg.me/api/update/check?fileName=" + _0x18fcc4 + "&fileMd5=" + _0x8e075),
      _0x19cef1 = JSON.parse(_0x22e4a8.getBody("utf8"));
    if (_0x19cef1.code === 301) {
      process.exit(0);
    } else {
      logAndNotify(_0x19cef1.data);
    }
  } catch (_0x2d2a10) {
    logAndNotify("版本检查失败:", _0x2d2a10);
  }
}