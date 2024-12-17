import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";


export const updateUsers = createAsyncThunk(
  "user/updateUsers",
  async (values, { rejectWithValue }) => {
    try {
      const respUpDateData = await updateUser(values); // API call
      encryptedLocalStorage.setItem("token", respUpDateData.data.token);
      toast(respUpDateData.data.message || "Profile updated successfully!");
      return respUpDateData.data; // Return updated user data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update user"
      );
    }
  }
);