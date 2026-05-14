import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((found) => found.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity : 1 })
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((it) => it.id !== action.payload)
        },

        updateQuantity: (state, action) => {
            const foundItem = state.items.find(found => found.id === action.payload.id)
            if (foundItem) {
                foundItem.quantity = action.payload.quantity
            }
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const {addToCart,removeFromCart,updateQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;

