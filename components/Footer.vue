<template>
  <footer>
    <b-container>

      <b-row class="align-items-center">
        <b-col cols="12" :lg="4" class="d-none d-lg-block">
          <span class="span-link" @click="$bvModal.hide('privacyPolicyFooter'), $bvModal.show('Conditions')">Условия использования</span>
        </b-col>
        <b-col cols="12" :lg="5" class="d-none d-lg-block">
          <span class="span-link" @click="$bvModal.hide('Conditions'), $bvModal.show('privacyPolicyFooter')">Политика конфиденциальности</span>
        </b-col>
        <b-col cols="12" :lg="3">
          <div class="social-media">
            <b-row class="align-items-center">
              <b-col class="text-center">
                <a href="https://www.youtube.com/user/wwwbastru/">
                  <img class="img-fluid social-icon" src="~/assets/img/social_icons/youtube_icon.svg" alt="YouTube">
                </a>
              </b-col>
              <b-col class="text-center">
                <a href="https://www.facebook.com/www.bast.ru">
                  <img class="img-fluid social-icon" src="~/assets/img/social_icons/fb_icon.svg" alt="Facebook">
                </a>
              </b-col>
              <b-col class="text-center">
                <a href="https://www.instagram.com/bastion.ops/">
                  <img class="img-fluid social-icon" src="~/assets/img/social_icons/instagram_icon.svg" alt="Instagram">
                </a>
              </b-col>
              <b-col class="text-center">
                <a href="https://vk.com/po_bastion">
                  <img class="img-fluid social-icon" src="~/assets/img/social_icons/vk_icon.svg" alt="YouTube">
                </a>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>

      <hr class="d-none d-lg-block">

      <b-row class="align-items-center">

        <b-col cols="12" :lg="4" class="text-center d-lg-none mt-5 mb-3">
          <span class="span-link" @click="$bvModal.hide('privacyPolicyFooter'), $bvModal.show('Conditions')">Условия использования</span>
        </b-col>
        <b-col cols="12" :lg="5" class="text-center d-lg-none mb-5">
          <span class="span-link" @click="$bvModal.hide('Conditions'), $bvModal.show('privacyPolicyFooter')">Политика конфиденциальности</span>
        </b-col>

        <b-col :lg="4">
          <div class="mb-4 text-center text-lg-left">
            Закрытое акционерное общество «Бастион»,<br> ИНН 6163127276, ОГРН 1136195000138
          </div>
        </b-col>
        <b-col :lg="4">
          <div class="mb-4 text-center text-lg-left">
            344010, Россия, Ростовская обл.,<br>
            г. Ростов-на-Дону, ул. Красноводская, 8/7
          </div>
        </b-col>
        <b-col :lg="2">
          <div class="mb-4 text-center text-lg-right">
            <a href="https://skat-ups.ru">
              <img class="img-fluid" src="~/assets/img/skat_logo.svg" alt="Skat">
            </a>
          </div>
        </b-col>
        <b-col :lg="2">
          <div class="mb-4 text-center text-lg-right">
            <a href="https://bast.ru">
              <img class="img-fluid" src="~/assets/img/bastion_logo.svg" alt="Bastion">
            </a>
          </div>
        </b-col>
      </b-row>

    </b-container>

    <b-modal id="privacyPolicyFooter" scrollable large size="lg" centered title="Политика конфиденциальности" hide-footer>
      <Policy />
    </b-modal>

    <b-modal id="Conditions" scrollable large size="lg" centered title="Условия использования" hide-footer>
      <Conditions />
    </b-modal>

  </footer>
</template>

<script>
import Policy from "./Policy";
import Conditions from "./Conditions";
export default {
  components: {Conditions, Policy}
}
</script>

<style lang="scss" scoped>
footer {
  color: #fff;
  background-color: #000;
  padding: 7rem 0 6rem 0;
}

.span-link {
  cursor: pointer;
  color: #fff;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}

footer hr {
  border-top: 1px solid #fff;
  margin: 3rem 0;
}

footer a {
  color: #fff;
  text-decoration: underline;
}

footer a:hover {
  color: #fff;
  text-decoration: none;
}

.social-icon {
  max-height: 38px;
}
</style>
