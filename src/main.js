import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './route';
import VueResource from 'vue-resource';
import {store} from './Containers/Store/Store';
// import {} from 'vue'
Vue.use(VueRouter)
Vue.use(VueResource);
const router=new VueRouter({
  routes,
  mode:"history"
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


