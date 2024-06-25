import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersChats } from "../chat-thunks/get-all-users-chats";

const initialState = {
    allChats: {
        data: null,
        loading: false,
        error: null,
    }
};
const getAllUsersChatsSlice= createSlice({
    name: "allUsersChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersChats.pending, (state) => {
                state.allChats.loading = true;
                state.allChats.error = null;
            })
            .addCase(getAllUsersChats.fulfilled, (state, action) => {
                state.allChats.loading = false;
                state.allChats.data = action.payload;
            })
            .addCase(getAllUsersChats.rejected, (state, action) => {
                state.allChats.loading = false;
                state.allChats.error = action.payload;
            });
    },
});

export default getAllUsersChatsSlice.reducer;