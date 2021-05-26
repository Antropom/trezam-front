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
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.birthdate | formatDate }}</td>
        <td>{{ customer.telNum }}</td>
        <td>{{ customer.email }}</td>
        <td>
          <nuxt-link :to="`client/${customer._id}`"
            >Modifier la fiche</nuxt-link
          >
        </td>
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

<style scoped>
table {
  width: 100%;
}

tr {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
}

tr:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

td {
  text-align: center;
}
</style>
