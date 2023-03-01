/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 提取通用业务逻辑，对 axios 进行简单的封装
 */

'use strict';

import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { axiosDefaultConfig } from './config';
import { networkSuccess, networkError } from './handleResult';

// 实例化 axios
const axiosInstance: AxiosInstance = axios.create(axiosDefaultConfig);
// request 请求集合，用于取消请求等
const abortControllerMap = new Map();

// 请求拦截
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /**
     * 可在此处配置请求前拦截，如添加 token 等
     * config.headers.token = 'xxx'
     * 最后返回 axios config 即可
     * 如果 return 一个 false/Promise.reject()，则会取消本次请求
     */

    // if (getToken()) config.headers['token'] = getToken();// 携带token
    // config.params.ts = new Date();// 携带请求发起时间

    // 将请求存入 map 中，用于取消请求操作
    const controller = new AbortController();
    abortControllerMap.set(config.url, controller);

    return config;
  },
  (error: AxiosError) => {
    // 请求异常，请求未到达后端即出错
    console.error('请求前拦截Error:', error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 状态码为 2xx 时，do something
    // console.log('请求后拦截Response:', response); // for debug
    // return Promise.resolve(response);
    // return Promise.reject(response);

    // 从请求 map 中删除已完成请求
    const { url } = response.config;
    abortControllerMap.delete(url);

    return Promise.resolve(networkSuccess(response));
  },
  (error: AxiosError) => {
    // 状态码不为 2xx 时，do something
    console.error('请求后拦截Error:', error); // for debug
    networkError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
/** 取消全部请求 */
export function cancelAllRequest() {
  for (const [, controller] of this.abortControllerMap) {
    controller.abort();
  }
  abortControllerMap.clear();
}
/** 取消指定 url 的请求 */
export function cancelRequest(url: string | string[]) {
  const urlList = Array.isArray(url) ? url : [url];
  for (const _url of urlList) {
    abortControllerMap.get(_url)?.abort();
    abortControllerMap.delete(_url);
  }
}

interface optionsType {
  baseURL?: string;
  timeout?: number;
  url?: string;
  method?: string;
  params?: object;
  data?: object;
}
// get 请求
export function axiosGet(options: optionsType) {
  return axiosInstance({ ...options, method: 'get' });
}
// post 请求
export function axiosPost(options: optionsType) {
  return axiosInstance({ ...options, method: 'post' });
}
// delete 请求
export function axiosDelete(options: optionsType) {
  return axiosInstance({ ...options, method: 'delete' });
}
