<template>
  <div class="product ">
    <product-param>
      <template v-slot:buy>
        <button class="btn" @click="buy">
          立即购买
        </button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{ product.name }}</h2>

        <h3>{{ product.subtitle }}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>{{ product.price }}</em>
          </span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt="" />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

import ProductParam from './../components/ProductParam'
export default {
  name: 'product',
  data() {
    return {
      product: {}, //商品信息
      swiperOption: {
        autoplay: true,
        slidesPerView: 3, //能同时选择的数量
        spaceBetween: 30, //slider的间距
        freeMode: true, //可以自由滑动，而不是只能滑动一格
        pagination: {
          //分页器配置
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ProductParam,
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res
      })
    },
    buy() {
      let id=this.$route.params.id;
      this.$router.push(`/detail/${id}`)
    }
  },
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base';
@import '../assets/scss/mixin';
.product {
  .content {
    .item-bg {
      background: url('/imgs/product/product-bg-1.png') no-repeat center;
      height: 718px;

      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: contain;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
  }
  button {
    margin-left: 10px;
  }
}
</style>
