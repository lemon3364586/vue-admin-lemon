import { axiosGet, axiosPost } from '@/plugins/axios';
import type { UserLoginType } from './type';

// 登出
export function logout(data?: any) {
  return axiosPost({
    url: '/user/logout',
    data
  });
}
// 获取用户路由
export function getUserRoutes() {
  return axiosGet({ url: '/user/getUserRoutes' });
}
// 获取用户信息
export function getUserinfo() {
  return axiosGet({ url: '/user/getUserinfo' });
}
// 登入
export function login(data: UserLoginType) {
  return axiosPost({
    url: '/user/login',
    data
  });
}
