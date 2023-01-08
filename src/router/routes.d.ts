import type { RouteRecordRaw } from 'vue-router';

export type RolesType = 'developer' | 'system' | 'admin' | 'manage' | 'visitor';

interface RouteMeta {
  title?: string; // 路由 title
  icon?: string; // 显示在侧边栏时 icon
  roles?: RolesType[]; // 可访问用户角色
  hidden?: boolean; // 是否在侧边栏隐藏，默认 false
  breadcrumb?: boolean; // 是否显示在面包屑导航，默认 true
  tags?: boolean; // 是否显示在 tags 导航栏，默认 true
  sort?: number; // 侧边导航栏排列顺序，数值越大，排列越靠后
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteRawType extends Omit<RouteRecordRaw, 'meta'> {
  path: string; // 路由地址
  name?: string; // 路由名称
  // parentName?: string; // 父级路由
  component?: Component | string; // 对应组件
  redirect?: string; // 重定向地址
  meta?: RouteMeta; // 元信息
  children?: RouteRawType[]; // 子路由
}
