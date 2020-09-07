import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

axios.defaults.baseURL='/api'
axios.defaults.timeout=8000;
//接口信息拦截
axios.interceptors.response.use(function(response) {
  let res = response.data
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    window.location.href = '/#/login'
  } else {
    alert(res.msg)
  }
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
