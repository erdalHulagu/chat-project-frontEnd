import { createSlice } from "@reduxjs/toolkit";

export const initialState={
  friends:[],
  selectedProfile: null,
}
export const profileSlice =createSlice({
  name:"friendprofile",
  initialState,
  redusers:{
     setFriend:(state,action)=>{
      state.friends=action.payload
     },
     setSelectedProfile:(state,action)=>{
      state.selectedProfile=action.payload
     }
     
  }
});
export const { setSelectedProfile, setFriend} = profileSlice.actions;
export default profileSlice.reducer;
