import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios' // 把axios挂载到vue实例
import App from './App.vue'
import router from './router'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
//接口信息拦截
axios.interceptors.response.use(function(response) {
  let res = response.data

  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    window.location.href = '/#/login'
    return Promise.reject(res)
  } else {
    alert(res.msg)
    return Promise.reject(res)
  }
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
