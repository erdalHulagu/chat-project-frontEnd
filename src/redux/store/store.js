import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { profileSlice } from "./slices/friendsProfileSlices";





export const store = configureStore({
    reducer:{
       user: userSlice,
       friendprofile:profileSlice
    }
})
