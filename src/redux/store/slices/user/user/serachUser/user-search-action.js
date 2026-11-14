
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchUser } from "../../../../../../api/service/user-service";

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (values, { rejectWithValue }) => {
    try {
      const response = await searchUser(values);

      return Array.isArray(response.data)
        ? response.data
        : [];
    } catch (err) {
      console.error("User search error:", err);

      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Kullanıcı araması başarısız."
      );
    }
  }
);
