<template>
  <div class="back-top" :class="{ isShow: isShow }" @click="goTop">
    <a href="javascript:;">
      <div class="icon"><img src="/imgs/totop.png" alt="" /></div>
      <span>回顶部</span>
    </a>
  </div>
</template>

<script>
import animate from "./animate";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight);
  },
  methods: {
    initHeight() {
      //解决浏览器的兼容问题
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isShow = scrollTop > 900 ? true : false;
    },
    goTop(){
      animate(window, 0);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.initHeight, false); //false通过冒泡的方式，从内向外销毁，true代表捕获
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/config.scss';
.back-top {
  display: none;

  &.isShow {
    display: inline-block;
    position: fixed;
    z-index: 10;
    top: 380px;
    right: 0;
    width: 82px;
    height: 90px;
    background-color: #fff;
    border: 1px solid #f5f5f5;
    text-align: center;
    a {
      display: inline-block;
      line-height: 21px;
      .icon {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 0 auto 8px;
        padding-top: 18px;
      }
      span {
        font-size: 14px;
        color: #757575;
      }
      
    }
  }
}
</style>
