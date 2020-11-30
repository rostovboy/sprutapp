<template>
  <div v-if="productsFromCart.length > 0">
    <div class="table-responsive">
      <table class="table table-hover">
        <tbody>
        <tr v-for="product in productsFromCart" :key="product.productId">
          <td>
            {{ product.meta.pagetitle }}
            <span title="Заменить модуль"
                  class="ml-2 edit-pen"
                  @click="$bvModal.hide('Cart')"
                  @click.prevent="setActive(`categoryId-${product.meta.parent}`)"
                  :class="{ active: isActive(`categoryId-${product.meta.parent}`) }">
              <font-awesome-icon :icon="['fas', 'pen']"/>
            </span>
          </td>
          <td>{{ product.productId.price }}</td>
          <td>
            <input
              :value="product.qty"
              type="number"
              :min="1"
              :max="1000"
              @input.prevent="onQuantityChangeHandler($event, product)"
            />
          </td>
          <td>{{ (product.meta.price * product.qty) | round }}</td>
          <td>
            <a href="#" class="delete" title="Удалить?" @click.prevent="onRemoveClickHandler(product)">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import round from '../mixins/round'
import debounce from 'lodash.debounce'

export default {
  mixins: [round],
  props: {
    productsFromCart: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeItem: 'home',
    }
  },
  methods: {
    ...mapActions({
      setProductQuantity: 'cart/setProductQuantity',
      removeProduct: 'cart/removeProduct',
      removeMetaProduct: 'cart/removeMetaProduct',
    }),
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      this.activeItem = menuItem
    },
    onRemoveClickHandler(product) {
      this.removeProduct(product.productId)
      this.removeMetaProduct(product.productId)
    },
    onQuantityChangeHandler: debounce(function onQuantityChangeHandler(e, product) {
      const qty = e.target.value
      this.setProductQuantity({productId: product.productId, qty})
    }, 400)
  }
}
</script>

<style lang="scss" module>
td {
  font-size: 1.5rem;
  font-family: $sprut-font-family;
  font-weight: 400;
}
</style>
