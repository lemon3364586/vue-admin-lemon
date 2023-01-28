import { axiosGet, axiosPost } from '@/dependencies/axios/index.js';
import type { UserLoginType } from './type';

// 登出
export function logout(data?: any) {
  return axiosPost({
    url: '/index/logout',
    data
  });
}
// 获取用户角色权限
export function getUserRoles() {
  return axiosGet({ url: '/auth/getUserRoles' });
}
// 获取用户菜单
export function getUserMenuList() {
  return axiosGet({ url: '/auth/getUserMenuList' });
}
// 获取用户信息
export function getUserinfo() {
  return axiosGet({ url: '/index/getUserinfo' });
}
// 登入
export function login(data: UserLoginType) {
  return axiosPost({
    url: '/index/login',
    data
  });
}
