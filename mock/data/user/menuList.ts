import type { RouteRawType } from 'types/router/routes';

const asyncRoutes: Array<RouteRawType> = [
  {
    path: 'test',
    meta: { title: '测试(一)' },
    children: [
      {
        path: 'test1',
        meta: { title: '测试(二)' },
        children: [
          {
            path: 'test2',
            component: '',
            meta: { title: '测试' }
          }
        ]
      },
      {
        path: 'https://www.baidu.com',
        meta: { title: '百度' }
      }
    ]
  }
];

export default asyncRoutes;
