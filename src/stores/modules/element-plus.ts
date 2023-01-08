export default defineStore('elementPlusStore', {
  state: () => ({
    size: 'small', // 全局组件大小<large | default | small>
    zIndex: 3000, // 全局初始化 zIndex 的值
    button: {
      autoInsertSpace: true // 自动在两个中文字符之间插入空格
    },
    message: {
      max: 3 // 可同时显示的消息最大数量
    }
  })
});
