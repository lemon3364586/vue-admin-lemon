// 错误页面

import type { RouteRawType } from 'types/router/routes';

const errorRoutes: Array<RouteRawType> = [
  {
    path: '/error',
    hidden: true,
    redirect: '/error/404',
    meta: { title: '错误页', breadcrumbView: false, tagsView: false },
    children: [
      {
        path: '403',
        component: () => import('@/views/error/403.vue'),
        hidden: true,
        meta: { title: '403', breadcrumbView: false, tagsView: false }
      },
      {
        path: '404',
        hidden: true,
        component: () => import('@/views/error/404.vue'),
        meta: { title: '404', breadcrumbView: false, tagsView: false }
      }
    ]
  },
  {
    // 将所有未知路由重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
    hidden: true,
    meta: { title: '404', breadcrumbView: false, tagsView: false }
  }
];

export default errorRoutes;
