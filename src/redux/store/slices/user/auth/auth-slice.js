
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  user: {},
  imageUrl: null,
  authInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.isUserLogin = true;
      state.user = action.payload;
      state.authInitialized = true;

      // imageUrl burada değiştirilmez.
      // Profil fotoğrafı yalnızca setImageURL ile güncellenir.
    },

    setImageURL: (state, action) => {
      state.imageUrl = action.payload;
    },

    loginFailed: (state) => {
      state.isUserLogin = false;
      state.user = {};
      state.imageUrl = null;
      state.authInitialized = true;
    },

    logout: (state) => {
      state.isUserLogin = false;
      state.user = {};
      state.imageUrl = null;
      state.authInitialized = true;
    },

    setAuthInitialized: (state, action) => {
      state.authInitialized = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailed,
  logout,
  setImageURL,
  setAuthInitialized,
} = authSlice.actions;

export default authSlice.reducer;
