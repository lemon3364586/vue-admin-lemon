/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 提取通用业务逻辑，对 axios 进行简单的封装
 */

'use strict';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { axiosDefaultConfig } from './config.js';
import { networkSuccess, networkError } from './handleResult';

// 实例化 axios
const axiosInstance: AxiosInstance = axios.create(axiosDefaultConfig);

// 请求拦截
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 可在此处配置请求前拦截，如添加 token 等
     * config.headers.token = 'xxx'
     * 最后返回 axios config 即可
     * 如果 return 一个 false/Promise.reject()，则会取消本次请求
     */

    // if (getToken()) config.headers['token'] = getToken();// 携带token
    // config.params.ts = new Date();// 携带请求发起时间

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
    return networkSuccess(response);
  },
  (error: AxiosError) => {
    // 状态码不为 2xx 时，do something
    console.error('请求后拦截Error:', error); // for debug
    networkError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

interface options {
  baseURL?: string;
  timeout?: number;
  url?: string;
  method?: string;
  params?: object;
  data?: object;
}

// get 请求
export const axiosGet = (options: options) => {
  return axiosInstance({ ...options, method: 'get' });
};

// post 请求
export const axiosPost = (options: options) => {
  return axiosInstance({ ...options, method: 'post' });
};
