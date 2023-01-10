/**
 * 组件级别的权限控制
 * 使用 v-permission['用户角色','可以有多个']
 */

import { useUserStore } from '@/stores/modules/user';

function checkPermission(el, binding) {
  const { userRoles, hasRole } = useUserStore();
  const { value } = binding;
  if (value && value instanceof Array) {
    if (value.length > 0) {
      if (hasRole('developer')) return; // 开发者默认拥有所有权限
      else {
        const hasPermission = userRoles.some((role) => value.includes(role));
        if (!hasPermission) {
          // 没有权限，删除元素
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['developer','admin']"`);
  }
}

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
