<template>
  <div class="container">
    <h1>Liste des clients</h1>
    <CustomersTable :customers="customers" />
  </div>
</template>

<script>
import CustomersTable from '@/components/CustomersTable'
import { mapState } from 'vuex'

export default {
  components: {
    CustomersTable,
  },

  // Fetch all customers from the DB
  async fetch() {
    await this.$store.dispatch('customers/fetchAllCustomers')
  },

  head() {
    return {
      title: '',
    }
  },

  computed: {
    ...mapState({
      customers: (state) => state.customers.customersList,
    }),
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
</style>
