
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  newMessage: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    allMessages: (state, action) => {
      state.messages = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    createNewMessage: (state, action) => {
      const newMessage = action.payload;

      if (!newMessage) return;

      state.newMessage = newMessage;

      const alreadyExists = state.messages.some(
        (message) => message.id === newMessage.id
      );

      if (!alreadyExists) {
        state.messages.push(newMessage);
      }
    },

    clearMessages: (state) => {
      state.messages = [];
      state.newMessage = null;
    },
  },
});

export const {
  createNewMessage,
  allMessages,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
