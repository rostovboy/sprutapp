<template>
  <section id="cart">
    <client-only>
      <div class="container">
        <div v-if="getProductsInCart.length === 0" class="container">
          <p class="text-center mb-4"><img class="img-fluid" src="~/assets/img/empty_bag.png" alt=""></p>
          <p class="empty-text">
            В конфигурации еще нет ни одного модуля!<br>
            <a href="#configurator" @click="goToConfigFromCart($event, 'categoryId-3')">
              Начни с контроллера
              <font-awesome-icon :icon="['fas', 'arrow-right']"/>
            </a>
          </p>
        </div>
        <div v-else>

          <div class="title-block mb-4">
            <div class="title">
              Состав заказа
            </div>
          </div>

          <ProductsList class="products" :products-from-cart="getProductsInCart"/>

          <div class="total-container">
            <div class="total mt-5 mb-4">
              <!--<b-row>
                <b-col class="text-left itogo">Итого</b-col>
                <b-col class="text-right total-amount">{{ getAmount | round | format_price }}
                  <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                </b-col>
              </b-row>-->


              <div class="row align-items-center">
                <div class="col-7 col-sm-7 itogo">
                  Итого
                </div>
                <div class="col-sm-1 text-center d-none d-sm-block">
                </div>
                <div class="col-4 col-sm-3 total-amount text-right">
                  {{ getAmount | round | format_price }}
                  <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                </div>
                <div class="col-1 col-sm-1"></div>
              </div>


            </div>

            <div class="features">
            <span class="free-delivery" v-if="getAmount >= 4000">
              <font-awesome-icon :icon="['fas', 'check']"/> Бесплатная доставка по России
            </span>
            </div>

            <hr class="mb-3 cart-hr">
            <p class="delivery mb-5">
              Бесплатная доставка по России, до двери вашего дома, при заказе на сумму свыше 4&nbsp;000 руб.
              (для Ненецкого АО, Республики Саха (Якутия), Камчатского края, Чукотского АО,
              Магаданской области, Сахалинской области свыше 30&nbsp;000 руб.)
            </p>
          </div>

          <b-row class="align-items-center">
            <b-col :lg="6" class="text-center">

              <DiscountForm />

            </b-col>
            <b-col :lg="6" class="text-center">
              <a :href="order_url" target="_blank" class="btn black-button mt-4 mt-lg-0">
                Оформить заказ
              </a>
              <!--<button @click.prevent="getOrder" class="btn black-button mt-4 mt-lg-0">
                Оформить заказ
              </button>-->
            </b-col>
          </b-row>

          <b-modal id="privacyPolicyCart" scrollable large size="lg" centered title="Политика конфиденциальности"
                   hide-footer>
            <Policy/>
          </b-modal>

        </div>
      </div>
    </client-only>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import round from '../mixins/round'
import format_price from "../mixins/format_price"
import ProductsList from '../components/ProductsList.vue'
import Policy from "./Policy";
import DiscountForm from "./DiscountForm";

export default {
  components: {
    Policy,
    ProductsList,
    DiscountForm
  },
  mixins: [round, format_price],

  methods: {
    /*postOrder: function () {
      const str = JSON.stringify(this.postBody);
      this.$axios.post('https://dev.skat-ups.ru/addtobasket/', str)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(str);
          console.log(error);
        });
    },
    getOrder: function () {
      const str = JSON.stringify(this.getBody);
      this.$axios.get('https://dev.skat-ups.ru/addtobasket/', str)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(str);
          console.log(error);
        });
    },*/
    goToConfigFromCart: function (event, category) {
      event.preventDefault()
      let link = '#configurator'
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'start'})
      // https://medium.com/@aneesshameed/event-bus-in-nuxt-7728315e81b6
      $nuxt.$emit('setactive', category)
      $nuxt.$emit('showstartbtn', false)
    }
  },
  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
    // Получаем адрес корзины с параметрами
    order_url() {
      let all_categories = [];
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].published == 1) {
          all_categories[i] = this.categories[i].id
        }
      }
      let cart_products = []
      let url_products = [];
      for (let i = 0; i < this.getProductsInCart.length; i++) {
        cart_products[i] = this.getProductsInCart[i]['meta'].parent
        let qty = this.getProductsInCart[i]['qty']
        if (!qty > 1) {
          url_products[i] = 'product_id[]=' + this.getProductsInCart[i]['meta'].article
        } else {
          for (let x = 0; x < qty; x++) {
            url_products.push('product_id[]=' + this.getProductsInCart[i]['meta'].article)
          }
        }
      }
      let skipped_categories = [];
      for (let i = 0; i < all_categories.length; i++) {
        if (!cart_products.includes(all_categories[i])) {
          skipped_categories[i] = all_categories[i]
        }
      }
      skipped_categories = skipped_categories.filter(function (el) {
        return el != null;
      })
      let site_url = 'https://dev.skat-ups.ru/addtobasket/?'
      let complect = ''
      if (skipped_categories.length === 0) complect = '&coupon=BF2020'
      let order_url = site_url + url_products.join('&') + complect
      //console.log(order_url)
      return order_url
    },
    categories() {
      return this.$store.getters['categories/categories']
    },
    getAmount() {
      let amount = 0
      if (this.getProductsInCart && this.getProductsInCart.length > 0) {
        this.getProductsInCart.forEach(product => {
          amount +=
            parseFloat(product.meta.price) *
            parseInt(product.qty)
        })
        return amount
      } else {
        return 0
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.cart-hr {
  border-bottom: 2px solid #000;
}

.title-block {
  border-bottom: 2px solid #000;
}

.span-link {
  cursor: pointer;
  color: #2C60B9;
  text-decoration: underline;
}

.title {
  background: -webkit-linear-gradient(#2762B9, #972EEA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'VoxRound', sans-serif;
  font-size: 2.6rem;
  font-weight: bold;
  margin-bottom: -2px;
  width: fit-content;
  padding: 0 1rem;
  border-bottom: 2px solid #f7f7f7;
  line-height: 2.2rem;
}

.empty-text {
  font-size: 1.3rem;
  font-family: $sprut-font-family;
  text-align: center;
  line-height: 3rem;
}

a.empty-text-start {
  color: $blue-color;
  font-size: 1.3rem;
  font-family: $sprut-font-family;
}

a.empty-text-start:hover {
  text-decoration: none;
}

.black-button {
  background-color: #000;
  padding: .8rem 2rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.black-button:hover, .black-button:focus {
  background: $violet-color;
  box-shadow: none;
}

.delivery {
  font-size: 1rem;
  font-weight: 300;
}

table {
  font-size: 1.3rem;
  font-family: $sprut-font-family;
}

.total {
  font-family: $sprut-font-family;
  font-size: 2.2rem;
  font-weight: 500;
}

.free-delivery {
  font-size: 1.1rem;
  font-family: $sprut-font-family;
  color: $violet-color;
}

.total svg {
  height: 27px;
  margin-bottom: 3px;
}

@media (max-width: 576px) {
  table {
    font-size: .9rem;
  }
}

@media (min-width: 576px) {
  table {
    font-size: 1rem;
  }
  .total-container {
    padding: 0 1rem;
  }
}

@media (min-width: 768px) {
  table {
    font-size: 1rem;
  }
}

@media (min-width: 992px) {
  table {
    font-size: 1.3rem;
  }
  .features {
    margin-left: 1rem;
  }
  .itogo {
    padding-left: 2rem;
  }
  .total-container {
    padding: 0;
  }
  .total-amount {
    padding-right: 1.4rem;
  }
}
</style>
