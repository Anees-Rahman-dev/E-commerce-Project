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



import api from './api';

export const LoginUser = async (email, password) => {
  const res = await api.get('/users', {
    params: {
      email: email,
      password: password
    }
  });

  return res.data;
};

export const RegisterUser = async (user) => {
  const res = await api.post('/users', user);

  return res.data;
};