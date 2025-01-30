import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isUserLogin:false,
    user:{},
    imageUrl:null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
  
    reducers: {
      loginSuccess: (state, action) => {
        state.isUserLogin = true;
        state.user = action.payload;
        state.imageUrl = action.payload.profilImage; // Doğru şekilde al
    },
      setImageURL: (state, action) => {
      state.imageUrl = action.payload; 
    },
      loginFailed: (state) => {
        state.isUserLogin = false;
        state.user = {};
        state.imageUrl=null;
       
        
      },
      logout: (state) => {
        state.isUserLogin = false;
        state.user = {};
        state.imageUrl=null;
      },
    },
  });
  export const { loginSuccess, loginFailed, logout ,setImageURL} = authSlice.actions;
  export default authSlice.reducer;