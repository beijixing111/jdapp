// const setItem = (key, v, overtime = 30*24*60*60*1000) => {
//   const val = {
//     value: v,
//     overtime: Date.now() + overtime,
//   }
//   localStorage.setItem(key, JSON.stringify(val));
//   console.log(`已经设置缓存字段：${key},值为：${val.value}`);
// }

// localStorage
const setLocalItem = (key, v) => {
  localStorage.setItem(key, v);
  console.info(`已经设置了localStorage字段：${key},值为：${v}`);
}

const getLocalItem = (key) => {
  return localStorage.getItem(key);
}

const delLocalItem = (key) => {
  localStorage.removeItem(key);
}

//sessionStorage
const setSessionItem = (key, v) => {
  sessionStorage.setItem(key, v);
  // console.info(`已经设置了sessionStorage缓存字段：${key},值为：${v}`);
}

const getSessionItem = (key) => {
  return sessionStorage.getItem(key);
}

const delSessionItem = (key) => {
  sessionStorage.removeItem(key);
}

// cookie
const setCookie = (key, value, expiredays = 29) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${key}=${value};expires=${exdate.toUTCString()}`
  // document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

const getCookie = (key) => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) return decodeURIComponent(arr[2])
  return null
}

const delCookie = (key) => {
  const exdate = new Date()
  exdate.setTime(exdate.getTime() - 1)
  const value = getCookie(key)
  if (value) document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

// function checkWebp() {
//   try {
//     return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
//   } catch (err) {
//     return false;
//   }
// }

export default {
  setLocalItem,
  getLocalItem,
  delLocalItem,
  setSessionItem,
  getSessionItem,
  delSessionItem,
  setCookie,
  getCookie,
  delCookie
};