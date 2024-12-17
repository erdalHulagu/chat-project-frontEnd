import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error } from "../../../../../helper/swal";

// export const updateUsers = createAsyncThunk('user/updateUsers', async (values, { rejectWithValue }) => {
//     try {
//       const respSearch = await updateUser(values);
//       console.log("Token to store:", respSearch.data.token);
//       encryptedLocalStorage.setItem("token", respSearch.data.token);
//       console.log("serachUser",respSearch.data);
//       return respSearch.data;
//     } catch (err) {
//       return rejectWithValue(error(err.response.data));
//     }
//   });
export const updateUsers = createAsyncThunk(
  "user/updateUsers",
  async (values, { rejectWithValue }) => {
    try {
      const response = await updateUser(values);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || "Failed to update user");
    }
  }
);