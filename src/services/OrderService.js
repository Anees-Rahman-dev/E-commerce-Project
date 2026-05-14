import api from './api';

export const PlaceNewOrder = async (order) =>
  (await api.post('/orders', order)).data;


export const getUserOrders = async (userId) =>
  (await api.get(`/orders?userId=${userId}`)).data;