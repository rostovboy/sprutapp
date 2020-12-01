<template>
  <div>
    <div v-if="getProductsInCart.length === 0"></div>
    <div v-else>
      <div class="minicart-title" v-if="!$device.isTablet">Состав заказа</div>
      <MiniProductsList class="products" :products-from-cart="getProductsInCart"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MiniProductsList from '../components/MiniProductsList.vue'

export default {
  components: {
    MiniProductsList
  },
  methods: {
    add(event) {
      this.btnDisabled = true; // mutate data and let vue disable the element
    },
  },
  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
  },
}
</script>

<style lang="scss" scoped>
.minicart-title {
  background-color: $violet-color;
  color: #fff;
  font-weight: 500;
  padding: .2rem;
  border-bottom-left-radius: .4rem;
  border-bottom-right-radius: .4rem;
  width: 100%;
  text-align: center;
  margin-bottom: .7rem;
}
</style>
