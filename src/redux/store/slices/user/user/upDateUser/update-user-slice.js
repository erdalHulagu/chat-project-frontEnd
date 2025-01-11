import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  user: null, // Varsayılan olarak null
  // imageId: "",
};

const userUpdateSlice = createSlice({
  name: "updateCurrentUser",
  initialState,

  reducers: {
    updateRequest: (state) => {
      state.isUserLogin = true; // Loading başlat
    },
    updateSuccess: (state, action) => {
      state.isUserLogin = true;
      state.user = action.payload; // Güncellenen kullanıcı verisi
      // state.imageId = action.payload.profileImageId || ""; // Profil resmi ID'si
    },
    updateFailed: (state) => {
      state.isUserLogin = false;
      state.user = null; // Kullanıcıyı sıfırlıyoruz
      // state.imageId = ""; // Varsayılan değere dönüyoruz
    },
  },
});

export const { updateSuccess, updateFailed, updateRequest } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
