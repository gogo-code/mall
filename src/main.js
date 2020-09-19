import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'; // 把axios挂载到vue实例
import VueLazyLoad from 'vue-lazyload';
import VueCookie from 'vue-cookie';
import store from './store';
import App from './App.vue';
import router from './router';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'


axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
//接口响应信息拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  // 登录成功返回数据
  if (res.status === 0) {
    return res.data;
  } 
  //未登录强制跳到登录页返回异常
  else if (res.status === 10) {
    // 允许用户不经过登录进入首页
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  } 
  // 其他状态码报错
  else {
    Message.error(res.msg);
    return Promise.reject(res);
  }
},
//接收信息报错
(error) => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg',
});

Vue.prototype.$message = Message;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
