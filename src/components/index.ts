/**
 * 全局注册组件
 * 在 vite.config.ts 中其实已经引入了一个插件 unplugin-vue-components/vite
 * 该插件可以实现自动注册指定目录下所有 .vue 文件为全局组件
 * 但多级目录时，其配置不够灵活，无法满足需求
 * 所以本项目使用方案为手动导入并注册需要的全局组件
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

const setupGlobalCmpts = (app: App) => {
  for (const modulekey in cmpModules) {
    app.component(modulekey, cmpModules[modulekey]);
  }
};

export default setupGlobalCmpts;
