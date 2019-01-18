//检测客户端是否是ios，是返回true, 否返回其他
const checkIsIOS = () => {
  var u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isiOS;
}

//检查数字，是返回ture,否则返回false
const checkNumber = number => {
  number = parseInt(number, 10);
  if ((number && !isNaN(number)) == 0 || number && !isNaN(number)) {
    return true;
  } else {
    return false;
  }
};

//检查日期date，正确返回true,否则返回false
const checkDate = date => {
  var reg = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
  return reg.test(date);
};

//检查手机号，正确返回true,否则返回false
const checkPhone = phone => {
  var reg = /^1\d{10}$/;
  return reg.test(phone);
};

//检查email，正确返回true,否则返回false
const checkEmail = email => {
  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return reg.test(email);
};

//检测身份证格式，正确返回true,否则返回false
const checkIdCard = idcard => {
  var reg = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
  return reg.test(idcard);
};

//检测url，是返回ture,否则返回false
const checkUrl = url => {
  var reg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
  return reg.test(url);
};

export default {
  checkIsIOS,
  checkNumber,
  checkDate,
  checkPhone,
  checkEmail,
  checkIdCard,
  checkUrl
};