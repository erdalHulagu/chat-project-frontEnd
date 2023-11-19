import { createSlice } from "@reduxjs/toolkit";

export const userSlice =createSlice({
    user:"user",
    initialState: {
        name:"erdal",
        surname :"hulagu",
        email:"erdal@gmail.com",
        phone:"123456789"

    },
    redusers:{
        update:(state,action)=>{
            
        }
    }
})