<template>
  <section id="configurator">
    <b-container class="category-menu">

      <div v-if="$device.isDesktop" v-show="isHiddenStartBtn" class="start-arrow">
        <span class="close" @click.prevent="setActive('categoryId-3')">×</span>
        <p>Начни с контроллера</p>
        <img src="~/assets/img/start_controller.svg" alt="">
      </div>

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

      <div v-if="$device.isTablet" v-show="isHiddenStartBtn" class="start-arrow-tablet">
        <span class="close" @click.prevent="setActive('categoryId-3')">×</span>
        <img src="~/assets/img/start_controller.svg" alt="">
        <span class="start-text">Начни с контроллера</span>
      </div>

    </b-container>

    <div class="container-fluid">
      <div class="tab-content" id="configuratorTabs">
        <!--Home Tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="home">

          <!--<div class="start-square" v-if="$device.isDesktopOrTablet" @click.prevent="setActive('categoryId-3')">
            Начни с контроллера
          </div>

          <div class="start-square-mobile" v-if="$device.isMobile" @click.prevent="setActive('categoryId-3')">
            Начни с контроллера
          </div>-->

          <System v-on:setactive="setActive" />

        </div>
        <!--Categories Tabs-->
        <div v-for="category of categories" :key="category.id"
             class="tab-pane fade"
             :class="{ 'active show': isActive(`categoryId-${category.id}`) }"
             :id="'categoryId-' + category.id">

          <b-row class="align-items-center">
            <b-col v-if="$device.isDesktop" :xl="4">
              <div class="position-relative door-block">
                <img :src="'/images/system/system-' + category.id + '.svg'" class="img-fluid" alt="">
                <div class="minicart">
                  <MiniCart />
                </div>
              </div>
            </b-col>
            <b-col col-12 :sm="12" :xl="8">
              <b-card class="products-card">

                <button type="button" class="close close-button" @click.prevent="setActive('home')">×</button>

                <div class="media title-media">
                  <img src="~/assets/img/sprut_violet_logo.svg" class="img-fluid sprut-logo align-self-center mr-3"
                       alt="">
                  <div class="media-body align-self-center category-title">{{ category.pagetitle }}</div>
                </div>

                <button v-if="$device.isMobile"
                        class="btn to-order-button-mobile"
                        @click.prevent="setActive('home')"
                        @click="goToCartMobile">
                  Перейти в состав заказа
                </button>

                <button v-if="$device.isDesktop"
                        class="btn to-order-button-desktop"
                        @click.prevent="setActive('home')"
                        @click="goToCart">
                  Перейти в состав заказа
                </button>

                <div v-if="$device.isTablet" class="tablet-minicart-block">
                  <button class="btn to-order-button"
                          @click.prevent="setActive('home')"
                          @click="goToCart">
                    Перейти в состав заказа
                  </button>
                  <div class="minicart-tablet">
                    <MiniCart />
                  </div>
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
    this.$nuxt.$on('showstartbtn', (data) => {
      this.isHiddenStartBtn = data
    })
  },
  data() {
    return {
      isHiddenStartBtn: true,
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
      this.isHiddenStartBtn = false
    },
    goToCart: function (event) {
      event.preventDefault()
      let link = '#cart'
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'start'})
    },
    goToCartMobile: function (event) {
      event.preventDefault()
      let link = '#configurator'
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'nearest'})
    }
  }
}
</script>


<style lang="scss" scoped>
#configurator {
  position: relative;
  padding-top: 4.5rem;
  /*padding-bottom: 35px;*/
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
.category-menu {
  position: relative;
}
.start-arrow {
  position: absolute;
  bottom: 60px;
  left: 170px;
  border-radius: .5rem;
  border: 2px solid #fff;
  padding: .4rem 1rem .5rem 1rem;
  width: fit-content;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: $sprut-font-family;
  /*cursor: pointer;*/
}
.start-arrow .close, .start-arrow-tablet .close {
  position: absolute;
  top: -.3rem;;
  right: .5rem;
  color: #fff;
  font-size: 2.1rem;
  font-weight: 100;
  cursor: pointer;
}
.start-arrow p {
  margin-bottom: .1rem;
}

.start-arrow-tablet {
  position: relative;
  border-radius: .5rem;
  border: 1px solid #fff;
  padding: .8rem 1rem;
  width: fit-content;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: $sprut-font-family;
  cursor: pointer;
  margin-left: 19%;
  margin-top: 1rem;
}

.start-arrow-tablet img {
  transform: scaleY(-1);
}
.start-arrow-tablet .start-text {
  position: absolute;
  left: 100px;
  top: 22px;
}

.minicart {
  position: absolute;
  bottom: 1px;
  right: 1.3rem;
  background: white;
  width: 42.5%;
  margin-bottom: -3.4rem;
}

.minicart-tablet {
  background-color: #fff;
  padding: 0;
}

.tablet-minicart-block {
  position: absolute;
  right: 15%;
  top: 0;
  z-index: 1;
  box-shadow: 1px 8px 14px 0 rgba(21, 21, 21, 0.26);
}
.to-order-button, .to-order-button-desktop {
  background: $violet-color;
  border-radius: 0 0 10px 10px;
  color: #fff;
  text-decoration: none;
}

.to-order-button-desktop {
  position: absolute;
  top: 0;
  right: 15%;
  padding: .7rem 1.6rem;
  height: 50px;
}

.to-order-button-mobile {
  position: absolute;
  padding: .3rem;
  background: $violet-color;
  border-radius: 0 0 10px 10px;
  color: #fff;
  text-decoration: none;
  right: 5%;
  top: 100%;
  width: 90%;
  box-shadow: 0 4px 5px 0 rgba(21, 21, 21, 0.4);
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
  margin-top: 7.5rem;
  /*margin-bottom: 5rem;*/
  min-height: 735px;
  max-height: 735px;
}
#home.tab-pane {
  margin-bottom: .45rem;
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
    bottom: 2.3%;
    left: 71%;
  }
  .category-menu {
    margin-top: 4rem;
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
    bottom: 8%;
    left: 80%;
  }
  .products-card .card-body {
    padding: 1.2rem !important;
  }
  .products-block {
    margin-bottom: 0;
  }
  .to-order-button {
    padding: .2rem 1.6rem;
  }
  .category-menu {
    margin-top: 4rem;
  }
}
@media (min-width: 1024px) {
  .to-next-button {
    bottom: 8%;
    left: 72%;
  }
}
@media (min-width: 1366px) {
  #configurator {
    background-image: url('~assets/img/sprut_right_bg.svg');
    background-repeat: no-repeat;
    background-position: right bottom;
  }
  .products-card {
    height: auto;
    max-height: unset;
    min-height: auto;
  }
  .products-block {
    margin-bottom: 0;
  }
  .to-next-button {
    bottom: 7%;
    left: 37%;
  }
  .products-card .card-body {
    padding: 1.6rem !important;
  }
  .to-order-button {
    padding: .7rem 1.6rem;
    height: 50px;
  }
  .category-menu {
    margin-top: 7.5rem;
  }
}

@media (min-width: 1600px) {
  .products-card {
    margin-bottom: 3rem;
  }
  .door-block img{
    margin-bottom: -3.5rem;
  }
  .products-card .card-body {
    padding: 2rem 2.5rem 2rem 4rem !important;
  }
}

@media (min-width: 1800px) {
  .products-card .card-body {
    padding: 2rem 2.5rem 2rem 6rem !important;
  }
}
</style>
