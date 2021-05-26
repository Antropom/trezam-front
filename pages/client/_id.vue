<template>
  <div>
    <h1>Modifier la fiche client</h1>
    <div class="flex-col">
      <BaseInput
        v-for="(customerField, name, index) in customerFields"
        :key="index"
        :field-name="name"
        :placeholder="customerField.placeholder"
        :error-message="customerField.errorMessage"
        :error="
          $v.customer[name].$dirty && $v.customer[name].$invalid ? true : false
        "
      />
      <div class="update-buttons">
        <button type="button" @click="updateCustomer">Modifier</button>
        <button
          class="error-btn"
          type="button"
          @click="delConfirmationOpened = true"
        >
          Supprimer
        </button>
      </div>
    </div>
    <div
      v-if="delConfirmationOpened"
      class="confirmation-container"
      @click="delConfirmationOpened = false"
    >
      <div class="confirmation-box">
        <p>Voulez-vous vraiment supprimer cette fiche ?</p>
        <div class="confirmation-btns">
          <button type="button" @click="delConfirmationOpened = false">
            Non
          </button>
          <button type="button" class="error-btn" @click="deleteCustomer">
            Oui
          </button>
        </div>
      </div>
    </div>
    <transition name="drop">
      <div v-if="updated" class="update-not">
        <div class="center-container">
          <p>La fiche a bien été mise à jour</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import ApiService from '@/services/apiService'
import { required, minLength, email, helpers } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

// Custom validators for Vuelidate
// Date validator (must be at the dd/mm/yyyy format and exist)
const dateValidator = helpers.regex(
  'dateValidator',
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
)
// Name validator (only alpha characters including accents)
const alpha = helpers.regex('alpha', /^[a-zA-ZÀ-ž\s]*$/)

// French phone number valiator
const phoneNumber = helpers.regex(
  'phoneNumber',
  /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
)

export default {
  components: {
    BaseInput,
  },

  data() {
    return {
      delConfirmationOpened: false,
      updated: false,
    }
  },

  async fetch() {
    await this.$store.dispatch(
      'customers/fetchCurrentCustomer',
      this.$route.params.id
    )
  },

  computed: {
    ...mapState({
      customer: (state) => state.customers.currentCustomer,
      customerFields: (state) => state.customers.customerFields,
    }),
  },

  methods: {
    async updateCustomer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const datas = { ...this.customer }
        datas.birthdate = datas.birthdate.split('/').reverse().join('-')
        const res = await ApiService.update(this.$route.params.id, datas).then(
          (response) => response
        )
        if (res.status === 201) {
          this.updated = true
          setInterval(() => (this.updated = false), 3000)
        }
      }
    },

    async deleteCustomer() {
      await ApiService.delete(this.$route.params.id).then(
        (response) => response
      )
      this.$router.push('/')
    },
  },

  validations: {
    customer: {
      firstName: {
        required,
        alpha,
        minLength: minLength(2),
      },
      lastName: {
        required,
        alpha,
        minLength: minLength(2),
      },
      birthdate: {
        required,
        dateValidator,
        minLength: minLength(10),
      },
      telNum: {
        required,
        phoneNumber,
      },
      email: {
        required,
        email,
      },
    },
  },
}
</script>

<style scoped>
.update-buttons {
  width: 265px;
  display: flex;
  justify-content: space-between;
}

.confirmation-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
}

.confirmation-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #d9534f;
  border-radius: 8px;
  padding: 25px;
}

.confirmation-box p {
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  margin: 0;
}

.confirmation-btns {
  display: flex;
  justify-content: space-between;
}

.update-not {
  position: absolute;
  top: 10px;
  left: 50%;
}

.drop-enter-active,
.drop-leave-active {
  transition: top 0.5s;
}
.drop-enter,
.drop-leave-to {
  top: -150px;
}

.center-container {
  position: relative;
  left: -50%;
  width: 265px;
  padding: 1px;
  background-color: #39b982;
  border-radius: 10px;
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
}
</style>
