
import { createSlice } from "@reduxjs/toolkit";
import { createUserGroupChat } from "../chat-thunks/create-user-group-chat";

const initialState = {
  groupChat: {
    data: null,
    loading: false,
    error: null,
  },
};

const usersGroupChatSlice = createSlice({
  name: "usersGroupChats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserGroupChat.pending, (state) => {
        state.groupChat.loading = true;
        state.groupChat.error = null;
      })
      .addCase(createUserGroupChat.fulfilled, (state, action) => {
        state.groupChat.loading = false;
        state.groupChat.data = action.payload;
        state.groupChat.error = null;
      })
      .addCase(createUserGroupChat.rejected, (state, action) => {
        state.groupChat.loading = false;
        state.groupChat.error =
          action.payload || action.error.message;
      });
  },
});

export default usersGroupChatSlice.reducer;
