// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

import { startProgress, doneProgress } from '@/dependencies/nporgress';
import appSetting from '@/setting';
import { useUserStore } from '@/stores/modules/user';
import { resetAll } from '@/utils/storage';
import { ElMessageBox } from 'element-plus';

// 不需要登录，也不需要权限可以直接访问的路由
const allowRoutesList = ['/login', '/register', '/about'];
const routerInterceptor = (router) => {
  // 全局路由前置守卫
  router.beforeEach(async (to, from) => {
    if (appSetting.showProgress) {
      startProgress();
      document.title = `跳转中…`;
    }

    if (allowRoutesList.includes(to.path)) {
      if (to.path === '/login') resetAll(); // 进入登录页面时，清空所有已缓存数据
      return;
    }

    const { getAccessToken, getUserRoles, userHasRoutePermission } = useUserStore();
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

    const canGetRoles = await getUserRoles(); // 从后端获取用户角色，避免恶意修改数据
    if (!canGetRoles) return { path: '/login', query: { redirect: to.path } };

    const hasPermission = userHasRoutePermission({ ...to });
    if (!hasPermission) return { path: '/403' };
  });

  // 全局路由后置守卫
  router.afterEach((to, from) => {
    if (appSetting.showProgress) doneProgress();
    document.title = `${appSetting.siteTitle} | ${to.meta?.title}` || appSetting.siteTitle;
  });
};

export default routerInterceptor;
