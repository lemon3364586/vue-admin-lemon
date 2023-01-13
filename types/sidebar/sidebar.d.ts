import { RolesType } from 'types/router/routes';

export interface SidebarType {
  /** 路由路径 */
  path: string;
  /** 菜单名称 */
  title: string;
  /** 菜单图标 */
  icon?: string;
  /** 用户角色，根据用户角色自动过滤，只暂时对应角色菜单 */
  roles?: RolesType[];
  /** 子菜单，支持无限嵌套，但建议不要超过3级 */
  children?: SidebarType[];
}
