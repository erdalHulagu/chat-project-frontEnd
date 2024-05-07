import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isUserLogin:false,
    user:{},
    erdal:"erdal"
}
export const authSlice= createSlice({
name:"auth",
initialState,
reducers:{
    loginSucces:(state,action)=>{
        state.isUserLogin=true;
        state.user=action.payload;
        state.erdal=action.payload;
    },
    loginFailed:(state,action)=>{
        state.isUserLogin=false;
        state.user={};
    },
    logout:(state,action)=>{
        state.isUserLogin=false;
        state.user={};

    }
}

})
export const {loginSucces,loginFailed,logout}=authSlice.actions;
export default authSlice.reducer;