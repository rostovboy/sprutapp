<template>
  <div>
    <b-modal id="modalResponseContacts" centered title="" hide-footer>
      <p class="text-center">
        {{ result }}
      </p>
    </b-modal>

    <div class="text-center text-lg-left">
      <div v-if="errors.length">
        <b>Пожалуйста исправьте указанные ошибки:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <b-form class="ask-call">
        <b-form-group>
          <b-form-input
            required
            placeholder="Имя"
            v-model="name"
            novalidate="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-input
            required
            placeholder="Номер телефона"
            v-model="phone"
            novalidate="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="checkout">
          <b-form-checkbox-group>
            <b-form-checkbox required id="agree" v-model="agree" novalidate="true">
              Согласие на обработку
              <span class="span-link" @click="$bvModal.show('privacyPolicyContacts')">персональных данных</span>
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <button type="submit" @click.prevent="checkForm" class="call-black-button mt-4">Заказать звонок</button>

      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Конфигуратор СКУД, обратный звонок',
      name: null,
      phone: null,
      agree: false,
      result: null,
      errors: [],
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (!this.name) {
        this.errors.push('Требуется указать имя');
      }
      if (!this.phone) {
        this.errors.push('Требуется указать телефон');
      }
      if (!this.agree) {
        this.errors.push('Требуется дать согласие');
      }

      if (this.name && this.phone && this.agree) {
        const modalTimeoutSeconds = 5;

        let postBody = [{
          'title': this.title,
          'name': this.name,
          'phone': this.phone
        }]
        const str = JSON.stringify(postBody);
        this.$axios.post('https://sprut.fract.ru/api/queries', str)
          .then((response) => {
            if (response.data['message'] > 0) {
              this.result = 'Заявка на обратный звонок № ' + response.data['message'] + ' успешно создана! Наш специалист свяжется с вами в ближайшее время'
              this.$bvModal.show('modalResponseContacts')
              setTimeout(() => {
                this.$bvModal.hide('modalResponseContacts')
              }, modalTimeoutSeconds * 1000)
            }
          })
          .catch((error) => {
            this.result = error
          });

        return true;
      }
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss" scoped>
form a {
  color: #fff;
  text-decoration: underline;
}

.span-link {
  cursor: pointer;
  color: #fff;
  text-decoration: underline;
}
input {
  height: 3.8rem;
  max-width: 405px !important;
  border-radius: 5rem;
  border: 1px solid #000;
}

.checkout {
  margin: 1.7rem 0 .5rem 0;
  padding-left: 1rem;
}

@media (max-width: 576px) {
  form.ask-call {
    margin-top: 2.5rem;
  }
}

@media (min-width: 576px) {
  form.ask-call {
    margin-top: 2.5rem;
  }
}

@media (min-width: 768px) {
  form.ask-call {
    margin-top: 2.5rem;
  }
}

@media (min-width: 992px) {
  form.ask-call {
    margin-top: 0;
  }
}
</style>
