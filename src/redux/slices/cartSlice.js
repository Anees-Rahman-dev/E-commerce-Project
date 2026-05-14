
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { items: [] },
//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.items.find(i => i.id === action.payload.id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 }); // ✅ fixed
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(i => i.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find(i => i.id === action.payload.id);
//       if (item) item.quantity = action.payload.quantity;
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: storedCart,
  },

  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );

      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;