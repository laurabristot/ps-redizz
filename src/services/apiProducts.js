import axios from 'axios'

const DATABASE_URL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: DATABASE_URL
})

export async function addProduct(productInfo) {
  try {
    const res = await api.post('/products', productInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function removeProduct(id) {
  try {
    const res = await api.delete(`/products/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getProductById(id) {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function editProduct(id, productInfo) {
  try {
    const res = await api.patch(`/products/${id}`, productInfo)
    return res.data
  } catch (error) {
    alert(error)
  }
}

export async function getAllProducts() {
  try {
    const res = await api.get('/products')
    return res.data
  } catch (error) {
    alert(error)
  }
}
