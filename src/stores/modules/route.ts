import router from '@/routers';
import { getUserRoutes } from '@/apis/user/login';
import { ElMessageBox } from 'element-plus';
import { omit, orderBy } from 'lodash';
import { isHyperlink } from '@/utils/validate';

// 匹配 views 里面所有的 .vue 文件，用于路由动态加载
const viewModules = import.meta.glob('@/views/**/*.vue');

export const useRouteStore = defineStore('routeStore', {
  state: () => ({
    defaultRoutes: [],
    sidebarRoutes: [],
    applyRoutes: []
  }),
  getters: {
    sidebarMenu(state) {
      const dashboard = { path: 'dashboard', meta: { title: '首页', icon: '' } };
      const sortMenuRes = sortMenu(state.sidebarRoutes);
      return [dashboard, ...sortMenuRes];
    }
  },
  actions: {
    // 获取用户路由
    async getUserRoutes() {
      const { code, data } = await getUserRoutes();
      if (code === 200) {
        this.defaultRoutes = data;
        this.sidebarRoutes = generateRoutes(data);
        const applyRoutes = generateRoutes(data, true);
        console.log('[ applyRoutes ]-31', applyRoutes);
        this.applyRoutes = applyRoutes;

        applyRoutes.forEach((routeItem) => {
          router.addRoute(routeItem);
          // router.addRoute('Home',routeItem);
        });

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
    }
  },
  persist: { storage: sessionStorage, paths: [] }
});

// 对菜单按指定顺序重新排序(后端返回的顺序不一定是对的)
function sortMenu(menus: Array<any>) {
  const tempMenuArr = [...menus];

  tempMenuArr.forEach((menuItem, menuIndex) => {
    const menuTemp = { ...menuItem };
    if (menuTemp.children?.length > 0) {
      tempMenuArr[menuIndex]['children'] = sortMenu(menuTemp.children);
    }
  });

  return orderBy(tempMenuArr, ['sort']);
}
// 将后端返回路由重新格式化成菜单/路由所需格式
function generateRoutes(routes: Array<any>, filterHyperLink = false) {
  const resArr = [];

  routes.forEach((routeItem) => {
    let routeTemp = { ...routeItem };

    // 存在子路由时递归调用本方法
    if (routeTemp.children?.length > 0) {
      routeTemp.children = generateRoutes(routeTemp.children, filterHyperLink);
    }

    // 当需要过滤超链接项时，超链接项不添加到路由数组中
    if (filterHyperLink && isHyperlink(routeTemp.path)) return false;

    // 重新构建对象，将部分数据放入路由元信息
    const { title, icon, component, breadcrumbView, tagsView } = routeTemp;
    routeTemp = {
      ...routeTemp,
      component: loadRouteView(component),
      meta: { title, icon, breadcrumbView, tagsView }
    };

    // 移除重构后不需要属性(虽然不移除也没有什么影响)
    const delKeyArr = ['id', 'title', 'icon', 'breadcrumbView', 'tagsView'];
    if (!routeTemp.component) delKeyArr.push('component');
    routeTemp = omit(routeTemp, delKeyArr);

    resArr.push(routeTemp);
  });

  return resArr;
}
// 以后端返回路由页面路径加载对应页面
function loadRouteView(componentPath: string) {
  if (componentPath?.length < 1) return false;
  let module = null;
  for (const viewPath in viewModules) {
    const dir = viewPath.split('views/')[1].split('.vue')[0];
    if (dir === componentPath) module = viewModules[viewPath];
    // if (dir === componentPath) module = viewModules[viewPath]();
  }
  return module;
}
