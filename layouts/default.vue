<template>
  <div class="wrapper">
    <header>
      <Navbar />
    </header>
    <Begin />
    <Nuxt />
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
export default {
  components: {Footer, Contacts, About, Navbar, Begin }
}
</script>

<style lang="scss">

</style>
