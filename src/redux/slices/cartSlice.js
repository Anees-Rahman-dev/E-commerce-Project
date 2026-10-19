
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCartFromDb,
  updateCartInDb,
  removeCartFromDb,
} from "../../services/CartService";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const data = await getCartFromDb();

      return data.map((item) => ({
        ...item,
        id: item.productId,
        name: item.productName,
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Failed to fetch cart."
      );
    }
  }
);

export const changeCartQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      await updateCartInDb(cartItemId, quantity);
      return { cartItemId, quantity };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Failed to update quantity."
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async (cartItemId, thunkAPI) => {
    try {
      await removeCartFromDb(cartItemId);
      return cartItemId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Failed to remove item."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(changeCartQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (item) =>
            Number(item.cartItemId) ===
            Number(action.payload.cartItemId)
        );

        if (item) {
          item.quantity = action.payload.quantity;
          item.total = item.price * item.quantity;
        }
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) =>
            Number(item.cartItemId) !== Number(action.payload)
        );
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  replaceCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
