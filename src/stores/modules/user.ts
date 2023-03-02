import { getUserinfo } from '@/apis/user/login';
import { ElMessage } from 'element-plus';

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
    getAccessToken(state) {
      // return state.accessToken?.length > 0;
      return true;
    },
    userRoles: (state) => state.userInfo?.roles,
    isDeveloper(state) {
      return state.userInfo?.roles?.includes('developer');
    }
  },
  actions: {
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
