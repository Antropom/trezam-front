<template>
  <div>
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :class="{
        'error-border': $v.value.$dirty && $v.value.$invalid,
      }"
      @blur="$v.value.$touch()"
    />
    <p v-if="$v.value.$dirty && $v.value.$invalid" class="error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

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

  validations: {
    value: { required },
  },
}
</script>

<style scoped></style>
