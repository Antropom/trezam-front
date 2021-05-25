<template>
  <div>
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :class="{
        'error-border': error,
      }"
    />
    <p v-if="error" class="error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    value: {
      get() {
        return this.$store.state.customers.currentCustomer[this.fieldName]
      },
      set(val) {
        const payload = { key: this.fieldName, value: val }
        this.$store.commit('customers/SET_CURRENT_CUSTOMER_KEY', payload)
      },
    },
  },
}
</script>

<style scoped></style>
