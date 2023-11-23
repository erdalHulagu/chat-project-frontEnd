import { createSlice } from "@reduxjs/toolkit";

export const initialState={}
export const profileSlice =createSlice({
  name:"profiles",
  initialState,
  redusers:{
     setProfile:(state,action)=>{
      state.value=action.payload
      
     }
     
  }
});
export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
