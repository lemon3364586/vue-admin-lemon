export const useExampleStore = defineStore('exampleStore', {
  state: () => ({}),
  getters: {},
  actions: {},
  // 持久化
  persist: { storage: sessionStorage, paths: [] }
});
