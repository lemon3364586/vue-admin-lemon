import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './router/permission';
import i18n from './i18n';
import pinia from './stores';

import setupDirectives from './directives';
import setupElementPlus from './dependencies/element-plus';

import './utils/load-styles';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

setupDirectives(app);
setupElementPlus(app);

app.mount('#app');
