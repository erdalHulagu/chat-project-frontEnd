import { createSlice } from "@reduxjs/toolkit";
import { updateUsers } from "./update-user-action";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.user = action.payload; // Update user state with updated data
        state.loading = false;
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateState } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;