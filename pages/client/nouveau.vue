<template>
  <div class="flex-col">
    <h1>Création d'une fiche client</h1>
    <form class="flex-col" @submit.prevent="createCustomer">
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
      <button type="submit">Créer</button>
    </form>
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

  head() {
    return {
      title: `| Nouveau client`,
    }
  },

  computed: {
    ...mapState({
      customer: (state) => state.customers.currentCustomer,
      customerFields: (state) => state.customers.customerFields,
    }),
  },

  // Clean currentCustomer in the store
  mounted() {
    this.$store.commit('customers/SET_CURRENT_CUSTOMER', {
      firstName: '',
      lastName: '',
      birthdate: '',
      telNum: '',
      email: '',
    })
  },

  methods: {
    async createCustomer() {
      // Makes all fields "dirty" so validation is enabled
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const datas = { ...this.customer }
        datas.birthdate = datas.birthdate.split('/').reverse().join('-')
        const res = await ApiService.create(datas).then((response) => response)
        if (res.status === 201) {
          this.$router.push('/')
        }
      }
    },
  },

  // Fields validation
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
        minLength: minLength(10),
      },
      email: {
        required,
        email,
      },
    },
  },
}
</script>

<style scoped></style>
