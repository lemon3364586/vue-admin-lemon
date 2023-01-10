import router from './index';
import { startProgress, doneProgress } from '@/dependencies/nporgress';
import appSetting from '@/setting';
import { useUserStore } from '@/stores/modules/user';
import { resetAll } from '@/utils/storage';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

// 全局路由前置守卫
router.beforeEach(async (to, from) => {
  if (appSetting.showProgress) {
    startProgress();
    document.title = `跳转中…`;
  }
  if (to.path === '/login') {
    resetAll();
  } else {
    const { userRoles, getUserInfo, filterSyncRoutes } = useUserStore();
    if (userRoles.length < 1) await getUserInfo();
    await filterSyncRoutes();
    // 动态添加路由后，addroute需触发新导航才能生效，否则会跳往404
    // https://router.vuejs.org/zh/api/index.html#addroute-1
    // return { ...to, replace: true };
  }
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  if (appSetting.showProgress) doneProgress();
  document.title = `${appSetting.siteTitle} | ${to.meta?.title}` || appSetting.siteTitle;
});
