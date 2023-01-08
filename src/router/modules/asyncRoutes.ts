import { RouteRawType } from '@/types/routes';

const asyncRoutes: RouteRawType[] = [
  {
    path: 'test1',
    parentName: 'Home',
    component: () => import('@/views/test1.vue'),
    meta: { title: '测试1', roles: ['developer'] }
  },
  {
    path: 'test2',
    component: () => import('@/views/test2.vue'),
    meta: { title: '测试2' }
  },
  {
    path: 'test3',
    component: () => import('@/views/test3.vue'),
    meta: { title: '测试3', roles: ['developer'] }
  }
];

export default asyncRoutes;
