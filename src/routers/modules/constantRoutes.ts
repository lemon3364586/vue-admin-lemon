import { RouteRawType } from '../routes.d';

import Layout from '@/layout/layout.vue';

const constantRoutes: RouteRawType[] = [
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', hidden: true, breadcrumb: false, tags: false }
  }
];

export default constantRoutes;
