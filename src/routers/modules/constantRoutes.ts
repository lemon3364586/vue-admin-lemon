import { RouteRawType } from '../routes.d';

const constantRoutes: RouteRawType[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', hidden: true, breadcrumb: false, tags: false }
  }
];

export default constantRoutes;
