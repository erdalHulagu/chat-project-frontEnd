import { createSlice } from "@reduxjs/toolkit";

export const userSlice =createSlice({
    user:"user",
    initialState: {
        fullName:"erdal hulagu",
        image:"https://cdn.pixabay.com/photo/2023/09/27/07/29/mantis-8278996_1280.jpg",
        email:"erdal@gmail.com",
        phone:"123456789"

    },
    redusers:{
       
        setFullName:(state,action)=>{
            state.name=action.payload
        },
        setSurname:(state,action)=>{
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
});
export const {setFullName, setImage, setEmail, setPhone} = userSlice.actions;
export default userSlice.reducer;