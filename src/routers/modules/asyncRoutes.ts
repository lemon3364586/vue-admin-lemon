import { RouteRawType } from '../routes.d';

import Layout from '@/layout/layout.vue';

const asyncRoutes: RouteRawType[] = [
  {
    path: '/test',
    component: Layout,
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
