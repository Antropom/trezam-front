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
  border: 2px solid #39b982;
  border-radius: 10px;
}

thead {
  background-color: #39b982;
}

td,
th {
  text-align: center;
  height: 2em;
}

tbody tr:nth-child(2n) {
  background-color: #eee;
}
</style>
