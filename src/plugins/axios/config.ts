/**
 * @description axios实例化默认配置
 */

import appSetting from '@/setting';

const { useMock } = appSetting;
const { NODE_ENV, VITE_BASEURL, VITE_PROXY_API } = import.meta.env;

let baseURL: string;
// 无需mock数据时，开发阶段用 server.proxy 实现跨域请求
if (!useMock) baseURL = NODE_ENV === 'development' ? VITE_PROXY_API : VITE_BASEURL;

// 创建请求实例时的默认配置
export const axiosDefaultConfig = {
  // 实际请求 url = baseURl + url
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
