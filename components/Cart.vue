<template>
  <div>
    <div v-if="getProductsInCart.length === 0">
      <p class="text-center mb-4"><img class="img-fluid" src="~/assets/img/empty_bag.png" alt=""></p>
      <p class="empty-text">
        Товаров пока нет, но это легко исправить!<br>
        <a href="javascript:"
           class="empty-text-start"
           @click.prevent="add"
           @click="$bvModal.hide('Cart'), $bvModal.show('categoryId-3')">
          Начни с контроллера
          <font-awesome-icon :icon="['fas', 'arrow-right']"/>
        </a>
      </p>
    </div>
    <div v-else>

      <ProductsList class="products" :products-from-cart="getProductsInCart"/>

      <div class="total mb-4">
        <b-row>
          <b-col class="text-left pl-4">Итого</b-col>
          <b-col class="text-right pr-4">{{ getAmount | round | format_price }}
            <font-awesome-icon :icon="['fas', 'ruble-sign']"/>
          </b-col>
        </b-row>
      </div>

      <span class="free-delivery" v-if="getAmount >= 4000">
        <font-awesome-icon :icon="['fas', 'check']"/> Бесплатная доставка по России
      </span>
      <hr class="mb-3">
      <p class="delivery mb-5">
        Бесплатная доставка по России, до двери вашего дома, при заказе на сумму свыше 4 000 руб.
        (для Ненецкого АО, Республики Саха (Якутия), Камчатского края, Чукотского АО,
        Магаданской области, Сахалинской области свыше 30 000 руб.)
      </p>

      <b-row>
        <b-col :lg="6" class="text-center">
          <button class="gradient-button">
            Получить скидку
          </button>
        </b-col>
        <b-col :lg="6" class="text-center">
          <button class="black-button mt-4 mt-lg-0" @click="postOrder">
            Оформить заказ
          </button>
        </b-col>
      </b-row>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import round from '../mixins/round'
import format_price from "../mixins/format_price"
import ProductsList from '../components/ProductsList.vue'

export default {
  components: {
    ProductsList
  },
  mixins: [round, format_price],
  data() {
    return {
      postBody: [
        {
          products: [
            [555, 2],
            [444, 1]
          ],
          complect: 1
        }
      ],
      errors: [] // массив для записи ошибок
    }
  },
  methods: {
    add(event) {
      this.btnDisabled = true; // mutate data and let vue disable the element
    },
    postOrder: function () {
      const str = JSON.stringify(this.postBody);
      this.$axios.post('http://unknownsite.ru/api/order', str)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(str);
          console.log(error);
        });
    }
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
}
</style>
