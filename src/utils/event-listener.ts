// window 事件监听

// 监听页面刷新
export const beforeunload = {
  add(handleBeforeunload) {
    window.addEventListener('beforeunload', handleBeforeunload);
  },
  remove(handleBeforeunload) {
    window.removeEventListener('beforeunload', handleBeforeunload);
  }
};

// 监听页面宽度变化
export const resize = {
  add(handleResize) {
    window.addEventListener('resize', handleResize);
  },
  remove(handleResize) {
    window.removeEventListener('resize', handleResize);
  }
};
