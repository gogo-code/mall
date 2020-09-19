<template>
  <div class="login">
    <div class="container ">
      <div class="logo">
        <a href="/#/index">
          <img src="/imgs/mi-logo.png" alt="" />
        </a>
      </div>

      <div class="title">
        <h2>乐享商城</h2>
        <span>让每个人都能享受科技的乐趣</span>
      </div>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span :class="{ checked: islogin }" @click="islogin = true">
              账号登录
            </span>
            <span class="sep-line">|</span>
            <span :class="{ checked: !islogin }" @click="islogin = false">
              账号注册
            </span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login" v-if="islogin">
              登录
            </a>
            <a href="javascript:;" class="btn" @click="register" v-else>注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="javascript:;">简体</a>
        <span>|</span>
        <a href="javascript:;">繁体</a>
        <span>|</span>
        <a href="javascript:;">English</a>
        <span>|</span>
        <a href="javascript:;">常见问题</a>
      </div>
      <div class="copyright">
        Copyright ©2020
        <span class="domain">mi.gogo.com</span>
        All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      // 把用户id当为cookie传给服务端
      userId: '',
      islogin: true,
    };
  },
  methods: {
    login() {
      let { username, password } = this;
      this.axios
        .post('/user/login', {
          username,
          password,
        })
        .then((res) => {
          this.$cookie.set('userId', res.id, { expires: 'Session' });
          //this.$store.dispatch('saveUserName',res.username)
          this.saveUserName(res.username);
          this.$router.push({
            name: 'index',
            params: {
              from: 'login',
            },
          });
        });
    },

    ...mapActions(['saveUserName']),
    register() {
      let { username, password } = this;
      this.axios
        .post('/user/register', {
          username,
          password,
        })
        .then(() => {
          this.$message.success('注册成功');
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/base';
@import '../assets/scss/config';
.login {
  & > .container {
    display: flex;
    height: 105px;
    text-align: center;
    .logo {
      padding: 25px 0;
      a {
        display: inline-block;
        background-color: $colorA;

        img {
          width: 55px;
          height: 55px;
        }
      }
    }
    .title {
      padding: 26px 0;
      margin-left: 20px;
      h2 {
        font-size: 28px;
        letter-spacing: 10px;
        text-indent: 22px;
        color: #333;
      }
      span {
        margin-left: 17px;
        font-size: 14px;
        font-weight: 200;
        color: #999;
      }
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 410px;
        background-color: #fff;
        position: absolute;
        bottom: 70px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          span {
            cursor: pointer;
          }
          .checked {
            color: $colorA;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          display: inline-block;
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
          text-align: center;
          color: #fff;
          background-color: $colorA;
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
