<template>

  <b-navbar toggleable="lg" type="dark" fixed="top">
    <b-container>
      <b-navbar-brand href="#begin" @click="goToMain">
        <img class="img-fluid" src="~/assets/img/bastion_logo.svg">
      </b-navbar-brand>
      <b-navbar-nav v-for="item in items" :key="item.link" class="d-none d-lg-block">
        <b-nav-item :href="item.link" @click="goToBlock" class="pseudo">{{ item.name }}</b-nav-item>
      </b-navbar-nav>

      <button v-b-modal.askCall class="d-none d-lg-block call-button">
        Заказать звонок
      </button>
      <button v-b-modal.askCall class="call-button call-mobile d-lg-none">
        <font-awesome-icon :icon="['fas', 'phone-alt']"/>
      </button>
    </b-container>

    <b-modal id="askCall" centered title="Обратный звонок" hide-footer>
      <p class="text-center">
        Оставьте заявку и наш специалист свяжется с вами
        в ближайшее время
      </p>
      <div class="text-center">
        <b-form class="ask-call">
          <b-form-group>
            <b-form-input
              id="input-1"
              required
              placeholder="Имя"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="input-2"
              required
              placeholder="Номер телефона"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="checkout">
            <b-form-checkbox-group>
              <b-form-checkbox required>Согласие на обработку <a href="/privacy-policy">персональных данных</a></b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <button type="submit" class="call-black-button mt-4">Заказать звонок</button>
        </b-form>
      </div>
    </b-modal>

  </b-navbar>
</template>

<script>
export default {
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
