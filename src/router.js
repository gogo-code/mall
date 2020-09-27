import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/home.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index', // 重定向到index 多个页面会用到home的nav组件 多个页面会显示在home的router-view中 所以放在home的children中
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('./pages/index.vue'),
        },
        {
          path: 'product/:id', // 动态路由
          name: 'product',
          component: () => import('./pages/product.vue'),
        },
        {
          path: 'detail/:id', // 动态路由
          name: 'detail',
          component: () => import('./pages/detail.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order.vue'),
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue'),
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue'),
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue'),
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/aliPay.vue'),
        },
      ],
    },
  ],
});
