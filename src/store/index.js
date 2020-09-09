import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/action'
Vue.use(Vuex)
const state ={
  username:'',//登录用户名
  cartCount:0//购物车商品数量
}
export default new Vuex.Store({
  state,
  mutations,//相当于mutations:{}
  actions
})