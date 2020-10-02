<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                :class="{ checked: index == checkIndex }"
                @click="checkIndex = index"
                v-for="(item, index) in list"
                :key="index"
              >
                <h2>{{ item.receiverName }}</h2>
                <div class="phone">{{ item.receiverMobile }}</div>
                <div class="street">
                  {{
                    item.receiverProvince +
                      ' ' +
                      item.receiverCity +
                      ' ' +
                      item.receiverDistrict +
                      ' ' +
                      item.receiverAddress
                  }}
                </div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <span class="icon iconfont icon-ashbin"></span>
                  </a>
                  <a
                    href="javascript:;"
                    class="fr"
                    @click="editAddressModal(item)"
                  >
                    <span class="icon iconfont icon-edit"></span>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModal">
                <div class="iconfont icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item, index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="" />
                  <span>
                    {{ item.productName + ' ' + item.productSubtitle }}
                  </span>
                </div>
                <div class="good-price">
                  {{ item.productPrice }}元x{{ item.quantity }}
                </div>
                <div class="good-total">{{ item.productTotalPrice }}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{ count }}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalPrice }}元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalPrice }}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">
              去结算
            </a>
          </div>
        </div>
      </div>
    </div>
    <modal
      :title="title"
      btnType="1"
      :showModal="showModal"
      @cancel="showModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="姓名"
              v-model="checkedItem.receiverName"
            />
            <input
              type="text"
              class="input"
              placeholder="手机号"
              v-model="checkedItem.receiverMobile"
            />
          </div>
          <div class="item">
            <choose-city ref="ChooseCity"></choose-city>
          </div>
          <div class="item">
            <textarea
              name="street"
              v-model="checkedItem.receiverAddress"
              placeholder="详细地址"
            ></textarea>
          </div>
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="邮编"
              v-model="checkedItem.receiverZip"
            />
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from './../components/Modal';
import ChooseCity from './../components/ChooseCity/chooseCity';
import OrderHeader from './../components/OrderHeader';
export default {
  name: 'order-confirm',
  data() {
    return {
      title: '',
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      checkedItem: {}, //选中的对象
      userAction: '', //用户行为 0：新增 1：编辑 2：删除
      showDelModal: false, //是否显示删除弹框
      showModal: false, //是否显示新增或者编辑弹框
      checkIndex: 0, //当前收货地址选中索引
    };
  },

  components: {
    Modal,
    ChooseCity,
    OrderHeader,
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    getAddressList() {
      this.axios.get('/shippings').then((res) => {
        this.list = res.list;
      });
    },
    getCartList() {
      this.axios.get('/carts').then((res) => {
        let list = res.cartProductVoList; //获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice; //商品总金额
        this.cartList = list.filter((item) => item.productSelected); //获取被选中的商品列表
        //获取商品总数
        // this.cart=list.filter((item) => item.productSelected).length;
        this.cartList.map((item) => {
          this.count += item.quantity;
        });
      });
    },
    // 新增地址弹框
    openAddressModal() {
      this.userAction = 0;
      this.checkedItem = {};
      this.title = '新增收货地址';
      this.showModal = true;
    },
    // 编辑地址弹框
    editAddressModal(item) {
      this.userAction = 1;
      this.checkedItem = item;
      this.title = '编辑收货地址';
      this.showModal = true;
      this.$refs.ChooseCity.setdefault(
        item.receiverProvince,
        item.receiverCity,
        item.receiverDistrict
      );
    },
    //删除地址弹框
    delAddress(item) {
      this.checkedItem = item;
      this.userAction = 2;
      this.showDelModal = true;
    },
    // 关闭模态框
    closeModal() {
      this.checkedItem = {};
      this.userAction = '';
      this.showDelModal = false;
      this.showModal = false;
    },
    // 地址删除、编辑、新增功能
    submitAddress() {
      let checkedItem = this.checkedItem;
      let userAction = this.userAction;
      let method,
        url,
        params = {};
      if (userAction == 0) {
        (method = 'post'), (url = '/shippings');
      } else if (userAction == 1) {
        (method = 'put'), (url = `/shippings/${checkedItem.id}`);
      } else {
        (method = 'delete'), (url = `/shippings/${checkedItem.id}`);
      }
      if (userAction == 0 || userAction == 1) {
        let {
          receiverName = checkedItem.receiverName,
          receiverMobile = checkedItem.receiverMobile,

          receiverProvince = this.$refs.ChooseCity.prov,
          receiverCity = this.$refs.ChooseCity.city,
          receiverDistrict = this.$refs.ChooseCity.district,

          receiverAddress = checkedItem.receiverAddress,
          receiverZip = checkedItem.receiverZip,
        } = checkedItem;
        let errMsg = '';
        if (!receiverName) {
          errMsg = '请输入收货人名称';
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确格式的手机号';
        } else if (!receiverProvince) {
          errMsg = '请选择省份';
        } else if (!receiverCity) {
          errMsg = '请选择对应的城市';
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = '请输入收货地址';
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入六位邮编';
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return;
        }
          params = {
          receiverName: checkedItem.receiverName,
          receiverMobile: checkedItem.receiverMobile,

          receiverProvince: this.$refs.ChooseCity.prov,
          receiverCity: this.$refs.ChooseCity.city,
          receiverDistrict: this.$refs.ChooseCity.district,

          receiverAddress: checkedItem.receiverAddress,
          receiverZip: checkedItem.receiverZip
        };
      }

      this.axios[method](url, params).then(() => {
        this.closeModal();
        // 更新地址
        this.getAddressList();
        this.$message.success('操作成功');
      });
    },

    // 订单提交即订单创建
    orderSubmit() {
      let item = this.list[this.checkIndex];
      // 地址没选中或者地址不存在
      if (!item) {
        this.$message.error('请选择一个收货地址');
        return;
      }
      //调用提交订单接口
      this.axios
        .post('/orders', {
          shippingId: item.id,
        })
        .then((res) => {
          this.$store.dispatch('saveCartCount', 0);
          // 跳转到订单结算
          this.$router.push({
            path: '/order/pay',
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
  },
};
</script>
<style lang="scss">
@import '../assets/scss/base';
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                font-size: 30px;
                color: #666666;
                vertical-align: middle;
                &:hover {
                  color: $colorA;
                }
              }
            }
            &.checked {
              border: 1px solid $colorA;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url('/imgs/icon-add.png') #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: $colorA;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: $colorA;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: $colorA;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 26px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
}
.edit-wrap {
  font-size: 14px;
  .item {
    margin-bottom: 15px;
    .input {
      display: inline-block;
      width: 283px;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      border: 1px solid #e5e5e5;
      & + .input {
        margin-left: 14px;
      }
    }
    select {
      height: 40px;
      line-height: 40px;
      border: 1px solid #e5e5e5;
      margin-right: 15px;
    }
    textarea {
      height: 62px;
      width: 100%;
      padding: 13px 15px;
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
    }
  }
}
</style>
