import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isUserLogin:false,
    user:{},
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    // initialState: {
    //   isUserLogin: false,
    //   user: {},
    // },
    reducers: {
      loginSuccess: (state, action) => {
        state.isUserLogin = true;
        state.user = action.payload;
      },
  
      loginFailed: (state) => {
        state.isUserLogin = false;
        state.user = {};
      },
      logout: (state) => {
        state.isUserLogin = false;
        state.user = {};
      },
    },
  });
  export const { loginSuccess, loginFailed, logout } = authSlice.actions;
  export default authSlice.reducer;