import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { GetUsersOrder } from "../../services/OrderService";
import { act } from "react";

export const fetchOrders = createAsyncThunk(
    'fetch/orders',
    async ( ) => {
        console.log()
        const res = await GetUsersOrder( )
        // console.log(userId)
        return res.data
    }
)
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: [],
        status: 'idle',
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.status = 'Loading...'
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.order = action.payload;
            state.status = 'Succeeded'
        })
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.status = 'Failed'
            state.error = action.error.message
        })
    }
})
export default orderSlice.reducer