<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt="" /></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span>
            <span class="sep-line">|</span>
            <span>账号注册</span>
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
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>
              忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="">简体</a>
        <span>|</span>
        <a href="">繁体</a>
        <span>|</span>
        <a href="">English</a>
        <span>|</span>
        <a href="">常见问题</a>
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
    height: 113px;
    img {
      width: auto;
      height: 100%;
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
        height: 510px;
        background-color: #fff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
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
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: $colorA;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
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
