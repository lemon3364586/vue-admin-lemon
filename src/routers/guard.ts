import router from './index';
import { startProgress, doneProgress } from '@/dependencies/nporgress';
import appSetting from '@/setting';
import { useUserStore } from '@/stores/modules/user';
import { resetAll } from '@/utils/storage';
import { ElMessageBox } from 'element-plus';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  if (appSetting.showProgress) {
    startProgress();
    document.title = `跳转中…`;
  }
  if (to.path === '/login') {
    resetAll();
    next();
  } else {
    const { getAccessToken, getUserInfo, setUserRoutes } = useUserStore();
    if (!getAccessToken) {
      ElMessageBox.alert('当前浏览器尚未登录账号，点击确认前往登录', '未登录', {
        confirmButtonText: '确认',
        type: 'error',
        autofocus: false,
        showClose: false,
        buttonSize: 'default'
      }).then(() => {
        next({ path: '/login', query: { redirect: to.path } });
      });
    } else {
      await getUserInfo();
      const accessRoutes = await setUserRoutes();
      accessRoutes.forEach((routeItem) => {
        // console.log('[ routeItem ]-34', routeItem);
        // router.addRoute(routeItem);
      });
      // 动态添加路由后，addroute需触发新导航才能生效，否则会跳往404
      // https://router.vuejs.org/zh/api/index.html#addroute-1
      next({ ...to, replace: true });
    }
    next();
  }
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  if (appSetting.showProgress) doneProgress();
  document.title = `${appSetting.siteTitle} | ${to.meta?.title}` || appSetting.siteTitle;
});