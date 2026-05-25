
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

export const RegisterUser = async (user) => {
  const res = await axios.post(`${BASE}/users`, user);
  return res.data;
};

export const LoginUser = async (email, password) => {
  try {
    // console.log('Fetching all users from:', `${BASE}/users`);
    const res = await axios.get(`${BASE}/users`);
    
    const matchedUsers = res.data.filter(
      user => user.email === email && user.password === password
    );
    // console.log('Matched users:', matchedUsers);
    return matchedUsers;
  } catch (error) {
    // console.error('LoginUser Error:', error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
    const res = await axios.get(`${BASE}/users`)
    return res.data
}

export const updateUserStatus = async (id,isBlocked) => {
  console.log(id,isBlocked)
  const res = await axios.patch(`${BASE}/users/${id}`,
    {isBlocked}
)       
  return res.data
}