import router from './index';
import { startProgress, doneProgress } from '@/dependencies/nporgress';
import appSetting from '@/config/setting';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

// 全局路由前置守卫
router.beforeEach(async (to, from) => {
  if (appSetting.showProgress) {
    startProgress();
    document.title = `跳转中…`;
  }
  if (to.path === '/login') {
  } else {
  }
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  if (appSetting.showProgress) doneProgress();
  document.title = `${to.meta?.title || appSetting.siteTitle}`;
});
