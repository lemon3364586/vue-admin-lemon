// api request 使用示例

import request, { axiosGet, axiosPost } from '@/dependencies/axios';

export function test(params: object, data: any) {
  return request({
    url: '/example/example',
    method: 'get|post',
    params,
    data
  });
}
export function get(params: object) {
  return axiosGet({
    url: '/example/example',
    params
  });
}
export function post(data: any) {
  return axiosPost({
    url: '/example/example',
    data
  });
}
