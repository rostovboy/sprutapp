<template>
  <div class="wrapper">
    <header>
      <Navbar />
    </header>
    <Begin />
    <Nuxt />
    <!--<section id="cart">
      <div class="container"><Cart /></div>
    </section>-->
    <About />
    <Contacts />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Begin from '~/components/Begin'
import About from "../components/About";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
export default {
  components: {Cart, Footer, Contacts, About, Navbar, Begin }
}
</script>

<style lang="scss">

</style>
