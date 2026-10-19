
import api from './api';

export const getMyAddresses = async () => {
  const res = await api.get('/Address');
  return res.data;
};

export const getAddressById = async (addressId) => {
  const res = await api.get(`/Address/${addressId}`);
  return res.data;
};

export const addAddress = async (address) => {
  const res = await api.post('/Address', address);
  return res.data;
};

export const updateAddress = async (addressId, address) => {
  const res = await api.put(`/Address/${addressId}`, address);
  return res.data;
};

export const deleteAddress = async (addressId) => {
  const res = await api.delete(`/Address/${addressId}`);
  return res.data;
};
