import axios from 'axios'

const DATABASE_URL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: DATABASE_URL
})

export async function addClient(clientInfo) {
  try {
    const res = await api.post('/clients', clientInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function removeClient(id) {
  try {
    const res = await api.delete(`/clients/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getClientById(id) {
  try {
    const res = await api.get(`/clients/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function editClient(id, clientInfo) {
  try {
    const res = await api.patch(`/clients/${id}`, clientInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getAllClients() {
  try {
    const res = await api.get('/clients')
    return res.data
  } catch (error) {
    alert(error)
  }
}
