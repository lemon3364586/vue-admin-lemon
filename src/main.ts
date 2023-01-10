import { createApp } from 'vue';
import App from './App.vue';

import router from './routers'; // router
import './routers/guard'; // router 守卫
import pinia from './stores'; // pinia 状态管理库

import setupDirectives from './directives'; // 注册自定义事件
import setupElementPlus from './dependencies/element-plus'; // 注册 element-plus
import setupI18n from './i18n'; // 注册国际化

import './utils/load-styles'; // 全局样式

const app = createApp(App);

app.use(pinia);
app.use(router);

setupDirectives(app);
setupElementPlus(app);
setupI18n(app);

app.mount('#app');
