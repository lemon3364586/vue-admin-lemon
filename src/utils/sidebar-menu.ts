/**
 * 过滤菜单
 */

const hasPermission = (menu, userRoles) => {
  if (!menu.roles) return true;
  else return userRoles.some((role) => menu.roles.includes(role));
};

export const filterMenu = (menus, userRoles) => {
  // 开发者默认拥有所有菜单访问权限
  if (userRoles.includes('developer')) return menus;

  const finallyMenu = [];
  menus.forEach((menu) => {
    const menuItem = { ...menu };
    if (hasPermission(menuItem, userRoles)) {
      if (menuItem.children && menuItem.children.length > 0) {
        menuItem.children = filterMenu(menuItem.children, userRoles);
      }
      finallyMenu.push(menuItem);
    }
  });

  return finallyMenu;
};
