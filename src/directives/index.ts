/**
 * 注册自定义指令：v-xxx
 * https://cn.vuejs.org/guide/reusability/custom-directives.html#introduction
 */

import type { App } from 'vue';

const directiveModules = import.meta.glob('./modules/*.ts', {
  import: 'default',
  eager: true
});

const setupDirectives = (app: App) => {
  for (const moduleKey in directiveModules) {
    const moduleDefault = directiveModules[moduleKey];
    app.directive(moduleDefault['name'], moduleDefault['handle']);
  }
};

export default setupDirectives;
