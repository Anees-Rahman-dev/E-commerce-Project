import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlices'
import productReducer from './slices/ProductSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import wishListReducer from './slices/wishlistSlice'
import userReducer from './slices/userSlice'
export const store = configureStore ({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        products : productReducer,
        orders : orderReducer,
        wishlist : wishListReducer,
        users : userReducer

    }
})

