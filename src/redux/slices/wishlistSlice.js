import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice ( {
    name : 'wishlist',
    initialState : {
        wishlist : []
    },

    reducers : {
    addToWishList : (state,action) => {

    },
    removeFromWisList : (state,action) => {

    }
    }
})

 export const {addToWishList,removeFromWisList} = wishListSlice.actions;
 export default wishListSlice.reducer
