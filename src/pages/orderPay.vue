<template>
  <div class="order-pay">
    <div class="container">
      <div class="order-wrap">
        <div class="item-order">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功，可以付款啦~</h2>
              <p>
                请在
                <span>30分</span>
                内完成支付，超时后将取消订单
              </p>
              <p>收货信息: {{ addressInfo }}</p>
            </div>
          </div>
          <div class="order-total">
            <p>
              应付总额:
              <span>{{ payment }}</span>
              元
            </p>
            <p>
              订单详情
              <em class="icon-down"></em>
            </p>
          </div>
        </div>
      </div>
      <div class="item-pay">
        <h3>选择以下支付方式付款</h3>
        <div class="pay-way">
          <p>支付平台</p>
          <div
            class="pay pay-ali"
            :class="{ checked: payType == 1 }"
            @click="paySubmit(1)"
          ></div>
          <div
            class="pay pay-wechat"
            :class="{ checked: payType == 2 }"
            @click="paySubmit(2)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
export default {
  data() {
    return {
      orderId: this.$route.query.orderNo, //订单编号
      addressInfo: '', //收货人地址
      orederDetail: [], //订单详情，包含商品列表
      showDetail: false, //是否显示订单详情
      payType: '', //支付类型
      showPay: false, //是否显示微信支付弹框
      payImg: '', //微信支付的二维码地址
      showPayModal: false, //是否显示二次支付确定弹框
      payment: 0, //订单总金额
      T: '', //定时器
    };
  },
  components: {},
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        let item = res.shippingVo;
        console.log(item);
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orederDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    paySubmit(payType) {
      if (payType === 1) {
        window.open('/#/order/alipay?orderId=' + this.orderId, '_blank');
      } else {
        this.axios
          .post('/pay', {
            orderId: this.orderId,
            orderName: 'Vue乐享商城',
            amount: 0.01,
            payType: 2,
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.showPay = true;
                this.payImg = url;
                this.loopOrderState();
              })
              .catch(() => {
                this.$message.error('微信二维码生成失败，请稍后重试');
              });
          });
      }
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status === 20) {
            clearInterval(this.T);
            this.goOrderList();
          }
        });
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/base';

.order-pay {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 61px;
  .order-wrap {
    padding: 62px 50px;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 30px;
    .item-order {
      display: flex;
      align-items: center;
      .icon-succ {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
        background-size: 60px;
        margin-right: 40px;
      }
      .order-info {
        margin-right: 248px;
        h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }
        p {
          color: #666;
          span {
            color: $colorA;
          }
        }
      }
      .order-total {
        & > p:first-child {
          margin-bottom: 30px;
        }
        span {
          font-size: 28px;
          color: $colorA;
        }
        .icon-down {
          display: inline-block;
          width: 14px;
          height: 10px;
          background: url('/imgs/icon-down.png') no-repeat center;
          background-size: contain;
          margin-left: 9px;
          transition: all 0.5s;
          cursor: pointer;
        }
      }
    }
  }
  .item-pay {
    padding: 26px 50px 72px;
    background-color: #fff;
    h3 {
      font-size: 20px;
      font-weight: 200;
      color: #333;
      padding-bottom: 24px;
      border-bottom: 1px solid #d7d7d7;
      margin-bottom: 26px;
    }
    p {
      font-size: 18px;
    }
    .pay-way {
      .pay {
        display: inline-block;
        width: 188px;
        height: 64px;
        border: 1px solid #d7d7d7;
        cursor: pointer;
        margin-top: 19px;
      }
      .pay-ali {
        background: url('/imgs/pay/icon-ali.png') no-repeat center;
        background-size: 103px 38px;
      }
      .pay-wechat {
        background: url('/imgs/pay/icon-wechat.png') no-repeat center;
        background-size: 103px 38px;
        margin-left: 20px;
      }
    }
  }
}
</style>
