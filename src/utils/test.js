
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

console.log(getDistance(22.53332,113.93041, 22.539718, 113.961529))
console.log(getDistance(22.53332,113.93041, 31.661208, 118.514369))