<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Date de naissance</th>
        <th>Numéro de téléphone</th>
        <th>e-mail</th>
        <th></th>
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
  name: 'CustomerTable',

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
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 2px solid #dc8331;
  border-radius: 10px;
}

thead {
  background-color: #dc8331;
  color: #353531;
}

td,
th {
  text-align: center;
  height: 2em;
}

tbody tr:nth-child(2n) {
  background-color: #b0bea6;
  color: #353531;
}

tbody tr:nth-child(2n) a {
  color: #353531;
}
</style>
