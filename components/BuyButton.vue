<template>
  <div v-if="product">
    <button
      v-if="!isProductAdded"
      :class="$style.buy"
      @click.prevent="buyClickHandler"
    >
      Добавить в заказ
    </button>
    <a
      v-else
      :class="$style.added"
      href="#"
      title="Товар в корзине. Удалить?"
      @click.prevent="addedClickHandler"
    >
      <span class="added-btn">
        <font-awesome-icon :icon="['fas', 'check']"/>
      </span>
      <span class="remove-btn" style="display: none">
        <font-awesome-icon  :icon="['fas', 'trash-alt']"/>
      </span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
    isProductAdded () {
      return this.getProductsInCart.find(p => p.productId === this.product.id)
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct',
      addMetaProduct: 'cart/addMetaProduct',
      removeProduct: 'cart/removeProduct',
      removeMetaProduct: 'cart/removeMetaProduct',
    }),
    buyClickHandler () {
      this.addProduct(this.product.id)
      this.addMetaProduct(this.product)
    },
    addedClickHandler () {
      this.removeProduct(this.product.id)
      this.removeMetaProduct(this.product.id)
    }
  }
}
</script>

<style lang="scss" module>
.added {
  padding: .2rem .6rem;
  background: #02C9F8;
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  left: -107%;
  bottom: -3%;
  border-radius: 50%;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
}

.buy {
  padding: .5rem 2rem;
  background: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid #000;
  border-radius: 4rem;
  position: absolute;
  left: -107%;
  bottom: -3%;

  &:hover {
    background: #000;
    color: #fff;
    box-shadow: none;
  }
}
</style>
