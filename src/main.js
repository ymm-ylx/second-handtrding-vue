import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import  VueResource  from 'vue-resource'
import axios from 'axios'
import $conf from "./common/config/config"

axios.defaults.baseURL='http://127.0.0.1:8888'
Vue.prototype.$conf=$conf

Vue.prototype.axios = axios
Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// const instance =axios.create({
//     baseURL: 'http://localhost:8888',
//     timeout: 3600
// });

// export default instance;
