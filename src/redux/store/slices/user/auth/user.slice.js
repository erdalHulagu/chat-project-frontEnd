import { createSlice } from "@reduxjs/toolkit";


const initialState={
   reqUser:{}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      searchUser: (state, action) => {
        state.reqUser = action.payload;
      },
    }
  });
  export const { searchUser } = userSlice.actions;
  export default userSlice.reducer;