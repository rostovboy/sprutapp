<template>
  <section id="about">
    <b-container class="vert-center">
      <b-row class="align-items-center">
        <b-col col-12 :sm="6" :lg="5">
          <div class="matrix">
            <img class="img-fluid matrix-img" src="~/assets/img/door.jpg" alt="">
            <img class="matrix-bg" src="~/assets/img/matrix.svg" alt="">
          </div>
        </b-col>
        <b-col col-12 :sm="6" :lg="7">
          <h1 class="mb-5 text-center text-lg-left">
            <span class="sprut-title">SPRUT</span> — система контроля и управления доступом
          </h1>
          <p class="desc mb-4 text-center text-lg-left">
            Электронная система СКУД SPRUT обеспечит вам безопасность.<br>
            Технология SPRUT защитит вам дом или офис от
            нежелательных взломов.
          </p>
          <p class="slogan text-center text-lg-left">
            Хорошо подобранный замок — гарант безопасности.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
#about {
  background-color: #fff;
  padding: 5rem 0;
  display: table;
  height: 100%;
  min-height: 100%;
  width: 100%;
}


.sprut-title {
  font-weight: bold;
}

.desc {
  font-size: 1.5rem;
}

.slogan {
  font-size: 1.5rem;
  font-family: $sprut-font-family;
  color: $violet-color;
}

.matrix {
  position: relative;
}

.matrix-img {
  padding-right: 15.5%;
}

.matrix-bg {
  position: absolute;
  width: 90%;
  height: 90%;
  top: 22.5%;
  left: 8%;
}

@media (max-width: 576px) {
  .matrix {
    margin-left: 2.8rem;
    margin-bottom: 5rem;
  }
  h1 {
    margin-top: 3rem;
    font-size: 2.4rem;
  }
}
@media (min-width: 576px) {
  h1 {
    font-size: 2.2rem;
  }
}
@media (min-width: 768px) {
  h1 {
    font-size: 2.6rem;
  }
}
@media (min-width: 992px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
