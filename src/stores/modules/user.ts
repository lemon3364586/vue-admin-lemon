import { getUserinfo, getUserRoutes } from '@/apis/user/login';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/routers';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as string | null, // 数据交互 token
    userInfo: {
      permissions: [], // 用户粒度权限
      roles: [], // 用户角色
      userinfo: {} // 用户信息
    },
    userRoutes: [] // 用户可访问路由
  }),
  getters: {
    userSidebarMenu(state) {
      const dashboard = { path: 'dashboard', meta: { title: '首页', icon: '' } };
      // 根据用户路由，生成用户菜单
      const userMenu = state.userRoutes.filter((route) => {
        const { hidden } = route;
        if (hidden) return false; // 过滤需要隐藏的菜单
        return true;
      });
      return { dashboard, ...userMenu };
    },
    getAccessToken(state) {
      return true;
      return state.accessToken && state.accessToken.length > 0;
    },
    isDeveloper(state) {
      return state.userInfo?.roles?.includes('developer');
    }
  },
  actions: {
    // 获取用户路由
    async getUserRoutes() {
      const { code, msg, data } = await getUserRoutes();
      if (code === 200) {
        const asyncRoutes = generateRoutes(data);
        console.log('[ asyncRoutes ]-40', asyncRoutes);
        // asyncRoutes.forEach((route) => {
        //   router.addRoute(route);
        // });
        // this.userRoutes = asyncRoutes;
        return true;
      } else {
        await ElMessageBox.alert('获取用户菜单失败，请检查账户是否正确，然后重新登录', '', {
          confirmButtonText: '确认',
          type: 'error',
          autofocus: false,
          showClose: false,
          buttonSize: 'default'
        });
        return false;
      }
    },
    // 获取用户信息
    async getUserInfo() {
      // 不存在缓存用户信息，从后端请求用户信息(包含用户权限)
      const { code, msg, data } = await getUserinfo();
      if (code === 200) this.userInfo = data;
      else ElMessage.error(msg || '获取用户信息失败');
    }
  },
  persist: { storage: sessionStorage, paths: ['accessToken', 'userInfo'] }
});

/** 生成路由表 */
function generateRoutes(routes: Array<any>, parentPath?: string) {
  console.log('[ routes ]-71', routes);
  // return routes.map((route) => {
  //   if (route?.children) generateRoutes(route.children);
  //   else {
  //     if (route.component) route.component = loadRouteView(route.component);
  //   }
  // });
  const resRoutes = [];

  routes.forEach((route) => {
    const temp = { ...route };
    if (temp.children?.length > 0) generateRoutes(temp.children, temp.path);
    else {
      // delete temp['children'];
      // if (route.component) route.component = loadRouteView(route.component);
      // if (temp.component)
      temp.component = '888';
      temp.fullPath = `/${parentPath}/${temp.path}`;
    }
    // resRoutes.push(temp);
    console.log('[ temp ]-91', temp);
  });

  // return resRoutes;
}
/** 加载路由文件 */
function loadRouteView(componentPath) {
  return import(`@/views/${componentPath}.vue`);
  // return import(`/src/views/${componentPath}.vue`);
}
