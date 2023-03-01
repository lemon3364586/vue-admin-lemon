// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

import { startProgress, doneProgress } from '@/utils/nporgress';
import appSetting from '@/setting';
import { useUserStore } from '@/stores/modules/user';
import { resetAll } from '@/utils/storage';
import { ElMessageBox } from 'element-plus';

// 不需要登录，也不需要权限可以直接访问的路由
const allowRoutesList = ['/login', '/redirect', '/about', '/error/403', '/error/404'];
const routerInterceptor = (router) => {
  // 全局路由前置守卫
  router.beforeEach(async (to, from) => {
    if (appSetting.showProgress) {
      startProgress();
      document.title = `跳转中…`;
    }

    // 白名单中路由直接跳转
    if (allowRoutesList.includes(to.path)) return;

    const { userRoutes, getAccessToken, getUserRoutes } = useUserStore();
    if (!getAccessToken) {
      await ElMessageBox.alert('当前浏览器尚未登录账号，点击确认前往登录', '未登录', {
        confirmButtonText: '确认',
        type: 'error',
        autofocus: false,
        showClose: false,
        buttonSize: 'default'
      });
      return { path: '/login', query: { redirect: to.path } };
    }
    // pinia 里没有用户路由，去获取用户路由
    if (userRoutes.length < 1) {
      const canGetUserRoutes = await getUserRoutes();
      if (!canGetUserRoutes) return { path: '/login', query: { redirect: to.path } };
    }
  });

  // 全局路由后置守卫
  router.afterEach((to, from) => {
    if (appSetting.showProgress) doneProgress();
    document.title = `${appSetting.siteTitle} | ${to.meta?.title}` || appSetting.siteTitle;
  });
};

export default routerInterceptor;
