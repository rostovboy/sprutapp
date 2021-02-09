<template>

  <b-navbar toggleable="lg" type="dark" fixed="top">
    <b-container>
      <b-navbar-brand href="#begin" @click="goToMain">
        <img class="img-fluid" src="~/assets/img/bastion_logo.svg">
      </b-navbar-brand>

      <div class="d-none d-lg-block ml-auto">
        <b-navbar-nav>
          <b-nav-item v-for="item in items" :key="item.link" :href="item.link" @click="goToBlock">{{ item.name }}</b-nav-item>
        </b-navbar-nav>
      </div>

      <NavForm />

    </b-container>

    <b-modal id="privacyPolicy" scrollable large size="lg" centered title="Политика конфиденциальности" hide-footer>
      <Policy />
    </b-modal>


  </b-navbar>
</template>

<script>
import Policy from "./Policy";
import NavForm from "./NavForm";
export default {
  components: {NavForm, Policy},
  data() {
    return {
      items: [
        {
          name: 'Конфигуратор',
          link: '#configurator'
        },
        {
          name: 'О системе',
          link: '#about'
        },
        {
          name: 'Контакты',
          link: '#contacts'
        }
      ]
    }
  },
  methods: {
    goToBlock: function (event) {
      event.preventDefault()
      let link = event.target.getAttribute('href')
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'start'})
    },
    goToMain: function (event) {
      event.preventDefault()
      let link = '#begin'
      document.querySelector(link).scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-logo img{
  max-height: 35px;
  margin-top: .2rem;
}
a.nav-link {
  color: #fff !important;
  padding: 0.2rem 0 !important;
  margin-right: 2.5rem;
}

a.nav-link:hover,
a:not(.nav-link){
  text-shadow: 0 0 1.3px white, 0 0 1.3px white, 0 0 1.3px white;
}

.navbar-dark {
  background-color: black !important;
}
.call-button, .call-button-icon {
  background: linear-gradient(270deg, #2762B9 0%, #3056A3 11.87%, #972EEA 81.77%);
  border-radius: 4rem;
  border: 2px solid #fff;
  font-weight: bold;
  color: #fff;
  font-size: 1.1rem;
  padding: .30rem 2rem .39rem 2rem;
}
.call-button.call-mobile {
  padding: .30rem .6rem;
}
.call-button:hover {
  background: #000;
}

.span-link {
  cursor: pointer;
  color: #2C60B9;
  text-decoration: underline;
}

.top-nav {
  padding: .5rem 0;
  background-color: #000;
  color: #fff;
}
.top-nav a {
  color: #fff;
  text-decoration: none;
}
.top-menu {
  display: table;
  padding-left: 0;
  padding-top: .3rem;
  margin-bottom: 0;
  list-style: none;
  width: 100%;
}
.top-menu>li {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  float: none;
  position: relative;
  padding: .25rem 0;
}
</style>
