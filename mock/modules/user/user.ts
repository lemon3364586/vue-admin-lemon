import type { MockMethod } from 'vite-plugin-mock';

import { success, fail } from '@/../mock/utils/response';
import menuList from '@/../mock/data/user/menuList';

export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      if (username !== 'admin' || password !== 123455) return fail('用户名或密码错误');
      return success('tokenTest');
    }
  },
  {
    url: '/user/logout',
    method: 'post',
    response: () => success()
  },
  {
    url: '/user/getUserinfo',
    method: 'get',
    response: ({ headers, body }) => {
      if (!headers['token']) return fail('请先登录');
      return {
        code: 200,
        msg: 'success',
        data: {
          // 按钮级权限标识，path:c:r:u:d
          // path 表示页面路由地址，路径开始不包含'/'
          // c:r:u:d 标识页面具体权限，多个以':'分隔
          permissions: ['authority:c:r:u:d'],
          // 用户角色
          roles: [],
          // 用户信息
          userinfo: {
            nickname: '🍋柠檬没有汁',
            avatar: ''
          }
        }
      };
    }
  },
  {
    url: '/user/getUserRoutes',
    method: 'get',
    response: ({ headers, body }) => {
      // if (!headers['token']) return fail('请先登录');
      return success(menuList);
    }
  }
] as MockMethod[];
