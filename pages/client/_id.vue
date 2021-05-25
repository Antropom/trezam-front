<template>
  <div>
    <h1>Modifier la fiche client</h1>
    <input
      v-model="customer.firstName"
      type="text"
      placeholder="Prénom"
      :class="{
        'error-border':
          $v.customer.firstName.$dirty && $v.customer.firstName.$invalid,
      }"
      @blur="$v.customer.firstName.$touch()"
    />
    <p
      v-if="$v.customer.firstName.$dirty && $v.customer.firstName.$invalid"
      class="error"
    >
      Veuillez saisir un prénom
    </p>
    <input
      v-model="customer.lastName"
      type="text"
      placeholder="Nom"
      :class="{
        'error-border':
          $v.customer.lastName.$dirty && $v.customer.lastName.$invalid,
      }"
      @blur="$v.customer.lastName.$touch()"
    />
    <p
      v-if="$v.customer.lastName.$dirty && $v.customer.lastName.$invalid"
      class="error"
    >
      Veuillez saisir un nom
    </p>
    <input
      v-model="customer.birthdate"
      placeholder="Date de naissance (jj/mm/aaaa)"
      :class="{
        'error-border':
          $v.customer.birthdate.$dirty && $v.customer.birthdate.$invalid,
      }"
      @blur="$v.customer.birthdate.$touch()"
    />
    <p
      v-if="$v.customer.birthdate.$dirty && $v.customer.birthdate.$invalid"
      class="error"
    >
      Veuillez saisir une date de naissance
    </p>
    <input
      v-model="customer.telNum"
      type="text"
      placeholder="Numéro de téléphone"
      :class="{
        'error-border':
          $v.customer.telNum.$dirty && $v.customer.telNum.$invalid,
      }"
      @blur="$v.customer.telNum.$touch()"
    />
    <p
      v-if="$v.customer.telNum.$dirty && $v.customer.telNum.$invalid"
      class="error"
    >
      Veuillez saisir un numéro de téléphone
    </p>
    <input
      v-model="customer.email"
      type="text"
      placeholder="e-mail"
      :class="{
        'error-border': $v.customer.email.$dirty && $v.customer.email.$invalid,
      }"
      @blur="$v.customer.email.$touch()"
    />
    <p
      v-if="$v.customer.email.$dirty && $v.customer.email.$invalid"
      class="error"
    >
      Veuillez saisir une adresse e-mail
    </p>
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
import ApiService from '@/services/apiService'
import {
  required,
  minLength,
  maxLength,
  alpha,
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
      delConfirmationOpened: false,
      updated: false,
    }
  },

  async fetch() {
    this.customer = await ApiService.getOne(this.$route.params.id).then(
      (response) => response.data.result
    )
    this.customer.birthdate = Intl.DateTimeFormat('fr-FR').format(
      new Date(this.customer.birthdate)
    )
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
