import ApiService from '@/services/apiService'

export const state = () => ({
  // All the customers from the DB
  customersList: [],

  currentCustomer: {},

  //  Differents fields names and props used to generate the form
  customerFields: {
    firstName: {
      errorMessage: 'Veuillez saisir un prénom',
      placeholder: 'Prénom',
    },
    lastName: {
      errorMessage: 'Veuillez saisir un nom',
      placeholder: 'Nom',
    },
    birthdate: {
      errorMessage: 'Veuillez saisir la date de naissance',
      placeholder: 'Date de naissance (jj/mm/aaaa)',
    },
    telNum: {
      errorMessage: 'Veuillez saisir un numéro de téléphone',
      placeholder: 'Numéro de téléphone',
    },
    email: {
      errorMessage: 'Veuillez saisir une adresse e-mail',
      placeholder: 'e-mail',
    },
  },
})

export const mutations = {
  SET_CUSTOMERS_LIST(state, customers) {
    state.customersList = customers
  },

  SET_CURRENT_CUSTOMER(state, customer) {
    state.currentCustomer = customer
  },

  SET_CURRENT_CUSTOMER_KEY(state, payload) {
    state.currentCustomer[payload.key] = payload.value
  },
}

export const actions = {
  fetchAllCustomers({ commit }) {
    return ApiService.getAll().then((response) => {
      commit('SET_CUSTOMERS_LIST', response.data)
    })
  },

  async fetchCurrentCustomer({ commit }, id) {
    const res = await ApiService.getOne(id)
      .then((response) => {
        return response.data.result
      })
      .catch((error) => {
        throw new Error(error)
      })

    // Formating birthdate to it can be read
    res.birthdate = Intl.DateTimeFormat('fr-FR').format(new Date(res.birthdate))
    commit('SET_CURRENT_CUSTOMER', res)
  },
}
