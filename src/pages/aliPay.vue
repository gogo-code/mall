<template>
<div class="ali-pay">
  <loading v-if="loading">
  </loading>
  <div class="form" v-html="content"></div>
</div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  data(){
    return {
      orderId:this.$route.query.orderId, //订单编号
      content:'', 
      loading:true
    }
  },
  components:{
    Loading,
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'Vue乐享商城',
        amount:0.01,
        payType:1 
      }).then(res=>{
        this.content=res.content;
        console.log(this.content)
        setTimeout(()=>{
          document.forms[0].submit();  //触发表单跳转
        },100)
      })
    }
  },

}
</script>

<style scoped>

</style>