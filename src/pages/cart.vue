<template>
<div>
  <order-header></order-header>
  
  <nav-footer></nav-footer>
</div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter'
export default {
  data(){
    return {

    }
  },
  components:{
    OrderHeader,
    NavFooter
  }

}
</script>

<style scoped>

</style>