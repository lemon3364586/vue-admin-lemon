/**
 * 应用层 Provide
 * 在应用级别提供的数据在该应用内的所有组件中都可以注入
 */

import type { App } from 'vue';

const awaitProvideData: object = {};

const setupGlobalProvide = (app: App) => {
  for (const provideKey in awaitProvideData) {
    app.provide(provideKey, awaitProvideData[provideKey]);
  }
};

export default setupGlobalProvide;
