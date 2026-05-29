import { createSlice } from "@reduxjs/toolkit";

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
    }
})

 export const {addToWishList,removeFromWisList} = wishListSlice.actions;
 export default wishListSlice.reducer
