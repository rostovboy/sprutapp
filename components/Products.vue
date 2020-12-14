<template>
  <div>
    <b-row>
      <b-col col-12 :xl="6">
        <p class="choose">Выберите:</p>
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
      <b-col col-12 :xl="6" class="blue-container">
        <div class="tab-content" id="productTabs">
          <div class="tab-pane fade product-container"
               v-for="product of products.results" :key="product.id"
               :class="{ 'active show': isActive(`productId-${product.id}` )}"
               :id="'productId' + product.id">


            <div v-if="$device.isTablet">
              <b-row class="align-items-center">
                <b-col cols="6">
                  <b-row class="align-items-center mb-3">
                    <b-col :sm="6" :xl="5" class="text-center mb-3">
                      <img v-if="product.thumb" :src="product.thumb" class="img-fluid product-thumb" alt="">
                      <img v-else src="~/assets/img/no-image.svg" class="img-fluid product-thumb" alt="">
                    </b-col>
                    <b-col :sm="6" :xl="7">
                      <div v-if="product.props" class="product-props" v-html="product.props"></div>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="6">
                  <p v-if="product.longtitle" class="product-longtitle" v-html="product.longtitle"></p>
                  <p class="product-pagetitle" v-html="product.pagetitle"></p>
                  <b-row class="align-items-center mt-3" v-if="product.price != '0'">
                    <b-col cols="6" :xl="6">
                      <div class="price">
                        {{ product.price | format_price }} <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                      </div>
                    </b-col>
                    <b-col cols="6" :xl="6">
                      <!--<span class="plus-button" @click.prevent="">+</span>
                      <input
                        :value="1"
                        type="number"
                        :min="1"
                        :max="1000"
                        class="qty-input"
                        @input.prevent=""
                      />
                      <span class="minus-button" @click.prevent="">-</span>-->
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <div v-if="product.feature" class="product-feature" v-html="product.feature"></div>
            </div>


            <div v-if="!$device.isTablet">
              <b-row class="align-items-center mb-3">
                <b-col :sm="6" :xl="5" class="text-center mb-3">
                  <img v-if="product.thumb" :src="product.thumb" class="img-fluid product-thumb" alt="">
                  <img v-else src="~/assets/img/no-image.svg" class="img-fluid product-thumb" alt="">
                </b-col>
                <b-col :sm="6" :xl="7">
                  <div v-if="product.props" class="product-props" v-html="product.props"></div>
                </b-col>
              </b-row>

              <div v-if="product.feature" class="product-feature" v-html="product.feature"></div>
              <p v-if="product.longtitle" class="product-longtitle" v-html="product.longtitle"></p>
              <p class="product-pagetitle" v-html="product.pagetitle"></p>
              <b-row class="align-items-center mt-3" v-if="product.price != '0'">
                <b-col cols="6" :lg="6">
                  <div class="price">
                    {{ product.price | format_price }} <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                  </div>
                </b-col>
                <b-col cols="6" :lg="6">
                  <span class="plus-button" @click.prevent="onQuantityPlusHandler()">+</span>
                  <input
                    :value="qty"
                    type="number"
                    :min="1"
                    :max="1000"
                    class="qty-input"
                  />
                  <span class="minus-button" @click.prevent="onQuantityMinusHandler()">-</span>
                </b-col>
              </b-row>
            </div>

            <BuyButton v-if="product.price != '0'" :product="product" :qty="qty" />

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
import debounce from "lodash.debounce";
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
      products: [],
      qty: 1
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
    },
    onQuantityPlusHandler () {
      this.qty++
      console.log(this.qty)
    },
    onQuantityMinusHandler () {
      if (this.qty === 1) {
        //alert("Маловато будет");
      } else {
        this.qty--;
      }
      console.log(this.qty)
    },
  }
}
</script>

<style lang="scss" scoped>

.plus-button {
  font-size: 2rem;
  cursor: pointer;
  vertical-align: sub;
}

.minus-button {
  font-size: 2rem;
  cursor: pointer;
  vertical-align: sub;
}

input.qty-input {
  border-radius: 1.5rem;
  padding-left: 1rem;
  max-width: 50px;
  border: 1px solid #000;
}

.choose {
  margin-top: .5rem;
  margin-bottom: 2rem;
  color: #000;
  font-family: $sprut-font-family;
  font-weight: 400;
  font-size: 1.7rem;
}
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
  font-family: $sprut-font-family;
  color: $violet-color;
}
.price svg {
  margin-bottom: 2px;
}
.product-nav {
  list-style: none;
  max-height: 260px;
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
  display: inline-block;
}

.product-nav-link::before {
  content: "";
  position: absolute;
  top: .8rem;
  left: -.2rem;
  height: 1.6rem;
  width: 1.65rem;
  border: 2px solid #000;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 576px) {
  .product-thumb {
    max-height: 200px;
  }
  .product-container {
    height: auto;
  }
  .product-nav-link {
    font-size: 1.1rem;
  }
  .price {
    font-size: 1.9rem;
  }
  .price svg {
    font-size: 1.5rem;
  }
  .product-props {
    font-size: .8rem;
  }
}

@media (min-width: 768px) {
  .product-container {
    height: auto;
  }
  .product-nav-link {
    font-size: 1.2rem;
  }
  .price {
    font-size: 1.9rem;
  }
  .price svg {
    font-size: 1.5rem;
  }
  .blue-container {
    padding-right: 15px;
    padding-left: 15px;
  }
  .product-props {
    font-size: .8rem;
  }
}

@media (min-width: 1366px) {
  .product-container {
    height: 420px;
  }
  .product-nav-link {
    font-size: 1.2rem;
  }
  .product-props {
    font-size: .9rem;
  }
}

@media (min-width: 1600px) {
  .product-nav-link {
    font-size: 1.3rem;
  }
  .price {
    font-size: 2.2rem;
  }
  .price svg {
    font-size: 1.7rem;
    margin-bottom: 2px;
  }
}

@media (min-width: 1800px) {
  .product-nav-link {
    font-size: 1.5rem;
  }
  #productTabs.tab-content {
    padding-left: 2.5rem;
  }
}
</style>
