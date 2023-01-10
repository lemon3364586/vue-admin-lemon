import { RouteRawType } from '../routes.d';

const errorRoutes: RouteRawType[] = [
  {
    path: '/error',
    name: 'Error',
    children: [
      {
        path: '/403',
        component: () => import('@/views/error/403.vue'),
        meta: { title: '403', hidden: true, breadcrumb: false, tags: false }
      },
      {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        meta: { title: '404', hidden: true, breadcrumb: false, tags: false }
      },
      {
        // 将所有未知路由重定向到404
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: { title: '404', hidden: true, breadcrumb: false, tags: false }
      }
    ]
  }
];

export default errorRoutes;
