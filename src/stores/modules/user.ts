import appSetting from '@/setting';
import { Aes } from '@/dependencies/crypto-js';
import { getUserinfo } from '@/apis/user/login';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as string | null, // 数据交互 token
    userInfo: {}, // 用户信息
    userRoles: [] // 用户角色
  }),
  getters: {
    getAccessToken(state) {
      // return true;
      return state.accessToken && state.accessToken.length > 0;
    },
    isDeveloper(state) {
      return state.userRoles.includes('developer');
    }
  },
  actions: {
    // 判断是否有路由权限
    userHasPermission(toRoute: any) {
      if (toRoute.meta && toRoute.meta.roles) {
        const needRoles = toRoute.meta.roles;
        return this.userRoles.some((role) => needRoles.includes(role));
      } else return true;
    },
    // 获取用户信息
    async getUserInfo() {
      if (this.userInfo && this.userRoles.permissions) {
        // 存在已缓存用户信息，直接解密得到用户权限
        this.userRoles = Aes.decode(
          this.userInfo.permissions.roles,
          appSetting.aesKey,
          this.userInfo.permissions.iv
        );
      } else {
        // 不存在，从后端请求用户信息(包含用户权限)
        const { code, msg, data } = await getUserinfo();
        if (code !== 200) ElMessage.error(msg || '获取用户信息失败');
        this.userInfo = data;
        this.userRoles = Aes.decode(data.permissions.roles, appSetting.aesKey, data.permissions.iv);
      }
    }
  },
  persist: { storage: sessionStorage, paths: ['accessToken', 'userInfo'] }
});
