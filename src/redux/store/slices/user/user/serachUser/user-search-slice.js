import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "./user-search-action";

const initialState = {
  reqUser: {},
  searchResults: [],
};

export const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.searchResults = [];
    });
  },
});

export default userSearchSlice.reducer;
