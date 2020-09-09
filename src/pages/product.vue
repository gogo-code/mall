<template>
<div class="product">
  <product-param>
    <template v-slot:buy>
      <button class="btn"> 
        立即购买
      </button>
    </template>
  </product-param>
</div>
</template>

<script>
import ProductParam from './../components/ProductParam'
export default {
 name:'product',
  data(){
    return {

    }
  },
  components:{
    ProductParam
  }

}
</script>

<style scoped lang="scss">
.product{
  button{
    margin-left:10px;
  }
}
</style>