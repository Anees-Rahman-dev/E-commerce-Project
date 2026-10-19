
import api from './api';

export const getMyAddresses = async () =>
  (await api.get('/Address')).data;

export const getAddressById = async (addressId) =>
  (await api.get(`/Address/${addressId}`)).data;

export const addAddress = async (address) =>
  (await api.post('/Address', address)).data;

export const updateAddress = async (addressId, address) =>
  (await api.put(`/Address/${addressId}`, address)).data;

export const deleteAddress = async (addressId) =>
  (await api.delete(`/Address/${addressId}`)).data;
