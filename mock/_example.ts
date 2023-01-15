import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {}
      };
    }
  },
  {
    url: '/api/post',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 0,
        data: {}
      };
    }
  }
] as MockMethod[];
