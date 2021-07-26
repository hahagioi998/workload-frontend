import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './views/admin/assets/css/icon.css';

// echart
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';

echarts.use(
    [GaugeChart, CanvasRenderer, GridComponent, BarChart]
);


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(echarts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
