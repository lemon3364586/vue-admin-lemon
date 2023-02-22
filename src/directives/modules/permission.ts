/**
 * 组件级别的权限控制
 * 使用: v-permission['用户角色','可以有多个']
 */

import { checkPermission } from "@/utils/permission";

export default {
  name: 'permission',
  handle: {
    mounted(el, binding) {
      checkPermission(el, binding);
    },
    updated(el, binding) {
      checkPermission(el, binding);
    }
  }
};
