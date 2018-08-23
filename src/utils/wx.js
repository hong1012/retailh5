/*eslint-disable*/
import jsSHA from './sha'
import wx from 'weixin-js-sdk'

function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

function createTimestamp() {
  return parseInt(new Date().getTime() / 1000) + '';
}

function wxSign(appid, ticket) {
  // let wx = window.wx;
  let url = window.location.href.split('#')[0] || {};
  let nonceStr = createNonceStr();
  let timestamp = createTimestamp();
  var signRet = {
    "jsapi_ticket": decodeURI(ticket) || '',
    "nonceStr": nonceStr,
    "timestamp": timestamp,
    "url": url
  };
  var string = raw(signRet);
  var shaObj = new jsSHA(string, 'TEXT');
  var signature = shaObj.getHash('SHA-1', 'HEX');
  wx.error(function (res) {
    //签名过期时需要重新签名
    console.error('签名出错:' + res.errMsg);
    if (res.code == 42001) {
      wxSign(appid, ticket);
    }
  });
  wx.config({
    debug: false,
    appId: appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
      'chooseWXPay',
      'getLocation'
    ]
  });
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      //设置默认分享页面
      resolve()
    });
    wx.error(function (res) {
      reject(res)
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  })
}
function wxPay(para, fnCb) {
  // let wx = window.wx;
  wx.chooseWXPay({
    timestamp: Number(para.timeStamp),
    nonceStr: para.nonceStr,
    package: para.package,
    signType: para.signType,
    paySign: para.paySign,
    success: function(res) {
      fnCb && fnCb();
    },
    fail: function(res) {
      alert(JSON.stringify(res))
    }
  });
}

function getLocation() {
/*  return new Promise((resolve, reject) => {
    resolve({
      'lat': 22.5341300000,
      'lng': 113.954790000
    });
  })*/
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        resolve({
          'lat': res.latitude,
          'lng': res.longitude
        });
      }
    });
  });
}

export {wxSign, wxPay, getLocation}
