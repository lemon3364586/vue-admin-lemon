/**
 * @description axios实例化默认配置
 */

const { NODE_ENV, VITE_USEMOCK, VITE_PROXY_API } = import.meta.env;

let baseURL: string;
if (!VITE_USEMOCK) {
  // 无需mock数据时，开发阶段用 server.proxy 可实现跨域请求
  baseURL = NODE_ENV === 'development' ? VITE_PROXY_API : '';
}
// 创建请求实例时的默认配置
export const axiosDefaultConfig = {
  // 默认请求 url
  baseURL,
  // 超时时间
  timeout: 5000,
  header: {
    // 通常前后端都是通过 json 方式传递数据
    'Content-Type': 'application/json;charset=UTF-8'
    // 如果后端需要用 json string 序列化的方式传递数据
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
};
