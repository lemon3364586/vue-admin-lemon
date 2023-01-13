import type { RouteRecordRaw } from 'vue-router';

/** 用户角色 */
export type RolesType = 'developer' | 'system' | 'admin' | 'manage' | 'visitor';

interface RouteMeta {
  /** 路由 title */
  title?: string;
  /** 可访问该路由的用户角色 */
  roles?: RolesType[];
  /** 是否显示在面包屑导航，默认 true */
  breadcrumbView?: boolean;
  /** 是否显示在 tags 导航栏，默认 true */
  tagsView?: boolean;
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteRawType extends Omit<RouteRecordRaw, 'meta'> {
  /** 路由地址 */
  path: string;
  /** 路由名称，相同名称路由，后覆盖前 */
  name?: string;
  /** 对应组件 */
  component?: Component | string;
  /** 重定向地址 */
  redirect?: string;
  /** 路由元信息 */
  meta?: RouteMeta;
  /** 子路由 */
  children?: RouteRawType[];
}
