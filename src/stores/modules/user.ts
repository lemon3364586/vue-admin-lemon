import asyncRoutes from '@/routers/modules/asyncRoutes';
import errorRoutes from '@/routers/modules/errorRoutes';

import appSetting from '@/setting';
import { Aes } from '@/dependencies/crypto-js';
import { getUserinfo } from '@/apis/user/login';
import { ElMessage } from 'element-plus';
import { filterAsyncRoutes } from '@/utils/handleRoutes';
import constantRoutes from '@/routers/modules/constantRoutes';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as string | null, // 交互 token
    userInfo: {}, // 用户信息
    userRoles: [], // 用户角色
    userRoutes: [] // 根据用户角色权限过滤后的路由表
  }),
  getters: {
    getAccessToken(state) {
      return true;
      return state.accessToken && state.accessToken.length > 0;
    },
    hasRole(state) {
      return (role: string) => {
        return state.userRoles.includes(role);
      };
    },
    getUserRoutes(state) {
      return state.userRoutes;
    }
  },
  actions: {
    // 获取用户信息
    async getUserInfo() {
      if (this.userInfo && this.userRoles.length > 0) return;
      const { code, msg, payload } = await getUserinfo();
      if (code !== 200) ElMessage.error(msg || '获取用户信息失败');
      this.userInfo = payload;
      this.userRoles = Aes.decode(
        payload.permissions.roles,
        appSetting.aesKey,
        payload.permissions.iv
      );
    },
    // 过滤并设置用户路由
    async setUserRoutes() {
      if (this.userRoutes.length > 0) return this.userRoutes;
      const finallyAsyncRoutes = filterAsyncRoutes(asyncRoutes, this.userRoles);
      this.userRoutes = [...finallyAsyncRoutes, ...constantRoutes, ...errorRoutes];
      return finallyAsyncRoutes;
    }
  },
  persist: { storage: sessionStorage }
});
