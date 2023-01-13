// 登录、注册相关页面

import type { RouteRawType } from 'types/router/routes';

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', breadcrumbView: false, tagsView: false }
  }
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/login/register.vue'),
  //   meta: { title: '登录', breadcrumbView: false, tagsView: false }
  // }
] as RouteRawType[];
