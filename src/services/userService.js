
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

export const RegisterUser = async (user) => {
  const res = await axios.post(`${BASE}/users`, user);
  return res.data;
};

export const LoginUser = async (email, password) => {
  try {
    console.log('Fetching all users from:', `${BASE}/users`);
    // Fetch all users and filter on client side
    const res = await axios.get(`${BASE}/users`);
    // console.log('All users fetched:', res.data);
    
    const matchedUsers = res.data.filter(
      user => user.email === email && user.password === password
    );
    // console.log('Matched users:', matchedUsers);
    return matchedUsers;
  } catch (error) {
    console.error('LoginUser Error:', error.message);
    throw error;
  }
};

