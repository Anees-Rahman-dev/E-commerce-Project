import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserOrders } from "../../services/OrderService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, thunkAPI) => {
    try {
      return await getUserOrders(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;