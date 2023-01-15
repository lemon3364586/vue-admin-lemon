import type { MockMethod } from 'vite-plugin-mock';

import { success, fail } from 'mock/utils/response';
import userinfo from 'mock/data/user/userinfo';
import menuList from 'mock/data/user/menuList';

export default [
  {
    url: '/index/login',
    method: 'post',
    response: ({ body }) => {
      // const {username,password} = body;
      return success('tokenTest');
    }
  },
  {
    url: '/index/logout',
    method: 'post',
    response: () => success()
  },
  {
    url: '/index/getUserinfo',
    method: 'get',
    response: () => success(userinfo)
  },
  {
    url: '/auth/getMenuList',
    method: 'get',
    response: () => success(menuList)
  }
] as MockMethod[];
