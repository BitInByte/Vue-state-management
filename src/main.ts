import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/config/themes/index.scss';

const tasksApp = createApp(App);

const requireComponent = require.context('./', true, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');
  tasksApp.component(baseComponentName, baseComponentConfig);
});

tasksApp.mount('#app');
