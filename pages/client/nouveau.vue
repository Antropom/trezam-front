<template>
  <div>
    <h1>Création d'une fiche client</h1>
    <input v-model="customer.firstName" type="text" placeholder="Prénom" />
    <input v-model="customer.lastName" type="text" placeholder="Nom" />
    <input
      v-model="customer.birthdate"
      placeholder="Date de naissance (jj/mm/aaaa)"
    />
    <input
      v-model="customer.telNum"
      type="text"
      placeholder="Numéro de téléphone"
    />
    <input v-model="customer.email" type="text" placeholder="e-mail" />
    <button type="button" @click="createCustomer">Créer</button>
  </div>
</template>

<script>
import ApiService from '@/services/apiService'
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric,
} from 'vuelidate/lib/validators'

const dateValidator = helpers.regex(
  'dateValidator',
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
)

export default {
  data() {
    return {
      customer: {},
    }
  },

  methods: {
    async createCustomer() {
      const datas = { ...this.customer }
      datas.birthdate = datas.birthdate.split('/').reverse().join('-')
      const res = await ApiService.create(datas).then((response) => response)
      if (res.status === 201) {
        this.$router.push('/')
      }
    },
  },

  validations: {
    customer: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      lastName: {
        required,
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
      'e-mail': {
        required,
        email,
      },
    },
  },
}
</script>

<style scoped></style>
