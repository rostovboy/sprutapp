<template>
  <div v-if="productsFromCart.length > 0">
    <ul class="order-list" v-for="product in productsFromCart" :key="product.productId">
      <li>
        <p class="longtitle">
          {{ product.meta.longtitle }}
          <span title="Заменить модуль"
             class="ml-1 edit-pen"
             @click.prevent="setActive(`categoryId-${product.meta.parent}`)"
             :class="{ active: isActive(`categoryId-${product.meta.parent}`) }">
            <font-awesome-icon :icon="['fas', 'pen']"/>
          </span>
        </p>
        <p class="pagetitle">{{ product.meta.pagetitle }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: {
    productsFromCart: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
    }),
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      this.activeItem = menuItem
    },
  }
}
</script>

<style lang="scss" scoped>
ul.order-list {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}
ul.order-list li {
  border-bottom: 1px solid #ccc;
  padding: .3rem 0;
}
.edit-pen {
  font-size: .8rem;
  color: $blue-color;
  cursor: pointer;
}
.longtitle {
  font-size: .8rem;
  font-family: $sprut-font-family;
  font-weight: 100;
  color: $violet-color;
  margin-bottom: 0;
}
.pagetitle {
  font-size: .8rem;
  font-family: $sprut-font-family;
  font-weight: 100;
  margin-bottom: 0;
}
</style>
