<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>
          {{ title }}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  props: {
    title: String,
  },
  computed: {
    ...mapState(['username']),
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base';
@import './../assets/scss/mixin';
@import './../assets/scss/base';
@import './../assets/scss/config';
.order-header{
  padding:30px 0;
  border-bottom:2px solid $colorA;
  .title,.username{
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    margin-left: 54px;
    h2 {
      font-size:28px;
      color:#333;
    }
    span{
      font-size:14px;
      margin-left: 17px;
      color: #999;
      font-weight: 200;
    }
  }
  .username{
    a{
      color:#666;
      font-size: 16px;
    }
  }
  
}
</style>
