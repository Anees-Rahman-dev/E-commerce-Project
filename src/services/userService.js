// import axios from 'axios'

// const USER_API = 'http://localhost:3001/users';

// const RegisterUser = async (user) => {
//  const res =  await axios.post(USER_API,user)
//     return res.data
//     // console.log(res.data)
// }

// const LoginUser = async (email,password) => {
//     const res = await axios.get(USER_API, {
//         params: {
//            email :String(email) , 
//             password : password}  //http://localhost:3001/users?email=test@gmail.com&password=1234
//     });

//   console.log(res.config.url)
//   console.log(res.data)
//     return res.data
// }


// export { LoginUser, RegisterUser }



// import api from './api';

// export const LoginUser = async (email, password) =>
//   (await api.get(`/users?email=${email}&password=${password}`)).data;

// export const RegisterUser = async (user) =>
//   (await api.post('/users', user)).data;


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
    // (json-server doesn't support multiple query parameter filters)
    const res = await axios.get(`${BASE}/users`);
    console.log('All users fetched:', res.data);
    
    // Filter users by email and password
    const matchedUsers = res.data.filter(
      user => user.email === email && user.password === password
    );
    console.log('Matched users:', matchedUsers);
    return matchedUsers;
  } catch (error) {
    console.error('LoginUser Error:', error.message);
    throw error;
  }
};

