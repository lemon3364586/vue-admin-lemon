import type { RolesType } from './routes';

export interface SidebarType {
  path: string;
  title: string;
  icon?: string;
  roles?: RolesType[];
  children?: SidebarType[];
}
