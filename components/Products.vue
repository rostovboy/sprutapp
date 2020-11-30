<template>
  <div>
    <b-row>
      <b-col col-12 :lg="6">
        <ul class="product-nav">
          <li v-for="product of products.results" :key="product.id" :title="product.pagetitle">
            <a class="product-nav-link"
               @click.prevent="setActive(`productId-${product.id}`)"
               :class="{ active: isActive(`productId-${product.id}`) }">
              {{ product.pagetitle }}
            </a>
          </li>
        </ul>
      </b-col>
      <b-col col-12 :lg="6">
        <div class="tab-content" id="productTabs">
          <div class="tab-pane fade product-container"
               v-for="product of products.results" :key="product.id"
               :class="{ 'active show': isActive(`productId-${product.id}` )}"
               :id="'productId' + product.id">
            <b-row class="align-items-center mb-3">
              <b-col :lg="5">
                <img v-if="product.thumb" :src="product.thumb" class="img-fluid" alt="">
                <img v-else src="~/assets/img/no-image.svg" class="img-fluid" alt="">
              </b-col>
              <b-col :lg="7">
                <div v-if="product.props" class="product-props" v-html="product.props"></div>
              </b-col>
            </b-row>
            <div v-if="product.feature" class="product-feature" v-html="product.feature"></div>
            <p v-if="product.longtitle" class="product-longtitle" v-html="product.longtitle"></p>
            <p class="product-pagetitle" v-html="product.pagetitle"></p>
            <b-row class="align-items-center mt-3" v-if="product.price != '0'">
              <b-col :lg="6">
                <div class="price">
                  {{ product.price | format_price }} <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                </div>
              </b-col>
              <b-col :lg="6">

              </b-col>
            </b-row>

            <BuyButton v-if="product.price != '0'" :product="product" />

          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BuyButton from "../components/BuyButton"
import round from "../mixins/round"
import format_price from "../mixins/format_price"
export default {
  components: {
    BuyButton
  },
  props: ['category'],
  mixins: [round, format_price],
  data() {
    return {
      activeItem: null,
      selected: null,
      products: []
    }
  },
  async fetch() {
    this.products = await this.$axios.$get(`https://sprut.fract.ru/api/products&parent=${this.category}`)
    this.activeItem = 'productId-' + this.products.results[0].id
  },
  fetchOnServer: false,
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  border: 3px solid $blue-color;
  padding: 1rem 2.2rem;
  position: relative;
  height: 420px;
}
.product-container::after {
  content: "";
  position: absolute;
  top: -3px;
  right: -5px;
  width: 35px;
  height: 100px;
  background-image: url('~assets/img/corner_right.svg') !important;
  background-repeat: no-repeat !important;
}
.product-container::before {
  content: "";
  position: absolute;
  bottom: -3px;
  left: -3px;
  width: 35px;
  height: 100px;
  background-image: url('~assets/img/corner_left.svg') !important;
  background-repeat: no-repeat !important;
}
.product-props {
  font-size: .9rem;
  font-family: $sprut-font-family;
  color: #000;
  font-weight: 100;
}
.product-feature {
  font-size: .8rem;
  font-family: $sprut-font-family;
  color: $violet-color;
  font-weight: 100;
  margin: 1rem 0;
}
.product-longtitle {
  font-weight: 400;
  font-size: 1.4rem;
  font-family: $sprut-font-family;
  color: $violet-color;
  margin-bottom: 0 !important;
}
.product-pagetitle {
  font-weight: 400;
  font-size: 1.2rem;
  font-family: $sprut-font-family;
  color: #000;
}
.price {
  font-weight: bold;
  font-size: 2.2rem;
  font-family: $sprut-font-family;
  color: $violet-color;
}
.price svg {
  font-size: 1.8rem;
  margin-bottom: 2px;
}
.product-nav {
  list-style: none;
  height: 280px;
  overflow: auto;
  padding: 0 0 0 .5rem;
}
.product-nav li {
  padding: .5rem 0;
}
.product-nav-link {
  color: #000;
  font-size: 1.5rem;
  padding: .6rem 0 0 2.5rem;
  font-family: $sprut-font-family;
  position: relative;
  cursor: pointer;
}
.product-nav-link:hover {
  text-decoration: none;
}
.product-nav-link.active::before {
  content: "";
  position: absolute;
  top: .8rem;
  left: -.2rem;
  height: 1.6rem;
  width: 1.65rem;
  background-color: $blue-color;
  border: 2px solid $blue-color;
  border-radius: 50%;
  display: inline-block; }

.product-nav-link::before {
  content: "";
  position: absolute;
  top: .8rem;
  left: -.2rem;
  height: 1.6rem;
  width: 1.65rem;
  border: 2px solid #000;
  border-radius: 50%;
  display: inline-block; }
</style>
