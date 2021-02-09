<template>
  <section id="contacts">
    <b-container>
      <b-row class="align-items-center">
        <b-col :sm="6" :lg="7" class="text-center text-lg-left">
          <p class="title">Свяжитесь с нами</p>
          <p class="text"><strong>Интернет-магазин</strong></p>
          <p class="text">Ростов-на-Дону,<br>ул. Красноводская, 4/4</p>
          <p class="phone">8-800-200-58-35</p>
        </b-col>
        <b-col :sm="6" :lg="5">

          <ContactsForm />

        </b-col>
      </b-row>
    </b-container>

    <b-modal id="privacyPolicyContacts" scrollable large size="lg" centered title="Политика конфиденциальности" hide-footer>
      <Policy />
    </b-modal>

  </section>
</template>

<script>
import Policy from "./Policy";
import ContactsForm from "./ContactsForm";
export default {
  components: {ContactsForm, Policy}
}
</script>

<style lang="scss" scoped>
#contacts {
  padding: 7rem 0;
  color: #fff;
  background: linear-gradient(270deg, #2762b9 0%, #3056A3 11.87%, #972EEA 81.77%);
}

.title {
  font-weight: bold;
  font-size: 2.4rem;
}

.text {
  font-size: 1.6rem;
}

.phone {
  font-weight: bold;
  font-size: 2.1rem;
}
</style>
