import ApiService from '@/services/apiService'

export const state = () => ({
  customersList: [],
})

export const mutations = {
  SET_CUSTOMERS_LIST(state, customers) {
    state.customersList = customers
  },
}

export const actions = {
  fetchAllCustomers({ commit }) {
    return ApiService.getAll().then((response) => {
      commit('SET_CUSTOMERS_LIST', response.data)
    })
  },
}
