
import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");

    return data ? JSON.parse(data) : null;

    // console.log('Restored user from localStorage:', user);

  } catch (err) {
    // console.error('Error parsing stored user:', err);
    localStorage.removeItem("user");
    return null;
  }
};

const getStoredToken = () => localStorage.getItem('token');

const storedUser = getStoredUser();
// console.log('Auth initial state - stored user:', storedUser);

const storedToken = getStoredToken();

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: storedUser,
    token : storedToken,
    isAuthenticated: !!storedToken,
  },
  reducers: {
    loginSuccess: (state, action) => {

      const {user, token} = action.payload;
       
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      // console.log('Login success - User stored:', user);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Only remove the global user marker on logout. Per-user data is persisted
      // under namespaced keys (e.g. `cart_<userId>`, `wishlist_<userId>`) so we
      // keep those intact across logins. Clearing in-memory slices is handled
      // by dispatching appropriate actions (e.g. `clearCart`).
      
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // console.log('User logged out');
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;