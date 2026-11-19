
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createGroupChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";

export const createUserGroupChat = createAsyncThunk(
  "chats/groupChat",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createGroupChat(values);

      if (response.data?.token) {
        encryptedLocalStorage.setItem(
          "token",
          response.data.token
        );
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Grup oluşturulamadı."
      );
    }
  }
);
