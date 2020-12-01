<template>
  <section id="configurator">
    <b-container>

      <VueSlickCarousel v-bind="slickSettingsDesktop" class="category-select">
        <div v-for="category of categories" :key="category.id" class="text-center">
          <div class="configurator-link" @click.prevent="setActive(`categoryId-${category.id}`)"
               :class="{ active: isActive(`categoryId-${category.id}`) }">
            <div class="d-lg-none">
              <img class="img-fluid caticon mb-3" :src="category.caticon" :alt="category.pagetitle">
            </div>
            {{ category.pagetitle }}
          </div>
        </div>
      </VueSlickCarousel>

    </b-container>

    <div class="container-fluid">
      <div class="tab-content" id="configuratorTabs">
        <!--Home Tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="home">

          <div class="start-square" v-if="$device.isDesktopOrTablet" @click.prevent="setActive('categoryId-3')">
            Начни с контроллера
          </div>

          <div class="start-square-mobile" v-if="$device.isMobile" @click.prevent="setActive('categoryId-3')">
            Начни с контроллера
          </div>

          <System v-on:setactive="setActive" />

          <!--<div v-if="$device.isDesktop">
            <p>Is Desktop</p>
          </div>
          <div v-if="$device.isMobile">
            <p>Is Mobile</p>
          </div>
          <div v-if="$device.isTablet">
            <p>Is Tablet</p>
          </div>-->

        </div>
        <!--Categories Tabs-->
        <div v-for="category of categories" :key="category.id"
             class="tab-pane fade"
             :class="{ 'active show': isActive(`categoryId-${category.id}`) }"
             :id="'categoryId-' + category.id">

          <b-row class="align-items-center">
            <b-col col-12 :lg="4">
              <div v-if="$device.isDesktop" class="position-relative">
                <img :src="'/images/system/system-' + category.id + '.svg'" class="img-fluid" alt="">
                <div class="minicart">
                  <MiniCart />
                </div>
              </div>
            </b-col>
            <b-col col-12 :lg="8">
              <b-card class="products-card">

                <button type="button" class="close close-button" @click.prevent="setActive('home')">×</button>

                <div class="media title-media">
                  <img src="~/assets/img/sprut_violet_logo.svg" class="img-fluid sprut-logo align-self-center mr-3"
                       alt="">
                  <div class="media-body align-self-center category-title">{{ category.pagetitle }}</div>
                </div>

                <button v-if="$device.isDesktopOrTablet"
                        class="btn to-order-button"
                        @click.prevent="setActive('home')"
                        @click="$bvModal.show(`Cart`)">
                  Перейти в состав заказа
                </button>

                <button v-if="$device.isMobile"
                        class="btn to-order-button-mobile"
                        @click.prevent="setActive('home')"
                        @click="$bvModal.show(`Cart`)">
                  Перейти в состав заказа
                </button>

                <div class="minicart-tablet" v-if="$device.isTablet">
                  <MiniCart />
                </div>

                <div class="products-block">
                  <Products :category="category.id"/>
                </div>

                <div class="to-next-button pseudo" v-if="category.nextstep != '0'">
                  <a href="javascript:"
                     @click.prevent="setActive(`categoryId-${category.nextstep}`)"
                     :class="{ active: isActive(`categoryId-${category.nextstep}`) }">
                    Далее <font-awesome-icon :icon="['fas', 'arrow-right']"/>
                  </a>
                </div>

              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <b-modal id="Cart" size="xl" centered title="Состав заказа" hide-footer>
      <Cart />
    </b-modal>

  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import System from "../components/System";
import Products from "../components/Products";
import MiniCart from "../components/MiniCart";
import Cart from "../components/Cart";

export default {
  components: {Cart, MiniCart, Products, System, VueSlickCarousel},
  computed: {
    categories() {
      return this.$store.getters['categories/categories']
    }
  },
  mounted () {
    // https://medium.com/@aneesshameed/event-bus-in-nuxt-7728315e81b6
    this.$nuxt.$on('setactive', (data) => {
      this.activeItem = data
    })
  },
  data() {
    return {
      activeItem: 'home',
      slickSettingsDesktop: {
        "dots": false,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 5,
        "slidesToScroll": 1,
        "initialSlide": 0,
        "responsive": [
          {
            "breakpoint": 1024,
            "settings": {
              "slidesToShow": 3,
              "slidesToScroll": 1,
              "infinite": true,
            }
          },
          {
            "breakpoint": 600,
            "settings": {
              "slidesToShow": 2,
              "slidesToScroll": 1,
              "initialSlide": 2
            }
          },
          {
            "breakpoint": 480,
            "settings": {
              "slidesToShow": 1,
              "slidesToScroll": 1
            }
          }
        ]
      },
    }
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      this.activeItem = menuItem
    },
    add(event) {
      this.btnDisabled = true; // mutate data and let vue disable the element
    },
  }
}
</script>


<style lang="scss" scoped>
#configurator {
  position: relative;
  padding-top: 6rem;
  padding-bottom: 35px;
  background-image: url('~assets/img/sprut_right_bg.svg');
  background-repeat: no-repeat;
  background-position: right bottom;
  /*display: table;
  height: 100%;
  min-height: 100%;
  width: 100%;
  color: white;
  */
}

#home .tab-pane {
  margin-top: -4rem;
}

.title-media {

}

.minicart {
  position: absolute;
  bottom: 1px;
  right: 1.3rem;
  background: white;
  padding: 0 .5rem;
  width: 42.5%;
}

.minicart-tablet {
  position: absolute;
  top: 50px;
  left: 53%;
  background-color: #fff;
  padding: 0 .5rem;
  z-index: 1;
}
.to-order-button, .to-order-button-mobile {
  position: absolute;
  right: 15%;
  top: 0;
  padding: .7rem 1.6rem;
  height: 50px;
  background: $violet-color;
  border-radius: 0 0 10px 10px;
  color: #fff;
  text-decoration: none;
}

.to-order-button-mobile {
  right: 5%;
  top: 100%;
  width: 90%;
  box-shadow: 0 4px 5px 0 rgba(21, 21, 21, 0.4);
}


.products-card .card-body {
  padding: 2rem !important;
}

.products-block {
  margin-top: 2rem;
}

.category-title {
  font-family: $sprut-font-family;
  font-weight: 100;
  font-size: 35px;
  color: $violet-color;
}

img.sprut-logo[data-v-2a183b29] {
  max-height: 46px;
}

.tab-pane {
  margin-top: 4rem;
  min-height: 735px;
  max-height: 735px;
}

.close-button {
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  top: 1.1rem;
}
.close {
  font-size: 3rem;
  font-weight: 100;
}

.products-card {
  border-radius: 1rem;
  min-height: 600px;
  max-height: 600px;
  border: none;
  box-shadow: 1px 1px 8px 0 rgba(21, 21, 21, 0.74118);
}

.configurator-link:hover {
  cursor: pointer;
}

.caticon {
  max-height: 100px;
}

.configurator-link {
  text-decoration: none;
  color: $blue-color;
  font-family: $sprut-font-family;
  font-weight: bold;
  line-height: 3.2rem;
  transition-duration: 0.4s;
}

.configurator-link:hover, .configurator-link.active {
  text-decoration: none;
  color: #fff;
}

.category-select {
  padding: 0 7rem;
}

.start-square, .start-square-mobile {
  cursor: pointer;
  position: relative;
  border-radius: .5rem;
  padding: 1rem 2rem;
  border: 1px solid #fff;
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
  font-family: $sprut-font-family;
  width: 35%;
  margin-bottom: 5rem;
  margin-left: 17%;
}

.start-square-mobile {
  width: 100%;
  margin-bottom: 5rem;
  margin-left: 0;
}

.start-square::before, .start-square-mobile::before {
  content: "";
  border: solid #fff;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 8px;
  position: absolute;
  left: 14%;
  top: -35px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% { opacity: .2; }
}

.start-square-mobile::before {
  left: 48%;
}

.start-square::after, .start-square-mobile::after  {
  content: "";
  border: solid #fff;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 8px;
  position: absolute;
  right: 18%;
  bottom: -35px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  animation: blinker 2s linear infinite;
}
.start-square-mobile::after {
  right: 56.5%;
}

.start-square .close, .start-square-mobile .close {
  position: absolute;
  top: -.3rem;;
  right: .5rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 100;
}

.to-next-button {
  position: absolute;
  bottom: 10.7%;
  left: 28%;
}
a.to-next-button {
  color: $blue-color;
}

@media (max-width: 576px) {
  #configurator {
    padding-bottom: 75px;
  }
  .tab-pane {
    min-height: auto;
    max-height: unset;
  }
  .products-card {
    height: auto !important;
    max-height: unset;
    min-height: auto;
  }
  .products-block {
    margin-bottom: 4rem;
  }
  .products-card .card-body {
    padding: 1rem !important;
  }
  .to-next-button {
    bottom: 3%;
    left: 70%;
  }
}
@media (min-width: 768px) {
  .tab-pane {
    min-height: auto;
    max-height: unset;
  }
  .products-card {
    height: auto;
    max-height: unset;
    min-height: auto;
  }
  .products-block {
    margin-bottom: 4rem;
  }
  .to-next-button {
    bottom: 4.5%;
    left: 48%;
  }
}
@media (min-width: 1366px) {
  .products-card {
    height: auto;
    max-height: unset;
    min-height: auto;
  }
  .products-block {
    margin-bottom: 0;
  }
  .to-next-button {
    bottom: 8%;
    left: 35%;
  }
}
</style>
