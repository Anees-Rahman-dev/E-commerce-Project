import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/ProductService";


export const fetchProducts = createAsyncThunk(
    'product/fetch',
    async () => {
        const data = await getAllProducts() //waits for all the products
        return data
    }
)
const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        builders.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })
        builders.addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })
    }
})

export default productSlice.reducer

