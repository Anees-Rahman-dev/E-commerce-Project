import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, createProduct, removeProduct, updateProduct } from '../../services/productService';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        return await getAllProducts();
    }
);
export const fetchLimitedProducts = createAsyncThunk(
    'products/fetchLimited',
    async (page) => {
        const res = await axios.get(
            `http://localhost:3001/products?_per_page=5&_page=${page}`
        )

        return res.data
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product) => {
        return await createProduct(product)
    }
)

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (products) => {
        return await updateProduct(products.id, products.updatedData)
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        await removeProduct(id)
        return id
    }
)
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        pages: 1,
        currentPage: 1

    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })

            .addCase(editProduct.fulfilled, (state, action) => {

                const index = state.items.findIndex(
                    item => item.id === action.payload.id
                )
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    item => item.id !== action.payload
                )
            })

            .addCase(fetchLimitedProducts.fulfilled, (state, action) => {
                state.items = action.payload.data
                state.pages = action.payload.pages
            })

    },

});

export default productSlice.reducer;