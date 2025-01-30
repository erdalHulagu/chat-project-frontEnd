import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  userRequest: {},
  imageUrl: null,
};

const userUpdateSlice = createSlice({
  name: "updateCurrentUser",
  initialState,
  reducers: {
    updateRequest: (state) => {
      state.isUserLogin = true;
    },
    updateSuccess: (state, action) => {
      state.isUserLogin = true;
      state.userRequest = action.payload.user; // Güncellenen kullanıcı verisi
      state.imageUrl = action.payload.profileImage || null; // Profil resmi ID değil, URL veya ID olabilir
    },
    updateImageURL: (state, action) => {
      state.imageUrl = action.payload; 
    },
    updateFailed: (state) => {
      state.isUserLogin = false;
      state.userRequest = {};
      state.imageUrl = null;
    },
  },
});

export const { updateSuccess, updateFailed, updateRequest, updateImageURL } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;