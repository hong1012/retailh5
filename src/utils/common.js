/**
 * Created by hong on 2018/8/2.
 */
import Vue from 'vue'
const eventBus = new Vue()
const storeKey = 'jdy_retailh5_'
const win = window

// 获取url上的参数
const getUrlParam = () => {
  var param, url = location.href, theRequest = {};
  var index = url.indexOf('?')
  if (index !== -1) {
    var str = url.substr(index + 1);
    var strs = str.split('&');
    for (var i = 0, len = strs.length; i < len; i++) {
      param = strs[i].split('=');
      theRequest[param[0]] = decodeURIComponent(param[1]);
    }
  }
  return theRequest;
}

//day 是在当前日期上进行加减
function getDay(iday, dateStr) {
  var date = new Date();
  if (dateStr) {
    date = new Date(dateStr);
  }
  date.setDate(date.getDate() + iday);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}

function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
}

// 更新列表数据
function updateListData(oldlist, newList) {
  oldlist = oldlist || [];
  newList = newList || [];
  while (oldlist.length) {
    oldlist.pop();
  }
  for (let item of newList) {
    oldlist.push(item)
  }
}

// 获取本地缓存数据
function getStore(key, bSession) {
  key = storeKey + key;
  var storage = (bSession ? win.sessionStorage : win.localStorage);
  if (storage) {
    var keyv = storage.getItem(key);
    keyv = (keyv == null ? '' : keyv);
    try {
      return JSON.parse(keyv);
    } catch (e) {
      return keyv;
    }
  }
  return '';
}

// 设置本地缓存数据
function setStore(key, keyv, bSession) {
  key = storeKey + key;
  var storage = (bSession ? win.sessionStorage : win.localStorage);
  if (storage) {
    if (typeof keyv === 'object') {
      keyv = JSON.stringify(keyv);
    }
    storage.setItem(key, keyv);
  }
}

// 在keypress 中限制录入n位小数
function limitNumber(events, curNum, pointNum, maxlen) {
  pointNum = pointNum || 2;
  let key = events.key;
  let keyCode = events.keyCode;
  let moneyStr = curNum + '';
  let bpoint = moneyStr.indexOf('.') >= 0;
  // nvalue 新数值
  let nvalue = events.target.value + '';
  let nlen = nvalue.length;
  if (maxlen && nlen > maxlen) {
    events.returnValue = false;
    return;
  }
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 45) {
    // 限制录入字母
    events.returnValue = false;
  } else if (key === '.') {
    if (bpoint) {
      // 限制录入一个小数点
      events.returnValue = false;
    }
  } else {
    if (bpoint) {
      // 限制2位小数
      let ipoint = nvalue.indexOf('.');
      events.returnValue = !(nlen - ipoint > pointNum);
    }
  }
}

const EARTH_RADIUS = 6378137.0;
const PI = Math.PI;
function getRad(d) {
  return d * PI / 180.0;
}

// 计算经纬度之间的距离
function getDistance(lat1, lng1, lat2, lng2) {
  let f = getRad((lat1 + lat2) / 2);
  let g = getRad((lat1 - lat2) / 2);
  let l = getRad((lng1 - lng2) / 2);
  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);
  let s, c, w, r, d, h1, h2;
  let a = EARTH_RADIUS;
  let fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  let dis = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  return dis / 1000;
}

// 数组排序 按什么字段排序 以及升序 降序
function sortByField(field, orderRule) {
  let sort = orderRule === 'asc' ? 1 : -1;
  return function(a, b) {
    if (a[field] > b[field]) {
      return 1 * sort;
    } else if (a[field] < b[field]) {
      return -1 * sort;
    } else {
      return 0;
    }
  }
}

// 取n位小数位数, 小数位数 小于 point数的, 原值返回.
function numFix(value, point) {
  let num = value + '';
  let ipoint = num.indexOf('.');
  if (ipoint >= 0) {
    ipoint = num.length - ipoint - 1;
    if (ipoint < point) {
      return value;
    } else {
      return Number(Number(value).toFixed(point))
    }
  } else {
    return value;
  }
}

export {eventBus, getUrlParam, formatDate, getDay, updateListData}
export {getStore, setStore}
export {limitNumber, getDistance, sortByField, numFix}
