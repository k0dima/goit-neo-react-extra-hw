import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization
}

export const signUp = async (data) => {
  const response = await api.post('/users/signup', data)
  return response.data
}

export const signIn = async (data) => {
  const response = await api.post('/users/login', data)
  return response.data
}

export const signOut = async () => {
  await api.post('/users/logout')
}

export const getCurrentUser = async () => {
  const response = await api.get('/users/current')
  return response.data
}

export const getContacts = async () => {
  const response = await api.get('/contacts')
  return response.data
}

export const createContact = async (data) => {
  const response = await api.post('/contacts', data)
  return response.data
}

export const removeContact = async (contactId) => {
  const response = await api.delete(`/contacts/${contactId}`)
  return response.data
}
