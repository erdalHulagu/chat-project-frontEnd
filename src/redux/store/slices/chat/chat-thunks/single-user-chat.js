import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "../../../../../api/service/chat-service";

export const singleUserChat = createAsyncThunk(
  "chats/singleChat",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await createChat(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Sohbet oluşturulamadı."
      );
    }
  }
);