/**
 * 判断用户是否拥有指定路由访问权限
 * @param route 需要判断的路由
 * @param roles 用户权限
 * @returns bool
 */
function hasPermission(route, roles) {
  if (route.meta && route.meta.permissions) {
    return roles.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}

/**
 * 根据传入权限，过滤路由
 * @param routes 需要过滤的路由
 * @param roles 用户权限
 * @returns
 */
export function filterAsyncRoutes(routes, roles) {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const routeItem = { ...route };
    if (hasPermission(roles, routeItem)) {
      if (routeItem.children) {
        // 递归判断子路由权限
        routeItem.children = filterAsyncRoutes(routeItem.children, roles);
      }
      finallyRoutes.push(routeItem);
    }
  });
  return finallyRoutes;
}
