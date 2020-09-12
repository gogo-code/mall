<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    // 未登录就不调用接口
    if (this.$cookie.get('userId')) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
        this.$store.dispatch('saveUserName', res.username);
      });
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('saveCartCount', res);
      });
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
