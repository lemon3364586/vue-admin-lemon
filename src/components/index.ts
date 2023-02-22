/**
 * 全局注册组件
 * 在 vite.config.ts 中其实已经引入了一个插件 unplugin-vue-components/vite
 * 该插件其实已经可以实现自动注册指定目录下所有vue为全局组件
 * 但多级目录时，其配置无法满足需求，遂采取手动导入的方式实现
 */

import type { App } from 'vue';

const cmpModules = {
  CustomIcon: defineAsyncComponent(() => import('./CustomIcon/CustomIcon.vue')),
  UseCommonlyTable: defineAsyncComponent(
    () => import('./TableBox/UseCommonlyTable/UseCommonlyTable.vue')
  ),
  UseSelectionTable: defineAsyncComponent(
    () => import('./TableBox/UseSelectionTable/UseSelectionTable.vue')
  )
};

const setupGlobalCmp = (app: App) => {
  for (const modulekey in cmpModules) {
    app.component(modulekey, cmpModules[modulekey]);
  }
};

export default setupGlobalCmp;
