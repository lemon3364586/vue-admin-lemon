import type { RouteRecordRaw } from 'vue-router';

export type RolesType = 'developer' | 'system' | 'admin' | 'manage' | 'visitor';

interface RouteMeta {
  title?: string; // 路由title
  roles?: RolesType[]; // 可访问用户角色
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteRawType extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  name?: string;
  parentName?: string;
  component?: Component | string;
  redirect?: string;
  meta?: RouteMeta;
  children?: RouteRawType[];
}
