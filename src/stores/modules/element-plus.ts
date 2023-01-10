type size = 'large' | 'default' | 'small';

export const useElementPlusStore = defineStore('elementPlusStore', {
  state: () => ({
    size: 'small' as size, // 全局组件大小<large | default | small>
    zIndex: 3000, // 全局初始化 zIndex 的值
    button: {
      autoInsertSpace: true // 自动在且仅在两个中文字符之间插入空格
    },
    message: {
      max: 5 // 可同时显示的消息最大数量
    }
  }),
  persist: { storage: localStorage }
});
