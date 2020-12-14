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
              <b-row>
                <b-col class="text-left itogo">Итого</b-col>
                <b-col class="text-right total-amount">{{ getAmount | round | format_price }}
                  <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
                </b-col>
              </b-row>
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
              <button v-b-modal.askDiscount class="gradient-button">
                Получить скидку
              </button>
            </b-col>
            <b-col :lg="6" class="text-center">
              <a :href="url+get_str" target="_blank" class="btn black-button mt-4 mt-lg-0">
                Оформить заказ
              </a>
            </b-col>
          </b-row>

          <b-modal id="askDiscount" centered title="Получить скидку" hide-footer>
            <p class="text-center">
              Для получения дополнительной скидки<br>
              оставьте свои контакты и менеджер свяжется с вами
            </p>
            <div class="text-center">
              <b-form class="ask-call">
                <b-form-group>
                  <b-form-input
                    id="input-discount-name"
                    class="m-auto"
                    required
                    placeholder="Имя"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-input
                    id="input-discount-phone"
                    class="m-auto"
                    required
                    placeholder="Номер телефона"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="checkout">
                  <b-form-checkbox-group>
                    <b-form-checkbox required>
                      Согласие на обработку <span class="span-link" @click="$bvModal.hide('askDiscount'), $bvModal.show('privacyPolicyCart')">персональных данных</span>
                    </b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
                <button type="submit" class="call-black-button mt-4">Заказать звонок</button>
              </b-form>
            </div>
          </b-modal>

          <b-modal id="privacyPolicyCart" scrollable large size="lg" centered title="Политика конфиденциальности" hide-footer>
            <Policy />
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

export default {
  components: {
    Policy,
    ProductsList
  },
  mixins: [round, format_price],
  data() {
    return {
      url: 'https://dev.skat-ups.ru/addtobasket/',
      get_str: '&product_id[]=555',
      complect: false,
      /*getBody: [
        '&product_id[]=555'
      ],
      postBody: [
        {
          products: [
            [555, 2],
            [444, 1]
          ],
          complect: 1
        }
      ],*/
      errors: [] // массив для записи ошибок
    }
  },
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
      const str = this.getBody
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
    },
  },
  computed: {
    ...mapGetters({
      getProductsInCart: 'cart/getProductsInCart'
    }),
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
  padding-right: 1rem;
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

.gradient-button {
  background: linear-gradient(270deg, #2762B9 0%, #3056A3 11.87%, #972EEA 81.77%);
  padding: .8rem 2rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

a.gradient-button {
  color: #fff;
}

a.gradient-button:hover {
  text-decoration: none;
}

.gradient-button:hover, .gradient-button:focus {
  background: #000;
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
  .itogo, .features {
    margin-left: 1rem;
  }
  .total-container {
    padding: 0;
  }
  .total-amount {
    padding-right: 9rem;
  }
}
</style>
