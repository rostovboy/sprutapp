<template>
  <div v-if="productsFromCart.length > 0">
    <div class="product-row-container">
      <div class="row align-items-center product-row" v-for="product in productsFromCart" :key="product.productId">
        <div class="col-8 col-sm-6">
          {{ product.meta.pagetitle }}
          <a href="#configurator"
             title="Заменить модуль"
             class="edit-pen"
             @click="goToConfigFromCart($event, `categoryId-${product.meta.parent}`)">
            <img src="~/assets/img/edit_pen.svg" alt="">
          </a>
        </div>
        <!--<div class="col-sm-2 text-center">
          {{ product.productId.price }}
        </div>-->
        <div class="col-sm-3 text-center d-none d-sm-block">
          <span class="minus-button" @click.prevent="onQuantityMinusHandler(product.qty, product)">-</span>
          <input
            :value="product.qty"
            type="number"
            :min="1"
            :max="1000"
            class="qty-input"
            @input.prevent="onQuantityChangeHandler($event, product)"
          />
          <span class="plus-button" @click.prevent="onQuantityPlusHandler(product.qty, product)">+</span>
        </div>
          <div v-if="$device.isMobile" class="col-4 col-sm-3">
            {{ (product.meta.price * product.qty) | round }} <span class="ruble"><font-awesome-icon :icon="['fas', 'ruble-sign']"/></span>
            <span class="delete" title="Удалить?" @click.prevent="onRemoveClickHandler(product)">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </span>
          </div>


          <div v-if="$device.isDesktopOrTablet" class="col-2 col-sm-2 text-right">
            {{ (product.meta.price * product.qty) | round }} <span class="ruble"><font-awesome-icon :icon="['fas', 'ruble-sign']"/></span>
          </div>
          <div v-if="$device.isDesktopOrTablet" class="col-1 col-sm-1">
            <span class="delete" title="Удалить?" @click.prevent="onRemoveClickHandler(product)">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </span>
          </div>

      </div>
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
      activeItem: 'home'
    }
  },
  methods: {
    ...mapActions({
      setProductQuantity: 'cart/setProductQuantity',
      removeProduct: 'cart/removeProduct',
      removeMetaProduct: 'cart/removeMetaProduct',
    }),
    goToConfigFromCart: function (event, category) {
      event.preventDefault()
      let link = '#configurator'
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'start'})
      $nuxt.$emit('setactive', category)
    },
    onRemoveClickHandler(product) {
      this.removeProduct(product.productId)
      this.removeMetaProduct(product.productId)
    },
    onQuantityChangeHandler: debounce(function onQuantityChangeHandler(e, product) {
      const qty = e.target.value
      this.setProductQuantity({productId: product.productId, qty})
    }, 400),
    onQuantityPlusHandler: debounce(function onQuantityPlusHandler(e, product) {
      let qty = e
      qty++
      this.setProductQuantity({productId: product.productId, qty})
    }, 400),
    onQuantityMinusHandler: debounce(function onQuantityMinusHandler(e, product) {
      let qty = e
      qty--
      if (qty === 0) {
        this.removeProduct(product.productId)
        this.removeMetaProduct(product.productId)
      } else {
        this.setProductQuantity({productId: product.productId, qty})
      }
    }, 400)
  }
}
</script>

<style lang="scss" scoped>
.product-row {
  font-family: $sprut-font-family;
  font-weight: 400;
  padding: 2rem 0 .2rem 0;
  vertical-align: top;
  border-top: none !important;
  border-bottom: 1px #000 solid !important;
}

.ruble {
  font-size: 1.4rem;
  vertical-align: text-top;
  margin-left: .2rem;
}
.delete {
  color: #AEAEAE;
  font-size: 1rem;
  cursor: pointer;
  float: right;
  margin-top: .45rem;
}
.edit-pen img {
  height: 1.2rem;
  vertical-align: baseline;
}
.plus-button, .minus-button {
  cursor: pointer;
}

input.qty-input {
  border: 1px solid #000;
  border-radius: 1.5rem;
  max-width: 30px;
  max-height: 30px;
  padding-left: .5rem;
  margin: 0 .1rem;
  background: #f7f7f7;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

@media (max-width: 576px) {
  .plus-button, .minus-button {
    font-size: 1rem;
  }
  .edit-pen img {
    height: 1rem;
    vertical-align: baseline;
    margin-left: .25rem;
  }
  .product-row {
    font-size: 1.3rem;
  }
  .ruble[data-v-9f491c06] {
    font-size: 1.1rem;
    margin-left: .1rem;
  }
  /*.product-row-container {
    padding: 0;
  }*/
}
@media (min-width: 768px) {
  .plus-button, .minus-button {
    font-size: 1.5rem;
  }
  .edit-pen img {
    height: 1rem;
    vertical-align: baseline;
    margin-left: .3rem;
  }
  .product-row {
    font-size: 1.3rem;
  }
  .product-row-container {
    padding: 0 1rem;
  }
}
@media (min-width: 1366px) {
  .plus-button, .minus-button {
    font-size: 2rem;
  }
  .edit-pen img {
    height: 1.2rem;
    vertical-align: baseline;
    margin-left: 1.25rem;
  }
  .product-row {
    font-size: 1.6rem;
  }
}

@media (min-width: 1600px) {
  .plus-button, .minus-button {
    font-size: 2.2rem;
  }
  input.qty-input {
    border-radius: 1.5rem;
    max-width: 35px;
    max-height: 35px;
    padding-left: .5rem;
    margin: 0 .4rem;
  }
}

@media (min-width: 1800px) {
  .plus-button, .minus-button {
    font-size: 2.5rem;
  }
  input.qty-input {
    border-radius: 1.5rem;
    max-width: 35px;
    max-height: 35px;
    padding-left: .5rem;
    margin: 0 .4rem;
  }
}
</style>
