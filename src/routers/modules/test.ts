// 测试页面

import { RouteRawType } from 'types/router/routes';

export default [
  {
    path: 'test1',
    component: () => import('@/views/platform/test/test1.vue'),
    meta: { title: '测试1', roles: ['developer'] }
  },
  {
    path: 'test2',
    component: () => import('@/views/platform/test/test2.vue'),
    meta: { title: '测试1', roles: ['developer'] }
  }
] as RouteRawType[];
