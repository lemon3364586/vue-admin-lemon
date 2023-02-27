import type { RouteRecordRaw } from 'vue-router';

interface RouteMeta {
  /** 路由 title(侧边栏菜单名称) */
  title: string;
  /** 在侧边栏显示图标名 */
  icon?: string;
  /** 是否显示在面包屑导航，默认 true */
  breadcrumbView?: boolean;
  /** 是否显示在 tags 导航栏，默认 true */
  tagsView?: boolean;
  /** 是否外链 */
  isHyperLink?: boolean;
  /** 额外参数，会在访问路由时以 query 形式附加到访问地址 */
  extra?: string;
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
  /** 是否在侧边栏隐藏 */
  hidden?: boolean;
  /** 重定向路由地址 */
  redirect?: string;
  /** 路由元信息 */
  meta: RouteMeta;
  /** 子路由 */
  children?: RouteRawType[];
}
