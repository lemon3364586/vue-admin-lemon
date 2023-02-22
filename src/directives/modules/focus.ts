/**
 * 自动获取焦点
 * 使用: v-focus
 */

export default {
  name: 'focus',
  handle: {
    mounted(el) {
      el.focus() || el.querySelector('input').focus();
    }
  }
};
