import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  user: {},
  imageId: "",
  errorMessage: "",
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
      state.user = action.payload.user; // Güncellenen kullanıcı verisi
      state.imageId = action.payload.profileImage || ""; // Profil resmi ID'si
    },
    updateFailed: (state, action) => {
      state.isUserLogin = false;
      state.user = {};
      state.imageId = "";
      state.errorMessage = action.payload; // Hata mesajını kaydet
    },
  },
});
export const { updateSuccess, updateFailed, updateRequest } =
  userUpdateSlice.actions;
export default userUpdateSlice.reducer;