import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserOrders,getAllOrders,changeOrderStatus} from "../../services/OrderService";

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

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllProducts',
  async () => {
    return await getAllOrders()
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({id,status}) => {
    return await changeOrderStatus(id,status)
  }
)

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
      })

      .addCase(fetchAllOrders.fulfilled,(state,action) => {
        state.orders = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state,action) => {
        const index = state.orders.findIndex(
          order => order.id === action.payload.id
        )
        if(index !== -1){
          state.orders[index] = action.payload
        }
      })
  },
});

export default orderSlice.reducer;