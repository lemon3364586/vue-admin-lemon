/**
 * 浏览器数据缓存读取
 */
import Cookies from 'js-cookie';

/**
 * 清除当前网站下 localStorage,sessionStorage,cookie
 */
export function resetAll() {
  localStorage.clear();
  sessionStorage.clear();
  const cookieList = Cookies.get();
  for (const cookieKey in cookieList) {
    Cookies.remove(cookieKey);
  }
}
