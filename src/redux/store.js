import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlices'
import productReducer from './slices/ProductSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore ({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        products : productReducer,
        orders : orderReducer

    }
})

