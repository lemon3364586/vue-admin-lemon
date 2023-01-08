// api request 使用示例

import request from '@/dependencies/axios/axios';

export function get(params: object) {
  return request({
    url: '/example/example',
    method: 'get',
    params
  });
}
export function post(data: any) {
  return request({
    url: '/example/example',
    method: 'post',
    data
  });
}
