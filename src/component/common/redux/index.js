import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import reservationSlice from "./slices/reservation-slice";


export default configureStore({
    reducer:{
        auth: authSlice,
        reservation: reservationSlice
    }
})