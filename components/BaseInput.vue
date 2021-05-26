<template>
  <div class="flex-col">
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :class="{
        'error-border': error || ($v.value.$invalid && $v.value.$dirty),
      }"
      @blur="$v.value.$touch()"
    />
    <p v-if="error || ($v.value.$invalid && $v.value.$dirty)" class="error">
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

  validations: {
    value: {
      required,
    },
  },
}
</script>

<style scoped>
input {
  width: 250px;
  height: 50px;
  border: 2px solid #39b982;
  border-radius: 10px;
  font-size: 1em;
  margin: 10px;
  padding-left: 10px;
  outline: none;
}

.error-border {
  border: 2px solid #d9534f;
}

p {
  position: relative;
  top: -5px;
}
</style>
