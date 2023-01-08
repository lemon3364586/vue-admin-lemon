import { ElMessage } from 'element-plus';
import { login, getUserinfo } from '@/api/admin/admin';
import { Aes } from '@/dependencies/crypto-js';
import appSetting from '@/config/setting';
import { setToken, getUserinfo as storagegetUserinfo, setUserinfo } from '@/utils/storage';
import type { UserLoginType } from '@/api/admin/type';

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    userinfo: {}, // 用户信息
    roles: [], // 用户角色
    userSyncRoutes: [] // 根据用户角色权限过滤后的路由表(侧边菜单栏也是由此数据自动生成)
  }),
  getters: {
    isDeveloper() {
      return this.roles.includes('developer');
    }
  },
  actions: {}
});
