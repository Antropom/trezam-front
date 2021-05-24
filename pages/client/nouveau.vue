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
}
</script>

<style scoped></style>
