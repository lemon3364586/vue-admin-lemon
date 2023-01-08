import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { RouteRawType } from '@/types/routes';
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
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        // el: '.container',
        top: 0,
        left: 0,
        behavior: 'smooth'
      };
    }
  }
});

export default router;
