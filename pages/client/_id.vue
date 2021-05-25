<template>
  <div>
    <h1>Modifier la fiche client</h1>
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
    <button type="button" @click="updateCustomer">Modifier</button>
    <button type="button" @click="delConfirmationOpened = true">
      Supprimer la fiche
    </button>
    <div v-if="updated">
      <p>La fiche a bien été mise à jour</p>
    </div>
    <div v-if="delConfirmationOpened" class="confirmation-container">
      <p>Voulez-vous vraiment supprimer cette fiche ?</p>
      <button type="button" @click="delConfirmationOpened = false">Non</button>
      <button type="button" @click="deleteCustomer">Oui</button>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import ApiService from '@/services/apiService'
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric,
} from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

const dateValidator = helpers.regex(
  'dateValidator',
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
)
const alpha = helpers.regex('alpha', /^[a-zA-ZÀ-ž\s]*$/)

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
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
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
