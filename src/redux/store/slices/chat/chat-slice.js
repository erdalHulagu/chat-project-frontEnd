import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userChats: [],
    createdGroup: null,
    createdChat: null,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {
        createChat: (state, action) => {
            state.createdChat = action.payload
        },

        createGroup: (state, action) => {
            state.createdGroup = action.payload

        },
        chats: (state, action) => {
            state.userChats = action.payload
        }
    }
});
export const { createChat, createGroup, chats } = chatSlice.actions;
export default chatSlice.reducer;




