import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import "./assets/css/icon.css"
import "./assets/css/base.scss"

Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

