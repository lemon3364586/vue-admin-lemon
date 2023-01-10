import type { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/index/login',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        payload: 'tokenTest'
      };
    }
  },
  {
    url: '/index/getUserinfo',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        msg: 'success',
        payload: {
          nickname: '🍋柠檬没有汁',
          avatar: '',
          permissions: {
            roles: 'U2FsdGVkX1/QgvLjHaSD0CrWShZidw8Pok6m5VsGSmU=',// 开发权限
            // roles:'U2FsdGVkX18cM7G8pXMHqnQY5+Ej6qO0OUahn6HtnsI=',// system
            // roles:'U2FsdGVkX1+XTzBhAvM6uW2WxBoEVyKFMou5BQgHHuQ=',// admin
            // roles:'U2FsdGVkX18sJzDlzl4DUyo4Io2HAJ9fusAAjHk1e7E=',// visitor
            iv: 'lemon3364586'
          }
        }
      };
    }
  }
] as MockMethod[];
