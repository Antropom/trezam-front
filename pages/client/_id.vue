<template>
  <div>
    <h1>Modifier la fiche client</h1>
    <input v-model="customer.firstName" type="text" placeholder="Prénom" />
    <input v-model="customer.lastName" type="text" placeholder="Nom" />
    <client-only>
      <date-picker
        v-model="customer.birthdate"
        placeholder="Date de naissance (jj/mm/aaaa)"
        format="dd/MM/yyyy"
      />
    </client-only>
    <input
      v-model="customer.telNum"
      type="text"
      placeholder="Numéro de téléphone"
    />
    <input v-model="customer.email" type="text" placeholder="e-mail" />
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

  async fetch() {
    this.customer = await ApiService.getOne(this.$route.params.id).then(
      (response) => response.data.result
    )
  },
}
</script>

<style scoped></style>
