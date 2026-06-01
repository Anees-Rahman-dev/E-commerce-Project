

import { createSlice } from "@reduxjs/toolkit";
import { setCartDb } from "../../services/CartService";

const getStoredUserId = () => {
  try {
    const u = JSON.parse(localStorage.getItem("user"));
    return u?.id || null;
  } catch {
    return null;
  }
};

const storedCart = (() => {
  const uid = getStoredUserId();
  try {
    if (uid) return JSON.parse(localStorage.getItem(`cart_${uid}`)) || [];
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
})();

export const saveCart = (items) => {
  try {
    const uid = getStoredUserId();
    if (uid) localStorage.setItem(`cart_${uid}`, JSON.stringify(items));

    localStorage.setItem("cart", JSON.stringify(items));

  } catch (err) {
    console.warn("Failed to save cart to localStorage", err);
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: storedCart,
  },

  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      // console.log(action.payload)

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1, //initially
        }); 
        
      }

      saveCart(state.items);
  
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);  //keeps only true

      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },

    replaceCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      saveCart(state.items);
      // console.log(action.payload)
      // console.log(state.items)
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, replaceCart } = cartSlice.actions;
export default cartSlice.reducer;