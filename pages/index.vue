<template>
  <div class="container">
    <h1>Liste des clients</h1>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Date de naissance</th>
          <th>Numéro de téléphone</th>
          <th>e-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer._id">
          <th>{{ customer.lastName }}</th>
          <th>{{ customer.firstName }}</th>
          <th>{{ customer.birthdate | formatDate }}</th>
          <th>{{ customer.telNum }}</th>
          <th>{{ customer.email }}</th>
          <th>
            <nuxt-link :to="`client/${customer._id}`"
              >Modifier la fiche</nuxt-link
            >
          </th>
        </tr>
      </tbody>
    </table>
    <nuxt-link to="client/nouveau">Ajouter un client</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat('fr-FR').format(new Date(dateStr)),
  },

  async fetch() {
    await this.$store.dispatch('customers/fetchAllCustomers')
  },

  computed: {
    ...mapState({
      customers: (state) => state.customers.customersList,
    }),
  },
}
</script>
