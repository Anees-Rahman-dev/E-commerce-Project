import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { removeWish } from "../../services/CartService";

export const deleteWish = createAsyncThunk(
    'WishList/deleteWish',
    async (id) => {
        return await removeWish(id)
    }
)
const wishListSlice = createSlice ( {
    name : 'wishlist',
    initialState : {
        wishlist : []
    },

    reducers : {
    addToWishList : (state,action) => {
        const existingItem = state.wishlist.find(item => item.id === action.payload.id);
        
        if (!existingItem) {
            state.wishlist.push(action.payload);
        } else {
            
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
        }
    },
    removeFromWisList : (state,action) => {
        state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
    }
    },

    // extraReducers : (buiders) => {
    //     buiders
    //     .addCase(deleteWish.fulfilled,(state,action) => {
    //         state.wishlist = state
    //     })
    // }
})

 export const {addToWishList,removeFromWisList} = wishListSlice.actions;
 export default wishListSlice.reducer
