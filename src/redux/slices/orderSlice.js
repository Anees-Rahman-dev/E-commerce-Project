
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserOrders,
  getAllOrders,
  changeOrderStatus,
} from '../../services/OrderService';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, thunkAPI) => {
    try {
      return await getUserOrders(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch your orders.'
      );
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, thunkAPI) => {
    try {
      return await getAllOrders();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch all orders.'
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      await changeOrderStatus(id, status);

      return { orderId: id, status };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        'Failed to update order status.'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',

  initialState: {
    orders: [],
    status: 'idle',
    error: null,
    updatingOrderId: null,
    updateError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch the logged-in user's orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Fetch all orders for the admin
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.updatingOrderId = action.meta.arg.id;
        state.updateError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;

        const order = state.orders.find(
          (item) => Number(item.orderId) === Number(orderId)
        );

        if (order) {
          order.status = status;
        }

        state.updatingOrderId = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updatingOrderId = null;
        state.updateError =
          action.payload || action.error.message || 'Status update failed.';
      });
  },
});

export default orderSlice.reducer;
