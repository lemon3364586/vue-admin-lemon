import router from '@/routers';
import asyncRoutes from '@/routers/modules/asyncRoutes';
import errorRoutes from '@/routers/modules/errorRoutes';

import appSetting from '@/setting';
import { Aes } from '@/dependencies/crypto-js';
import { getUserinfo } from '@/apis/user/login';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as string, // 交互 token
    userInfo: {}, // 用户信息
    userRoles: [], // 用户角色
    userRoutes: [] // 根据用户角色权限过滤后的路由表
  }),
  getters: {
    hasRole(state) {
      return (role: string) => {
        return state.userRoles.includes(role);
      };
    }
  },
  actions: {
    async getUserInfo() {
      const { code, msg, payload } = await getUserinfo();
      if (code !== 200) ElMessage.error(msg || '获取用户信息失败');
      this.userInfo = payload;
      this.userRoles = Aes.decode(
        payload.permissions.roles,
        appSetting.aesKey,
        payload.permissions.iv
      );
    },
    filterSyncRoutes() {
      console.log('过滤路由');
      return new Promise<void>((resolve, reject) => {
        if (this.userRoutes.length > 0) resolve();
        let tempRoutes: Array<any>;
        if (this.hasRole('developer')) {
          // 开发者权限默认拥有所有路由权限
          tempRoutes = [...asyncRoutes, ...errorRoutes];
        } else {
          // 根据权限过滤动态路由表
        }
        // 遍历添加路由到路由表
        tempRoutes.forEach((route) => {
          router.addRoute(route);
        });
        this.userRoutes = tempRoutes;
        resolve();
      });
    }
  },
  persist: { storage: sessionStorage }
});
