import { getUserinfo, getUserRoles, getMenuList } from '@/apis/user/login';
import { ElMessage, ElMessageBox } from 'element-plus';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as string | null, // 数据交互 token
    userInfo: {}, // 用户信息
    userRoles: [] // 用户角色
  }),
  getters: {
    getAccessToken(state) {
      return true;
      return state.accessToken && state.accessToken.length > 0;
    },
    isDeveloper(state) {
      return state.userRoles.includes('developer');
    }
  },
  actions: {
    // 判断是否有路由权限
    userHasRoutePermission(toRoute: any) {
      // 开发者，拥有所有路由权限
      if (this.userRoles.includes('developer')) return true;
      // 非开发者，验证角色权限
      if (toRoute.meta && toRoute.meta.roles) {
        // 需要权限才能访问路由
        if (this.userRoles.length < 1) {
          console.error('非法操作，没有获取到用户权限');
          return false;
        }
        const needRoles = toRoute.meta.roles;
        return this.userRoles.some((role) => needRoles.includes(role));
      } else {
        // 不需要权限即可访问路由
        return true;
      }
    },
    // 获取用户角色权限
    async getUserRoles() {
      const { code, msg, data } = await getUserRoles();
      if (code === 200 && data && data.length > 0) {
        this.userRoles = data;
        return true;
      } else {
        await ElMessageBox.alert('获取用户角色失败，请检查账户是否正确，然后重新登录', '', {
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
