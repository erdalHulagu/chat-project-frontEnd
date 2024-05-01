import { createSlice } from "@reduxjs/toolkit";
import LOGIN from"./action-type"

const initialState={
    LOGIN,
    user:{},
}
export const authSlice= createSlice({
name:"auth",
initialState,
reducers:{
    loginSucces:(state,action)=>{
        state.LOGIN=true;
        state.user=action.payload;
    },
    loginFailed:(state,action)=>{
        state.LOGIN=false;
        state.user={};
    },
    logout:(state,action)=>{
        state.LOGIN=false;
        state.user={};

    }
}

})
export const {loginSucces,loginFailed,logout}=authSlice.actions;
export default authSlice.reducer;