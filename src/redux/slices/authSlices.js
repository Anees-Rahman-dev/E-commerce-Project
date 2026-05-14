
// import { createSlice } from '@reduxjs/toolkit'

// const parseStoredUser = () => {
//     try {
//         const storedUser = localStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     } catch {
//         localStorage.removeItem("user"); // clear the bad value
//         return null;
//     }
// };

// const storedUser = parseStoredUser()
// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user : storedUser,
//         isAuthenticated : !!storedUser
//     },
//     reducers: {
//         loginSuccess: (state, action) => {
//             state.user = action.payload
//             state.isAuthenticated = true;
//             localStorage.setItem("user", JSON.stringify(action.payload))
//             console.log(action.payload)
//         },
//         logOut: (state) => {
//             state.user = null
//             state.isAuthenticated = false
//             localStorage.removeItem('user')
//         }
//     }
// }) 
// export const {loginSuccess,logOut} = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const storedUser = getStoredUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;