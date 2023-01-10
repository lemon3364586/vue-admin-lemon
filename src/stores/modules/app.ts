export const useAppStore = defineStore('appStore', {
  state: () => ({
    language: 'zh', // 全局语言
    device: 'desktop', // 当前客户端标识，desktop:桌面端，mobile:移动端
    sidebarOpen: true // 侧边栏菜单是否展开
  }),
  getters: {},
  actions: {
    /**
     * 切换系统语言
     * @param lang 目标语言
     */
    toggleLanguage(lang: string) {
      this.language = lang;
      window.location.reload(); // 重新加载页面,i18n才能重新初始化
    }
  },
  persist: { storage: localStorage }
});
