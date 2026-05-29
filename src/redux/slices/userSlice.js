import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers,updateUserStatus } from "../../services/userService";
import { act } from "react";
import { getById } from "../../services/userService";

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        return await getAllUsers()
    }
)

export const blockUser = createAsyncThunk (
    'users/blockUser',
    async (id) => {
        // console.log(id)
        return await updateUserStatus(id,true)
    }
)

export const unBlockUser = createAsyncThunk(
    'users/unBlockUser',
    async (id) => {
        return await updateUserStatus(id,false)
        // console.log(id)
    }
)

export const getUserById = createAsyncThunk(
    'users/getUserById',
    async (id) => {
return await getById(id)
    }
)

const userSlice = createSlice({
    name : 'users',
    initialState : {
        users : [],
        singleUser : null,
        status : 'idle',
        error : null
    },
    reducers : {},

    extraReducers : (builder) => {
        builder

        .addCase(fetchAllUsers.fulfilled, (state,action) => {
            state.users = action.payload;
            state.status ='succeeded'
        })

        .addCase(fetchAllUsers.pending, (state,action) => {
            state.status = 'loading'
        })

        .addCase(fetchAllUsers.rejected, (state,action) => {
            state.error = action.error.message;
            state.status = 'failed'
        })


        .addCase(blockUser.fulfilled, (state,action) => {
            //   console.log(action.payload)
            const index = state.users.findIndex(
                user => user.id === action.payload.id
            )
            if(index !== -1){
                state.users[index] = action.payload
            }
        })

        .addCase(unBlockUser.fulfilled, (state,action) => {
            console.log(action.payload)
            const index = state.users.findIndex(
                user => user.id === action.payload.id
            )
            if(index !== -1){
                state.users[index] = action.payload
            }
        })

        .addCase(getUserById.fulfilled,(state,action) => {
            state.singleUser = action.payload
        })
    },
})

export default userSlice.reducer