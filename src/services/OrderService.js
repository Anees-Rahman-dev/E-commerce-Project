import api from './api';

export const PlaceNewOrder = async (order) =>
  (await api.post('/Order', order)).data;//regular cart checkout.

export const PlaceBuyNowOrder = async (order) =>
  (await api.post('/Order/buy-now', order)).data;//selected product and quantity only.

export const getUserOrders = async (userId) =>
  (await api.get(`/Order?userId=${userId}`)).data;

export const getAllOrders = async () =>
  (await api.get(`/Order/All`)).data;

export const changeOrderStatus = async (id, status) =>
  (await api.put(`/Order/${id}/status`, status , {
    headers : {
      'Content-Type' : 'application/json',
    },
  })).data