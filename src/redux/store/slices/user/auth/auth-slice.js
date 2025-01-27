import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isUserLogin:false,
    user:{},
    image:null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
  
    reducers: {
      loginSuccess: (state, action) => {
        state.isUserLogin = true;
        state.user = action.payload;
        state.image= action.payload;
      },
  
      loginFailed: (state) => {
        state.isUserLogin = false;
        state.user = {};
        state.image=null;
       
        
      },
      logout: (state) => {
        state.isUserLogin = false;
        state.user = {};
        state.image=null;
      },
    },
  });
  export const { loginSuccess, loginFailed, logout } = authSlice.actions;
  export default authSlice.reducer;