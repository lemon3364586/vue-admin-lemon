const asyncRoutes: Array<any> = [
  {
    id: '@id',
    path: '/test',
    title: '测试',
    icon: '',
    hidden: false,
    sort: 0,
    component: '',
    breadcrumbView: false,
    tagsView: false,
    children: [
      {
        id: '@id',
        path: 'test1',
        title: '测试1',
        icon: '',
        hidden: false,
        sort: 1,
        component: 'plat/test/test1',
        breadcrumbView: false,
        tagsView: false,
        children: [
          {
            id: '@id',
            path: 'https://www.google.com',
            title: '谷歌',
            icon: '',
            hidden: false,
            component: '',
            breadcrumbView: false,
            tagsView: false
          }
        ]
      },
      {
        id: '@id',
        path: 'test2',
        title: '测试2',
        icon: '',
        hidden: false,
        sort: 0,
        component: 'plat/test/test2',
        breadcrumbView: false,
        tagsView: false
      }
    ]
  },
  {
    id: '@id',
    path: '/hyperLink',
    title: '外链',
    sort: 1,
    children: [
      {
        id: '@id',
        path: 'https://www.baidu.com',
        title: '百度',
        icon: '',
        hidden: false,
        component: '',
        breadcrumbView: false,
        tagsView: false
      }
    ]
  }
];

export default asyncRoutes;
