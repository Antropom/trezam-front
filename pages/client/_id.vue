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
  },

  methods: {
    async updateCustomer() {
      const res = await ApiService.update(
        this.$route.params.id,
        this.customer
      ).then((response) => response)
      if (res.status === 201) {
        this.updated = true
        setInterval(() => (this.updated = false), 3000)
      }
    },

    async deleteCustomer() {
      await ApiService.delete(this.$route.params.id).then(
        (response) => response
      )
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
