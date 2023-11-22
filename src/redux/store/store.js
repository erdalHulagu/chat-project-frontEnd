import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { profilesSlice } from "./slices/friendsProfileSlices";




export const store=configureStore({
    reducer:{
       user: userSlice,
       profiles:profilesSlice
    }
})
