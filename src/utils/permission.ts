import { useUserStore } from '@/stores/modules/user';

export function checkPermission(el, binding) {
  const { userRoles, isDeveloper } = useUserStore();
  const { value } = binding;
  if (value && value instanceof Array) {
    if (value.length > 0) {
      if (isDeveloper) return; // 开发者默认拥有所有权限
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
