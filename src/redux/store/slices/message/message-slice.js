import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    messages: [],
    newMessage: null,
}

export const messageSlice = createSlice({
    name: "message",
    initialState,

    reducers: {
        allMessages: (state, action) => {
            state.messages = action.payload
        },

        createNewMessage: (state, action) => {
            state.newMessage = action.payload

        },
       
    }
});
export const { createNewMessage, allMessages } = messageSlice.actions;
export default messageSlice.reducer;

