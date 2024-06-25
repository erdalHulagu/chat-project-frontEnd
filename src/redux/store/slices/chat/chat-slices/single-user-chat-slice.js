import { createSlice } from "@reduxjs/toolkit";
import { singleUserChat } from "../chat-thunks/single-user-chat";

const initialState = {
    singleChat: {
        data: null,
        loading: false,
        error: null,
    }
};

const singleUserChatSlice = createSlice({
    name: "usersSingleChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Single User Chat
        builder
            .addCase(singleUserChat.pending, (state) => {
                state.singleChat.loading = true;
                state.singleChat.error = null;
            })
            .addCase(singleUserChat.fulfilled, (state, action) => {
                state.singleChat.loading = false;
                state.singleChat.data = action.payload;
            })
            .addCase(singleUserChat.rejected, (state, action) => {
                state.singleChat.loading = false;
                state.singleChat.error = action.payload;
            });

    },
});

export default singleUserChatSlice.reducer;