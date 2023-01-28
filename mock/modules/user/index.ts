import type { MockMethod } from 'vite-plugin-mock';

import { success, fail } from '@/../mock/utils/response';
import menuList from '@/../mock/data/user/menuList';

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
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          nickname: '🍋柠檬没有汁',
          avatar: ''
        }
      };
    }
  },
  {
    url: '/auth/getUserMenuList',
    method: 'get',
    response: () => success(menuList)
    // response: () => fail()
  },
  {
    url: '/auth/getUserRoles',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        data: [
          'developer', // 开发者
          // 'system', // 系统管理员
          // 'admin', // 管理员
          // 'manage', // 用户
          // 'visitor' // 游客
        ]
      };
    }
  }
] as MockMethod[];
