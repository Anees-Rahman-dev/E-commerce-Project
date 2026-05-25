
import api from './api';

export const getAllProducts = async () => {
    const res = await api.get('/products')
    return res.data
}

export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`)
    return res.data
}

export const createProduct = async (productData) => {
    const res = await api.post(`/products`, productData)
    return res.data
}

export const updateProduct = async (id, updateData) => {
    const res = await api.patch(
        `/products/${id}`,
        updateData
    )
    return res.data
}

export const removeProduct = async (id) => {
    await api.delete(`/products/${id}`)
  
}