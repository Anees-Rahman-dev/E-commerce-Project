import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers,updateUserStatus } from "../../services/userService";
import { act } from "react";
import { getById } from "../../services/userService";
import { ArrowUpWideNarrow } from "lucide-react";

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        return await getAllUsers()
    }
)

export const blockUser = createAsyncThunk (
    'users/blockUser',
    async (id, {dispatch}) => {
        // console.log(id)
       const success = await updateUserStatus(id);

       if(success)
        {
         await dispatch(fetchAllUsers()).unwrap();
         return success;
        }
        else
        {
        throw new Error('Failed to update user status');
        }

    }
)

export const unBlockUser = createAsyncThunk(
    'users/unBlockUser',
    async (id, { dispatch }) => {
        
        const success = await updateUserStatus(id);

        if(success)
        {
        await dispatch(fetchAllUsers()).unwrap();
        return success;
        }
        else
        {
        throw new Error('Failed to update user status');
        }
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
             console.log("Updated users:", action.payload);
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
                user => user.userId === action.payload.userId
            )
            if(index !== -1){//findIndex() returns -1 if it cannot find a matching item.
           // "Only update the product if it exists in the Redux array."
                state.users[index] = action.payload
            }
        })

        .addCase(unBlockUser.fulfilled, (state,action) => {
            console.log(action.payload)
            const index = state.users.findIndex(
                user => user.userId === action.payload.userId
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