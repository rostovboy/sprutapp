<template>
  <section id="begin">
    <b-container class="vert-center">
      <div class="text-center box">
        <img class="img-fluid begin-logo" src="~/assets/img/sprut_logo.svg" alt="Sprut">
        <p class="begin-slogan">Собери комплект СКУД</p>
        <div class="begin-arrow">
          <Arrow />
        </div>
        <p>
          <a class="black-button" @click="goToBlock" href="#configurator">Собрать</a>
        </p>
      </div>
    </b-container>
  </section>
</template>

<script>
import Arrow from "~/components/Arrow";
export default {
  components: {
    Arrow
  },
  methods: {
    goToBlock:  function (event) {
      event.preventDefault()
      let link = event.target.getAttribute('href')
      document.querySelector(link).scrollIntoView({ behavior: 'smooth', block: 'start'})
    }
  }
}
</script>

<style lang="scss" scoped>
#begin {
  display: table;
  height: 100%;
  min-height: 100%;
  width: 100%;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.18);
  background-image: url('~assets/img/sprut_bg.svg') !important;
  background-repeat: no-repeat !important;
  background-position: left top;
}

.bg-sprut-begin {
  position: absolute;
  top: 58px;
  left: 0;
}

.begin-slogan {
  font-size: 3rem;
  color: #fff;
  font-family: $sprut-font-family;
  font-weight: bold;
  margin: 0;
}

.begin-arrow {
  margin-bottom: 4rem;
  position: relative;
  height: 150px;
}

.black-button {
  background-color: #000;
  padding: .8rem 4rem;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.black-button:hover, .black-button:focus {
  box-shadow: 1px 1px 60px 3px $blue-color;
}
a.black-button {
  color: #fff;
}
a.black-button:hover {
  text-decoration: none;
}

@media (max-width: 576px) {
  .bg-sprut-begin img {
    height: 200px;
  }
  .begin-arrow {
    margin-bottom: 2rem;
  }
  .begin-logo {
    max-height: 90px;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  .black-button {
    font-size: 1.2rem;
  }
  .begin-slogan {
    font-size: 2.3rem;
  }
}
@media (min-width: 576px) {
  .bg-sprut-begin img {
    height: 500px;
  }
  .begin-arrow {
    margin-bottom: 2rem;
  }
  .begin-logo {
    max-height: 90px;
    margin-bottom: 2rem;
  }
}
@media (min-width: 768px) {
  .bg-sprut-begin img {
    height: 600px;
  }
  .begin-arrow {
    margin-bottom: 3rem;
  }
  .begin-logo {
    max-height: 116px;
    margin-bottom: 4rem;
  }
}
@media (min-width: 992px) {
  .bg-sprut-begin img {
    height: 700px;
  }
  .begin-arrow {
    margin-bottom: 4rem;
  }
  .begin-logo {
    max-height: 116px;
    margin-bottom: 4rem;
  }
}
@media (min-width: 1366px) {
  .bg-sprut-begin img {
    height: 800px;
  }
  .begin-arrow {
    margin-bottom: 4rem;
  }
  .begin-logo {
    max-height: 116px;
    margin-bottom: 4rem;
  }
}
</style>
