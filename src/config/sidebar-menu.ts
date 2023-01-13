/**
 * 目前开源的后台管理绝大部分的菜单都是通过路由直接生成，
 * 但是这样有一个问题就是嵌套菜单的时候，路由也必须嵌套，
 * 从而需要不停地嵌套 <router-view/>，才能实现页面的正常显示
 * 在我个人看来，这种路由不停的嵌套的方法是不太合理的
 * 所以采取直接定义菜单，然后通过用户角色权限过滤菜单的方式实现
 * 这种方案虽然在配置路由后需要再手动配置菜单数据，但是个人觉得更合理一些
 * 方案仅供自己使用，不具有参考价值
 */

import { SidebarType } from 'types/sidebar/sidebar';

export default [
  {
    path: '/dashboard',
    title: '首页',
    icon: 'home'
  },
  {
    path: 'test',
    title: '测试',
    children: [
      {
        index: 'test1',
        title: '测试1',
        children: [
          { path: '/test/test2', title: '测试2', roles: ['admin'] }
        ]
      }
    ]
  }
] as SidebarType[];
