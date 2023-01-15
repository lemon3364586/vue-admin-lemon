import { axiosGet, axiosPost } from '@/dependencies/axios/index.js';
import type { UserLoginType } from './type';

export function logout(data?: any) {
  return axiosPost({
    url: '/index/logout',
    data
  });
}
export function getMenuList(data?: any) {
  return axiosGet({
    url: '/auth/getMenuList'
  });
}
export function getUserinfo(data?: any) {
  return axiosGet({
    url: '/index/getUserinfo',
    data
  });
}
export function login(data: UserLoginType) {
  return axiosPost({
    url: '/index/login',
    data
  });
}
