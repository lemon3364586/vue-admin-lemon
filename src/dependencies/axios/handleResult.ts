/**
 * 请求结果处理
 */

import { ElMessage } from 'element-plus';

/**
 * 请求成功处理
 */
export const networkSuccess = (response: any) => {
  if (response.config.responseType === 'blob') {
    // 如果是文件流，直接过
    return response;
  } else {
    return response.data;
  }
};

// 请求错误处理
export const networkError = (error: any) => {
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
};
