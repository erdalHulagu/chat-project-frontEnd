import { createSlice } from "@reduxjs/toolkit";


const initialState= {
  user: {}
 }

const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState,
    
    reducers: {
        updateSucces: (state,action) => {
          state.user = action.payload
        },
         
    },
  });
  export const {updateSucces}=userUpdateSlice.actions
  export default userUpdateSlice.reducer;