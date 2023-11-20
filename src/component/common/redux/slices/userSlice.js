import { createSlice } from "@reduxjs/toolkit";

export const userSlice =createSlice({
    user:"user",
    initialState: {
        name:"erdal",
        surname :"hulagu",
        Image:"https://cdn.pixabay.com/photo/2023/09/27/07/29/mantis-8278996_1280.jpg",
        email:"erdal@gmail.com",
        phone:"123456789"

    },
    redusers:{
        setUser:(state,action)=>{
            state.user=action.payload
            
        },
        setName:(state,action)=>{
            state.name=action.payload
        },
        surname:(state,action)=>{
            state.surname=action.payload
        },
        setImage:(state,action)=>{
            state.image=action.payload
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        },
        setPhone:(state,action)=>{
            state.phone=action.payload
        }
    }
})
