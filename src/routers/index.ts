/**
 * 本项目所有路由皆在前端定义，通过路由拦截器(路由守卫)对后端返回用户权限与路由所需权限对比，决定是否跳转
 *
 * 目前网上开源的路由大部分方案都是采取动态添加路由的方式，但是这样做的问题就在于前端每次添加一个新页面，
 * 都需要后端配合更新路由，降低了开发效率
 *
 * 同时，本项目的菜单也抛弃了网上较多开源方案采取的通过路由动态生成的方式，而是采取了直接从后端返回可用
 * 菜单(demo 中采取 mock 模拟)，避免了多级菜单时路由也需要多级嵌套的问题
 *
 * 综合两种方式，前端开发效率会稍微高一点，当然，仅一家之言，不具有参考价值
 */

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
    redirect: 'dashboard',
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
