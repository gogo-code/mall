<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>乐享商城</p>
    </div>
    <div class="footer-link">
      <a href="">主页</a>
      <span>|</span>
      <a href="">感谢支持</a>
      <span>|</span>
      <a href="">关于我们</a>
      <span>|</span>
      <a href="">支持我们</a>
    </div>
    <div class="copyright">
      Copyright ©2020
      <span class="domain">mi.gogo.com</span>
      All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.footer {
  height: 234px;
  border-top: 4px solid #f60;
  background-color: #333;
  color: #999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: #999;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #f60;
    }
  }
}
</style>
