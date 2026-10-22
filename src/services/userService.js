
import api from './api';



export const RegisterUser = async (user) => {
  const res = await api.post('/Auth/register', user);
  return res.data;
};


export const LoginUser = async (email, password) => {
  
  const response = await api.post('/Auth/login', {
    email,
    password,
  });

  const token = response.data.token;
  // console.log(token);

  // Temporarily save the token so we can fetch the logged-in user
  localStorage.setItem('token', token);

  const userResponse = await api.get('/User/GetMe', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    token,
    user: userResponse.data,
  };
};

export const getAllUsers = async () => {

    const res = await api.get('AdminDashboard/users')
   
    return res.data
}

export const updateUserStatus = async (id) => {
  const res = await api.put(`AdminDashboard/users/${id}/block`);

  console.log("Block API response:", res.status, res.data);

  return res.data;
}

export const getById = async (id) => {
  const res = await api.get(`AdminDashboard/users/${id}`);
  return res.data
  // console.log(res.data)
}