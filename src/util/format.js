//格式化数字
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

//格式化日期
/**
 * @date  {[type]} date    [日期时间] || 时间戳 //1530770587096
 * @formatStr  {[Srting]}  [年月日中间格式]
 * @return {[String]}      [] 
 */
const formatTime = (date, formatStr) => {
  if ((typeof date !== "object") && (typeof date !== "number")) {
    console.log('"date"参数传入格式不正确，请检查！');
    return;
  }
  date = typeof date !== "object" ? (new Date(date.toString().length < 13 ? date * 1000 : date)) : date;
  formatStr = !!formatStr ? formatStr : '-';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join(formatStr) + " " +
    [hour, minute, second].map(formatNumber).join(':');
};

/**
 * 格式化数据精度
 * @param  {[number]} n [当前数字]
 * @param  {[number]} x [保留小数点后位数]
 * @return {[number or string]}   [默认保留两位小数]
 */
const fromatToFixed = (n, x) => {
  if (n === 0) return n;
  x = !!x ? x : 2;
  console.log(n);
  n = !!Number(n) ? Number(n) : false;
  if (!n) {
    console.log("参数n传入错误，请检查！");
    return;
  }
  var r = /^\d+$/;
  if (r.test(n)) {
    n = n + "." + Math.pow(10, x).toString().slice(1);
  } else {
    n = Math.round(n * Math.pow(10, x)) / Math.pow(10, x);
  }
  return n;
};

export default {
  formatNumber,
  formatTime,
  fromatToFixed
};