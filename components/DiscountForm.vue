<template>
  <div>
    <button v-b-modal.askDiscount class="gradient-button">
      Получить скидку
    </button>

    <b-modal id="modalResponseCart" centered title="" hide-footer>
      <p class="text-center">
        {{ result }}
      </p>
    </b-modal>

    <b-modal id="askDiscount" centered title="Получить скидку" hide-footer>
      <p class="text-center">
        Оставьте заявку и наш специалист свяжется с вами
        в ближайшее время
      </p>

      <div v-if="errors.length">
        <b>Пожалуйста исправьте указанные ошибки:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <div class="text-center">
        <b-form class="ask-call">
          <b-form-group>
            <b-form-input
              class="m-auto"
              required
              placeholder="Имя"
              v-model="name"
              novalidate="true"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input
              class="m-auto"
              required
              placeholder="Номер телефона"
              v-model="phone"
              novalidate="true"
            ></b-form-input>
          </b-form-group>

          <b-form-group class="checkout">
            <b-form-checkbox-group>
              <b-form-checkbox required v-model="agree" novalidate="true">
                Согласие на обработку <span class="span-link" @click="$bvModal.hide('askCall'), $bvModal.show('privacyPolicy')">персональных данных</span>
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <button type="submit" @click.prevent="checkForm" class="call-black-button mt-4">Заказать звонок</button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'Конфигуратор СКУД, форма запроса доп. скидки',
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
              this.result = 'Заявка на получение дополнительной скидки № ' + response.data['message'] + ' успешно создана! Наш специалист свяжется с вами в ближайшее время'
              this.$bvModal.hide('askDiscount')
              this.$bvModal.show('modalResponseCart')
              setTimeout(() => {
                this.$bvModal.hide('modalResponseCart')
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
.gradient-button {
  background: linear-gradient(270deg, #2762B9 0%, #3056A3 11.87%, #972EEA 81.77%);
  padding: .8rem 2rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

a.gradient-button {
  color: #fff;
}

a.gradient-button:hover {
  text-decoration: none;
}

.gradient-button:hover, .gradient-button:focus {
  background: #000;
}

.span-link {
  cursor: pointer;
  color: #2C60B9;
  text-decoration: underline;
}

.notvalid {
  //border: 1px solid red;
}
.valid {
  border: 1px solid #00b800;
}
</style>
