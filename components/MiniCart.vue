<template>
  <div>
    <div v-if="getProductsInCart.length === 0"></div>
    <div v-else>
      <div class="minicart-title" v-if="!$device.isTablet">Состав заказа</div>
      <div class="minicart-body">
        <MiniProductsList class="products" :products-from-cart="getProductsInCart"/>
      </div>
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
  background: linear-gradient(89.89deg, #7336E3 0.09%, #2C60B9 99.92%);
  color: #fff;
  font-weight: 700;
  padding: .45rem 0;
  border-bottom-left-radius: .4rem;
  border-bottom-right-radius: .4rem;
  width: 100%;
  text-align: center;
  margin-bottom: .7rem;
}
.minicart-body {
  padding: 0 .75rem;
}
</style>
