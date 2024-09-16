//Mon Sep 16 2024 12:47:20 GMT+0000 (Coordinated Universal Time)
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
  checkVersion("bwcj.js", "2e2f2d378b05ec05dbb2880395d0437e");
  const _0x3e8580 = process.env.bwcj_ck;
  if (!_0x3e8580) {
    logAndNotify("bwcj_ck");
    return;
  }
  let _0xb744c0 = _0x3e8580.replaceAll("&", "\n").split("\n");
  for (let _0x4099f5 = 0; _0x4099f5 < _0xb744c0.length; _0x4099f5++) {
    if (_0xb744c0[_0x4099f5].indexOf("#") === -1) {
      logAndNotify("账号【" + (_0x4099f5 + 1) + "】 ck格式有变化，新版本需要有userId");
      continue;
    }
    const _0x383893 = _0xb744c0[_0x4099f5].split("#")[0],
      _0x15b28d = _0xb744c0[_0x4099f5].split("#")[1];
    logAndNotify("🧐" + _0x15b28d + "🧐");
    const _0x3d0482 = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x383893);
    if (!_0x3d0482.data.status) {
      logAndNotify("账号【" + (_0x4099f5 + 1) + "】 登录失败☹");
      continue;
    }
    const _0x84d837 = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userSignStatistics", _0x383893, {
      activityId: "947079313798000641",
      appid: appid
    });
    if (_0x84d837.data.status) {
      logAndNotify("账号【" + (_0x4099f5 + 1) + "】 连续签到" + _0x84d837.data.data.signDays + "天");
      if (_0x84d837.data.data.signStatus != 1) {
        const _0x4da893 = new Date().getTime(),
          _0x597e17 = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/takePartInSign", _0x383893, {
            activityId: "947079313798000641",
            appid: appid,
            storeId: 49006,
            timestamp: _0x4da893,
            signature: sgin(_0x4da893, _0x15b28d),
            store_id: 49006
          });
        if (!_0x597e17.data.status) {
          _0x597e17.data.message.indexOf("已签到") !== -1 && logAndNotify("账号【" + (_0x4099f5 + 1) + "】 签到失败：【" + _0x597e17.data.message + "】");
          if (_0x597e17.data.message.indexOf("请重试") !== -1) {
            logAndNotify("账号【" + (_0x4099f5 + 1) + "】 签到失败：【" + _0x597e17.data.message + "】");
            logAndNotify("账号【" + (_0x4099f5 + 1) + "】 触发ip限制 本次不再执行脚本，号多的每天多运行几次脚本，间隔2小时以上");
            break;
          } else {
            logAndNotify("账号【" + (_0x4099f5 + 1) + "】 签到失败☹：【" + _0x597e17.data.message + "】");
          }
        } else {
          logAndNotify("账号【" + (_0x4099f5 + 1) + "】 签到成功");
        }
      } else {
        logAndNotify("账号【" + (_0x4099f5 + 1) + "】 已签到");
      }
    }
    const _0x5bd602 = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x383893);
    _0x5bd602.data.status && logAndNotify("账号【" + (_0x4099f5 + 1) + "】 积分：【" + _0x5bd602.data.data.customerAssertInfo.integral + "】");
    const _0x5f1d2e = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userReward", _0x383893, {
      activityId: "947079313798000641",
      appid: appid,
      pageNo: 1,
      pageSize: 30
    });
    if (_0x5f1d2e.data.status) {
      const _0x5351c8 = _0x5f1d2e.data.data.list;
      for (let _0xb7f804 = 0; _0xb7f804 < _0x5351c8.length; _0xb7f804++) {
        _0x5351c8[_0xb7f804].rewardType === 1 && logAndNotify("账号【" + (_0x4099f5 + 1) + "】 奖品领取时间【" + _0x5351c8[_0xb7f804].date + "】【" + _0x5351c8[_0xb7f804].rewardName + "】");
      }
    }
  }
})().catch(_0x138095 => {
  logAndNotify(_0x138095);
}).finally(() => {
  sendNotify("霸王茶姬", notifyStr);
  $.done();
});
async function sendPostRequest(_0x2a1b06, _0x5d0e0e, _0x3ce372) {
  await delay(2000);
  const _0x5f0d69 = {
      scene: 1027,
      "Qm-From": "wechat",
      "store-id": 49006,
      "Qm-From-Type": "catering",
      Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
    },
    _0x59b712 = {
      ..._0x5f0d69,
      ...{
        "Qm-User-Token": _0x5d0e0e
      }
    },
    _0x390467 = axios.create({
      headers: _0x59b712
    });
  return _0x390467.post(_0x2a1b06, _0x3ce372);
}
async function sendGetRequest(_0x2556c3, _0x156f14) {
  await delay(2000);
  const _0x1abf77 = {
      scene: 1027,
      "Qm-From": "wechat",
      "store-id": 49006,
      "Qm-From-Type": "catering",
      Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
    },
    _0x261862 = {
      ..._0x1abf77,
      ...{
        "Qm-User-Token": _0x156f14
      }
    },
    _0x5e1cf7 = axios.create({
      headers: _0x261862
    });
  return _0x5e1cf7.get(_0x2556c3);
}
function delay(_0x41d1a0) {
  return new Promise(_0x2ea6bc => setTimeout(_0x2ea6bc, _0x41d1a0));
}
function logAndNotify(_0x1546a7) {
  1;
  $.log(_0x1546a7);
  notifyStr += _0x1546a7;
  notifyStr += "\n";
}
function sgin(_0x4fc3bd, _0x64a370) {
  var _0x45adb5 = "947079313798000641",
    _0x52ab11 = 49006,
    _0x568873 = _0x52ab11 ? _0x52ab11.toString() : undefined,
    _0x5eee7e = {
      activityId: _0x45adb5,
      sellerId: _0x568873,
      timestamp: _0x4fc3bd,
      userId: _0x64a370
    },
    _0x159714 = Object.keys(_0x5eee7e).sort(),
    _0x5c9993 = _0x159714.reduce(function (_0x106496, _0x5d6590) {
      _0x106496[_0x5d6590] = _0x5eee7e[_0x5d6590];
      return _0x106496;
    }, {}),
    _0x47eb0b = Object.entries(_0x5c9993).map(function (_0x19df7f) {
      var [_0x4c1896, _0x3b40d9] = _0x19df7f;
      return _0x4c1896 + "=" + _0x3b40d9;
    }).join("&") + "&key=" + _0x45adb5.split("").reverse().join(""),
    _0x2a3e1c = CryptoJS.MD5(_0x47eb0b).toString(CryptoJS.enc.Hex).toUpperCase();
  return _0x2a3e1c;
}
function Env(_0x385cd6, _0x44822c) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x22b061 {
    constructor(_0x3b80d0) {
      this.env = _0x3b80d0;
    }
    send(_0xc66bcf, _0x503316 = "GET") {
      _0xc66bcf = "string" == typeof _0xc66bcf ? {
        url: _0xc66bcf
      } : _0xc66bcf;
      let _0x4a0021 = this.get;
      "POST" === _0x503316 && (_0x4a0021 = this.post);
      return new Promise((_0x871b2e, _0x3d3e65) => {
        _0x4a0021.call(this, _0xc66bcf, (_0x581694, _0x184186, _0xb69fed) => {
          _0x581694 ? _0x3d3e65(_0x581694) : _0x871b2e(_0x184186);
        });
      });
    }
    get(_0x4fd2b7) {
      return this.send.call(this.env, _0x4fd2b7);
    }
    post(_0x4b6a4d) {
      return this.send.call(this.env, _0x4b6a4d, "POST");
    }
  }
  return new class {
    constructor(_0x4efadb, _0x477c95) {
      this.name = _0x4efadb;
      this.http = new _0x22b061(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x477c95);
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
    toObj(_0x27a0d2, _0x3e52b9 = null) {
      try {
        return JSON.parse(_0x27a0d2);
      } catch {
        return _0x3e52b9;
      }
    }
    toStr(_0x1f13ea, _0x5aa6bf = null) {
      try {
        return JSON.stringify(_0x1f13ea);
      } catch {
        return _0x5aa6bf;
      }
    }
    getjson(_0x3e4f55, _0x18c57d) {
      let _0x33a83f = _0x18c57d;
      const _0x32b5c0 = this.getdata(_0x3e4f55);
      if (_0x32b5c0) {
        try {
          _0x33a83f = JSON.parse(this.getdata(_0x3e4f55));
        } catch {}
      }
      return _0x33a83f;
    }
    setjson(_0x21c29c, _0x464079) {
      try {
        return this.setdata(JSON.stringify(_0x21c29c), _0x464079);
      } catch {
        return !1;
      }
    }
    getScript(_0x5bef2b) {
      return new Promise(_0xb5d0df => {
        this.get({
          url: _0x5bef2b
        }, (_0x26d044, _0x17a4dc, _0x4fd2f0) => _0xb5d0df(_0x4fd2f0));
      });
    }
    runScript(_0x34eaea, _0x39aaab) {
      return new Promise(_0x5c6280 => {
        let _0xfeb697 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0xfeb697 = _0xfeb697 ? _0xfeb697.replace(/\n/g, "").trim() : _0xfeb697;
        let _0x174716 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x174716 = _0x174716 ? 1 * _0x174716 : 20;
        _0x174716 = _0x39aaab && _0x39aaab.timeout ? _0x39aaab.timeout : _0x174716;
        const [_0x29f40c, _0x344eac] = _0xfeb697.split("@"),
          _0x61c615 = {
            url: "http://" + _0x344eac + "/v1/scripting/evaluate",
            body: {
              script_text: _0x34eaea,
              mock_type: "cron",
              timeout: _0x174716
            },
            headers: {
              "X-Key": _0x29f40c,
              Accept: "*/*"
            }
          };
        this.post(_0x61c615, (_0x4bf0c8, _0x20c9ea, _0x5108d5) => _0x5c6280(_0x5108d5));
      }).catch(_0xcc7758 => this.logErr(_0xcc7758));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x231f73 = this.path.resolve(this.dataFile),
          _0xbc5407 = this.path.resolve(process.cwd(), this.dataFile),
          _0xdc1ee9 = this.fs.existsSync(_0x231f73),
          _0x3457b7 = !_0xdc1ee9 && this.fs.existsSync(_0xbc5407);
        if (!_0xdc1ee9 && !_0x3457b7) {
          return {};
        }
        {
          const _0x2c951e = _0xdc1ee9 ? _0x231f73 : _0xbc5407;
          try {
            return JSON.parse(this.fs.readFileSync(_0x2c951e));
          } catch (_0x2fb919) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x467055 = this.path.resolve(this.dataFile),
          _0x557c88 = this.path.resolve(process.cwd(), this.dataFile),
          _0x522291 = this.fs.existsSync(_0x467055),
          _0xa9a002 = !_0x522291 && this.fs.existsSync(_0x557c88),
          _0x29c4ae = JSON.stringify(this.data);
        _0x522291 ? this.fs.writeFileSync(_0x467055, _0x29c4ae) : _0xa9a002 ? this.fs.writeFileSync(_0x557c88, _0x29c4ae) : this.fs.writeFileSync(_0x467055, _0x29c4ae);
      }
    }
    lodash_get(_0x6d52f4, _0x33d058, _0x4ede43) {
      const _0x149dd9 = _0x33d058.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0xcfa012 = _0x6d52f4;
      for (const _0x5056d8 of _0x149dd9) if (_0xcfa012 = Object(_0xcfa012)[_0x5056d8], void 0 === _0xcfa012) {
        return _0x4ede43;
      }
      return _0xcfa012;
    }
    lodash_set(_0x544259, _0x1acecf, _0x2e97d7) {
      return Object(_0x544259) !== _0x544259 ? _0x544259 : (Array.isArray(_0x1acecf) || (_0x1acecf = _0x1acecf.toString().match(/[^.[\]]+/g) || []), _0x1acecf.slice(0, -1).reduce((_0x57afdd, _0x528316, _0x98811b) => Object(_0x57afdd[_0x528316]) === _0x57afdd[_0x528316] ? _0x57afdd[_0x528316] : _0x57afdd[_0x528316] = Math.abs(_0x1acecf[_0x98811b + 1]) >> 0 == +_0x1acecf[_0x98811b + 1] ? [] : {}, _0x544259)[_0x1acecf[_0x1acecf.length - 1]] = _0x2e97d7, _0x544259);
    }
    getdata(_0x26ae85) {
      let _0x12918c = this.getval(_0x26ae85);
      if (/^@/.test(_0x26ae85)) {
        const [, _0x371e36, _0x5b5783] = /^@(.*?)\.(.*?)$/.exec(_0x26ae85),
          _0x3c1b02 = _0x371e36 ? this.getval(_0x371e36) : "";
        if (_0x3c1b02) {
          try {
            const _0x559e93 = JSON.parse(_0x3c1b02);
            _0x12918c = _0x559e93 ? this.lodash_get(_0x559e93, _0x5b5783, "") : _0x12918c;
          } catch (_0x54d47b) {
            _0x12918c = "";
          }
        }
      }
      return _0x12918c;
    }
    setdata(_0x4588a4, _0x370128) {
      let _0x219814 = !1;
      if (/^@/.test(_0x370128)) {
        const [, _0x110b10, _0x195ab8] = /^@(.*?)\.(.*?)$/.exec(_0x370128),
          _0x1a5792 = this.getval(_0x110b10),
          _0x4456e0 = _0x110b10 ? "null" === _0x1a5792 ? null : _0x1a5792 || "{}" : "{}";
        try {
          const _0x536f6d = JSON.parse(_0x4456e0);
          this.lodash_set(_0x536f6d, _0x195ab8, _0x4588a4);
          _0x219814 = this.setval(JSON.stringify(_0x536f6d), _0x110b10);
        } catch (_0x2f8f26) {
          const _0x5a1fd6 = {};
          this.lodash_set(_0x5a1fd6, _0x195ab8, _0x4588a4);
          _0x219814 = this.setval(JSON.stringify(_0x5a1fd6), _0x110b10);
        }
      } else {
        _0x219814 = this.setval(_0x4588a4, _0x370128);
      }
      return _0x219814;
    }
    getval(_0x564975) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x564975) : this.isQuanX() ? $prefs.valueForKey(_0x564975) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x564975]) : this.data && this.data[_0x564975] || null;
    }
    setval(_0x1cd2c6, _0x1de089) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x1cd2c6, _0x1de089) : this.isQuanX() ? $prefs.setValueForKey(_0x1cd2c6, _0x1de089) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x1de089] = _0x1cd2c6, this.writedata(), !0) : this.data && this.data[_0x1de089] || null;
    }
    initGotEnv(_0xef563) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0xef563 && (_0xef563.headers = _0xef563.headers ? _0xef563.headers : {}, void 0 === _0xef563.headers.Cookie && void 0 === _0xef563.cookieJar && (_0xef563.cookieJar = this.ckjar));
    }
    get(_0x4360bd, _0x38e382 = () => {}) {
      _0x4360bd.headers && (delete _0x4360bd.headers["Content-Type"], delete _0x4360bd.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x4360bd.headers = _0x4360bd.headers || {}, Object.assign(_0x4360bd.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x4360bd, (_0x4bc7f5, _0x1b92b3, _0x769c06) => {
        !_0x4bc7f5 && _0x1b92b3 && (_0x1b92b3.body = _0x769c06, _0x1b92b3.statusCode = _0x1b92b3.status);
        _0x38e382(_0x4bc7f5, _0x1b92b3, _0x769c06);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x4360bd.opts = _0x4360bd.opts || {}, Object.assign(_0x4360bd.opts, {
        hints: !1
      })), $task.fetch(_0x4360bd).then(_0x1caed5 => {
        const {
          statusCode: _0x31da90,
          statusCode: _0x26081b,
          headers: _0x54f12a,
          body: _0x3952dc
        } = _0x1caed5;
        _0x38e382(null, {
          status: _0x31da90,
          statusCode: _0x26081b,
          headers: _0x54f12a,
          body: _0x3952dc
        }, _0x3952dc);
      }, _0x3db93c => _0x38e382(_0x3db93c))) : this.isNode() && (this.initGotEnv(_0x4360bd), this.got(_0x4360bd).on("redirect", (_0xd34052, _0x29ca30) => {
        try {
          if (_0xd34052.headers["set-cookie"]) {
            const _0x466c9e = _0xd34052.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x466c9e && this.ckjar.setCookieSync(_0x466c9e, null);
            _0x29ca30.cookieJar = this.ckjar;
          }
        } catch (_0x176f5c) {
          this.logErr(_0x176f5c);
        }
      }).then(_0x2244b8 => {
        const {
          statusCode: _0xa7d97d,
          statusCode: _0x2cdaa4,
          headers: _0x5b7d3f,
          body: _0x852250
        } = _0x2244b8;
        _0x38e382(null, {
          status: _0xa7d97d,
          statusCode: _0x2cdaa4,
          headers: _0x5b7d3f,
          body: _0x852250
        }, _0x852250);
      }, _0x2682d9 => {
        const {
          message: _0x195cf2,
          response: _0x433122
        } = _0x2682d9;
        _0x38e382(_0x195cf2, _0x433122, _0x433122 && _0x433122.body);
      }));
    }
    post(_0x457356, _0x378c06 = () => {}) {
      if (_0x457356.body && _0x457356.headers && !_0x457356.headers["Content-Type"] && (_0x457356.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x457356.headers && delete _0x457356.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x457356.headers = _0x457356.headers || {}, Object.assign(_0x457356.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x457356, (_0x385e54, _0xe2ea4c, _0x244c14) => {
          !_0x385e54 && _0xe2ea4c && (_0xe2ea4c.body = _0x244c14, _0xe2ea4c.statusCode = _0xe2ea4c.status);
          _0x378c06(_0x385e54, _0xe2ea4c, _0x244c14);
        });
      } else {
        if (this.isQuanX()) {
          _0x457356.method = "POST";
          this.isNeedRewrite && (_0x457356.opts = _0x457356.opts || {}, Object.assign(_0x457356.opts, {
            hints: !1
          }));
          $task.fetch(_0x457356).then(_0x5d4719 => {
            const {
              statusCode: _0x1368ef,
              statusCode: _0x314cea,
              headers: _0x5a81bd,
              body: _0x327802
            } = _0x5d4719;
            _0x378c06(null, {
              status: _0x1368ef,
              statusCode: _0x314cea,
              headers: _0x5a81bd,
              body: _0x327802
            }, _0x327802);
          }, _0x447f2a => _0x378c06(_0x447f2a));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x457356);
            const {
              url: _0xd0c060,
              ..._0x59811d
            } = _0x457356;
            this.got.post(_0xd0c060, _0x59811d).then(_0x5a3257 => {
              const {
                statusCode: _0x59d020,
                statusCode: _0x46abce,
                headers: _0x1c1bea,
                body: _0x3dfdfe
              } = _0x5a3257;
              _0x378c06(null, {
                status: _0x59d020,
                statusCode: _0x46abce,
                headers: _0x1c1bea,
                body: _0x3dfdfe
              }, _0x3dfdfe);
            }, _0x32c3e8 => {
              const {
                message: _0x210b05,
                response: _0x2d47fa
              } = _0x32c3e8;
              _0x378c06(_0x210b05, _0x2d47fa, _0x2d47fa && _0x2d47fa.body);
            });
          }
        }
      }
    }
    time(_0x57677b, _0x3b541c = null) {
      const _0x6b0e70 = _0x3b541c ? new Date(_0x3b541c) : new Date();
      let _0x5954a7 = {
        "M+": _0x6b0e70.getMonth() + 1,
        "d+": _0x6b0e70.getDate(),
        "H+": _0x6b0e70.getHours(),
        "m+": _0x6b0e70.getMinutes(),
        "s+": _0x6b0e70.getSeconds(),
        "q+": Math.floor((_0x6b0e70.getMonth() + 3) / 3),
        S: _0x6b0e70.getMilliseconds()
      };
      /(y+)/.test(_0x57677b) && (_0x57677b = _0x57677b.replace(RegExp.$1, (_0x6b0e70.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x4dedf9 in _0x5954a7) new RegExp("(" + _0x4dedf9 + ")").test(_0x57677b) && (_0x57677b = _0x57677b.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5954a7[_0x4dedf9] : ("00" + _0x5954a7[_0x4dedf9]).substr(("" + _0x5954a7[_0x4dedf9]).length)));
      return _0x57677b;
    }
    msg(_0x12704d = _0x385cd6, _0x1f3dec = "", _0x2f5ed9 = "", _0x24c98a) {
      const _0x28709d = _0x30807f => {
        if (!_0x30807f) {
          return _0x30807f;
        }
        if ("string" == typeof _0x30807f) {
          return this.isLoon() ? _0x30807f : this.isQuanX() ? {
            "open-url": _0x30807f
          } : this.isSurge() ? {
            url: _0x30807f
          } : void 0;
        }
        if ("object" == typeof _0x30807f) {
          if (this.isLoon()) {
            let _0x38e371 = _0x30807f.openUrl || _0x30807f.url || _0x30807f["open-url"],
              _0x79d95f = _0x30807f.mediaUrl || _0x30807f["media-url"];
            return {
              openUrl: _0x38e371,
              mediaUrl: _0x79d95f
            };
          }
          if (this.isQuanX()) {
            let _0x356329 = _0x30807f["open-url"] || _0x30807f.url || _0x30807f.openUrl,
              _0x4d8ee8 = _0x30807f["media-url"] || _0x30807f.mediaUrl;
            return {
              "open-url": _0x356329,
              "media-url": _0x4d8ee8
            };
          }
          if (this.isSurge()) {
            let _0x50bc63 = _0x30807f.url || _0x30807f.openUrl || _0x30807f["open-url"];
            return {
              url: _0x50bc63
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x12704d, _0x1f3dec, _0x2f5ed9, _0x28709d(_0x24c98a)) : this.isQuanX() && $notify(_0x12704d, _0x1f3dec, _0x2f5ed9, _0x28709d(_0x24c98a))), !this.isMuteLog) {
        let _0x5e6a80 = ["", "==============📣系统通知📣=============="];
        _0x5e6a80.push(_0x12704d);
        _0x1f3dec && _0x5e6a80.push(_0x1f3dec);
        _0x2f5ed9 && _0x5e6a80.push(_0x2f5ed9);
        console.log(_0x5e6a80.join("\n"));
        this.logs = this.logs.concat(_0x5e6a80);
      }
    }
    log(..._0x47f3e6) {
      _0x47f3e6.length > 0 && (this.logs = [...this.logs, ..._0x47f3e6]);
      console.log(_0x47f3e6.join(this.logSeparator));
    }
    logErr(_0x40fab0, _0xc9eb2c) {
      const _0x2afa6a = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x2afa6a ? this.log("", "❗️" + this.name + ", 错误!", _0x40fab0.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x40fab0);
    }
    wait(_0x1465cb) {
      return new Promise(_0x5216bd => setTimeout(_0x5216bd, _0x1465cb));
    }
    done(_0x39be7a = {}) {
      const _0x4731bf = new Date().getTime(),
        _0xd28f6d = (_0x4731bf - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0xd28f6d + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x39be7a);
    }
  }(_0x385cd6, _0x44822c);
}
function checkVersion(_0x457012, _0x14ca34) {
  try {
    logAndNotify("文件md5：" + _0x14ca34);
    const _0x159079 = SyncRequest("GET", "https://checktoke.filegear-sg.me/api/update/check?fileName=" + _0x457012 + "&fileMd5=" + _0x14ca34),
      _0x3a7fa6 = JSON.parse(_0x159079.getBody("utf8"));
    if (_0x3a7fa6.code === 301) {
      process.exit(0);
    } else {
      logAndNotify(_0x3a7fa6.data);
    }
  } catch (_0x97717f) {
    logAndNotify("版本检查失败:", _0x97717f);
  }
}