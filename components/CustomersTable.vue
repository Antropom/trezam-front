<template>
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
    <tbody v-if="customers">
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
</template>

<script>
export default {
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat('fr-FR').format(new Date(dateStr)),
  },
  props: {
    customers: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style scoped></style>
