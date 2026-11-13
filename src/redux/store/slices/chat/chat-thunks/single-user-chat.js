
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "../../../../../api/service/chat-service";

export const singleUserChat = createAsyncThunk(
  "chats/singleChat",
  async (userId, { rejectWithValue }) => {
    try {
      const respChat = await createChat(userId);

      console.log("Created chat:", respChat.data);

      return respChat.data;
    } catch (err) {
      console.error("Create chat error:", err);

      return rejectWithValue(
        err.response?.data || err.message || "Could not create chat"
      );
    }
  }
);
