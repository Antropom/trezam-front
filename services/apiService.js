import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.baseUrl}/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default {
  getAll() {
    return apiClient.get(`customers`)
  },
  getOne(id) {
    return apiClient.get(`customers/${id}`)
  },
  create(datas) {
    return apiClient.post(`customers`, datas)
  },
  update(id, datas) {
    return apiClient.put(`customers/${id}`, datas)
  },
  delete(id) {
    return apiClient.delete(`customers/${id}`)
  },
}
