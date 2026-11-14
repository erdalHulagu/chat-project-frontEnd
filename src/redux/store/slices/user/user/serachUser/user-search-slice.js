
import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "./user-search-action";

const initialState = {
  reqUser: {},
  searchResults: [],
  loading: false,
  error: null,
};

export const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.searchResults = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.searchResults = [];
        state.error = action.payload || "Kullanıcı araması başarısız.";
      });
  },
});

export const { clearSearchResults } = userSearchSlice.actions;

export default userSearchSlice.reducer;
