/**
 * 浏览器数据缓存读取
 */
import Cookies from 'js-cookie';

const expires = 15; // cookie过期时间，单位'/天'
const TOKEN_KEY = 'lemon-token'; // token 保存键名
const USERINFO_KEY = 'lemon-userinfo'; // userinfo 保存键名

// 清空localStorage
export function clearLocal() {
  localStorage.clear();
}
// 清空sessionStorage
export function clearSession() {
  sessionStorage.clear();
}
// 清空cookie
export function clearCookie() {
  const cookieList = Cookies.get();
  for (const cookieKey in cookieList) {
    Cookies.remove(cookieKey);
  }
}

// 语言
export function getLang() {
  return localStorage.getItem('language');
}
export function setLang(lang: string) {
  return localStorage.setItem('language', lang);
}

// token
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  return sessionStorage.setItem(TOKEN_KEY, token);
}
export function removeToken() {
  return sessionStorage.removeItem(TOKEN_KEY);
}
// userinfo
export function getUserinfo() {
  const userinfo = sessionStorage.getItem(USERINFO_KEY);
  return JSON.parse(userinfo);
}
export function setUserinfo(userinfo: object) {
  return sessionStorage.setItem(USERINFO_KEY, JSON.stringify(userinfo));
}
export function removeUserinfo() {
  return sessionStorage.removeItem(USERINFO_KEY);
}
