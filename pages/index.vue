<template>
  <section id="configurator">
    <b-container>

      <VueSlickCarousel v-bind="slickSettingsDesktop" class="category-select">
        <div v-for="category of categories" :key="category.id" class="text-center">
          <a href="javascript:" class="configurator-link d-lg-none">
            <img class="img-fluid caticon mb-3" :src="category.caticon" alt="">
          </a>
          <div class="configurator-link" @click.prevent="setActive('category-3')" :class="{ active: isActive('category-3') }">
            {{ category.pagetitle }}
          </div>
        </div>
      </VueSlickCarousel>

      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('category-3') }" id="category-3">category-3</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('category-4') }" id="category-4">category-4</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">Contact content</div>
      </div>

      <!--<ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('home')" :class="{ active: isActive('home') }" href="#home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('profile')" :class="{ active: isActive('profile') }" href="#profile">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('contact')" :class="{ active: isActive('contact') }" href="#contact">Contact</a>
        </li>
      </ul>

      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('home') }" id="home">Home content</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">Profile content</div>
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">Contact content</div>
      </div>-->

    </b-container>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: { VueSlickCarousel },
  computed: {
    categories() {
      return this.$store.getters['categories/categories']
    }
  },
  data () {
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
#configurator {
  position: relative;
  padding-top: 6rem;
  background-image: url('~assets/img/sprut_right_bg.svg');
  background-repeat: no-repeat;
  background-position: right bottom;
  color: white;
  /*display: table;
  height: 100%;
  min-height: 100%;
  width: 100%;
  */
}
</style>
