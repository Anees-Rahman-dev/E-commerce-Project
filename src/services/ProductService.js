
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
  await api.put(`/Product/${id}`, updateData);
//   The update function doesn't try to return a response body because your backend returns 204 No Content.
};


export const removeProduct = async (id) => {
    await api.delete(`/Product/${id}`)
  
}

export const updateProductStock = async (id,data) => {
    const res = await api.put(`/Product/${id}`, data)
    return res.data
}