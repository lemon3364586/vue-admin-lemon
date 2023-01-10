/**
 * 注册自定义指令：v-xxx
 * https://cn.vuejs.org/guide/reusability/custom-directives.html#introduction
 */

import type { App } from 'vue';

const directiveModules = import.meta.glob('./modules/*.ts', {
  import: 'default',
  eager: true
});

const setupDirectives = (app: App<Element>) => {
  for (let module in directiveModules) {
    const moduleDefault = directiveModules[module];
    app.directive(moduleDefault['name'], moduleDefault['handle']);
  }
};

export default setupDirectives;
