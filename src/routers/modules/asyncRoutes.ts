import { RouteRawType } from '../routes.d';

import Layout from '@/layout/layout.vue';

const asyncRoutes: RouteRawType[] = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '首页', sort: 0, icon: 'House' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'test1',
    children: [
      {
        path: 'test1',
        component: () => import('@/views/platform/test/test1.vue'),
        meta: { title: '测试1', roles: ['developer'] }
      }
    ]
  }
];

export default asyncRoutes;
