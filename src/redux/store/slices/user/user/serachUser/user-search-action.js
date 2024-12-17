import { searchUser } from "../../../../../../api/service/user-service"
import { encryptedLocalStorage } from "../../../../../../helper/auth-token/encrypt-storage";
import { error } from "../../../../../../helper/swal";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchUsers = createAsyncThunk('user/searchUsers', async (values, { rejectWithValue }) => {
  try {
    const respSearch = await searchUser(values);
    console.log("Token to store:", respSearch.data.token);
    encryptedLocalStorage.setItem("token", respSearch.data.token);
    console.log("serachUser",respSearch.data);
    return respSearch.data;
  } catch (err) {
    return rejectWithValue(error(err.response.data));
  }
});
