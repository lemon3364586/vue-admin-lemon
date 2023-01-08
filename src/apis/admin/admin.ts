import request from '@/dependencies/axios/index.js';
import type { UserLoginType } from './type';

export function logout(data?: any) {
  return request({
    url: '/index/logout',
    method: 'post',
    data
  });
}
export function getUserinfo(data?: any) {
  return request({
    url: '/index/getUserinfo',
    method: 'post',
    data
  });
}
export function login(data: UserLoginType) {
  return request({
    url: '/index/login',
    method: 'post',
    data
  });
}
