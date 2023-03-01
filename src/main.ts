import { createApp } from 'vue';
import App from './App.vue';

import router from './routers'; // router
import pinia from './stores'; // pinia 状态管理库

import setupGlobalCmpts from './components'; // 注册全局组件
import setupDirectives from './directives'; // 注册自定义事件
import setupI18n from './i18n'; // 注册国际化
import setupElementPlus from './plugins/element-plus'; // 注册 element-plus
import setupGlobalProvide from './plugins/provide'; // 注册全局 provide

import './plugins/load-styles'; // 全局样式

const app = createApp(App);

app.use(pinia);
app.use(router);

setupGlobalCmpts(app);
setupDirectives(app);
setupI18n(app);
setupElementPlus(app);
setupGlobalProvide(app);

app.mount('#app');
