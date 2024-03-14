import axios from 'axios'

const DATABASE_URL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: DATABASE_URL
})

export async function addOrder(orderInfo) {
  try {
    const res = await api.post('/orders', orderInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function removeOrder(id) {
  try {
    const res = await api.delete(`/orders/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getOrderById(id) {
  try {
    const res = await api.get(`/orders/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function editOrder(id, orderInfo) {
  try {
    const res = await api.patch(`/orders/${id}`, orderInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getAllOrders() {
  try {
    const res = await api.get('/orders')
    return res.data
  } catch (error) {
    alert(error)
  }
}
