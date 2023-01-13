// 错误页面

import type { RouteRawType } from 'types/router/routes';

export default [
  {
    path: '403',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '403', breadcrumbView: false, tagsView: false }
  },
  {
    path: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404', breadcrumbView: false, tagsView: false }
  },
  {
    // 将所有未知路由重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { title: '404', breadcrumbView: false, tagsView: false }
  }
] as RouteRawType[];
