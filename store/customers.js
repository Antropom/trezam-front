import ApiService from '@/services/apiService'

export const state = () => ({
  customers: [],
})

export const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers
  },
}

export const actions = {
  fetchAllCustomers({ commit }) {
    return ApiService.getAll().then((response) => {
      commit('SET_CUSTOMERS', response.data)
    })
  },
}
