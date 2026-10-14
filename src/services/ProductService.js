
import api from './api';

export const getAllProducts = async () => {
    const res = await api.get('/Product')
    return res.data
}

export const getProductById = async (id) => {
    const res = await api.get(`/Product/${id}`)
    return res.data
}

export const createProduct = async (productData) => {
    const res = await api.post(`/Product`, productData)
    return res.data
}

export const updateProduct = async (id, updateData) => {
    const res = await api.put(`/Product/${id}`,updateData);
    return res.data
    
    // console.log(res.data)
}

export const removeProduct = async (id) => {
    await api.delete(`/Product/${id}`)
  
}

export const updateProductStock = async (id,data) => {
    const res = await api.patch(`/Product/${id}`, data)
    return res.data
}