/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 提取通用业务逻辑，对 axios 进行简单的封装
 */

'use strict';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { axiosDefaultConfig, networkError } from '@/config/network.js';
import { getToken } from '@/utils/storage';

// 实例化 axios
const axionInstance: AxiosInstance = axios.create(axiosDefaultConfig);
// 请求拦截
axionInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 可在此处配置请求前拦截，如添加 token 等
     * config.headers.token = 'xxx'
     * 最后返回 axios config 即可
     * 如果 return 一个 false/Promise.reject()，则会取消本次请求
     */

    if (getToken()) config.headers['token'] = getToken();

    return config;
  },
  (error: AxiosError) => {
    // 请求异常，请求未到达后端即出错
    console.error('请求前拦截Error:', error); // for debug
    return Promise.reject(error);
  }
);
// 响应拦截
axionInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 状态码为 2xx 时，do something
    // console.log('response:', response); // for debug
    // return Promise.reject(response);
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response;
    } else {
      return response.data;
    }
  },
  (error: AxiosError) => {
    // 状态码不为 2xx 时，do something
    console.error('请求后拦截Error:', error); // for debug
    // 网络超时异常处理
    if (
      error.code === 'ECONNABORTED' ||
      error.message.includes('timeout') ||
      error.message === 'Network Error'
    ) {
      ElMessage.error('请求超时，请检查网络后重试');
    } else {
      ElMessage.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default axionInstance;
