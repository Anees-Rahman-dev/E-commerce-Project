
import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data) return null;
    const user = JSON.parse(data);
    // console.log('Restored user from localStorage:', user);
    return user;
  } catch (err) {
    // console.error('Error parsing stored user:', err);
    localStorage.removeItem("user");
    return null;
  }
};

const storedUser = getStoredUser();
// console.log('Auth initial state - stored user:', storedUser);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(user));
      // console.log('Login success - User stored:', user);
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Only remove the global user marker on logout. Per-user data is persisted
      // under namespaced keys (e.g. `cart_<userId>`, `wishlist_<userId>`) so we
      // keep those intact across logins. Clearing in-memory slices is handled
      // by dispatching appropriate actions (e.g. `clearCart`).
      localStorage.removeItem("user");
      console.log('User logged out');
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;