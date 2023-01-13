import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import routerInterceptor from './interceptor/interceptor';

import Layout from '@/layout/layout.vue';

import loginRoutes from './modules/login';
import errorRoutes from './modules/error';
import testRoutes from './modules/test';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '首页', roles: ['admin'] }
      },
      ...testRoutes
    ]
  },
  ...loginRoutes,
  ...errorRoutes
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHashHistory(),
  // routes: constantRoutes as RouteRecordRaw[],
  routes,
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  }
});

// 路由拦截器
routerInterceptor(router);

export default router;
