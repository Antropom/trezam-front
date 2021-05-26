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
