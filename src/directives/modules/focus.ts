export default {
  name: 'focus',
  handle: {
    mounted(el) {
      el.focus() || el.querySelector('input').focus();
    }
  }
};
