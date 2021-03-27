import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

Vue.use(VueRouter)
Vue.config.productionTip = false

const myRouter = new VueRouter({ 
  routes: Routes,
  mode: 'history'
  });

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
