import { createSlice } from "@reduxjs/toolkit";



// export const userSlice =createSlice({


//     name:"user",
//     initialState: {
//         friends:{
//         name:"erdal",
//         lastname:"hulagu",
//         image:"https://cdn.pixabay.com/photo/2023/09/27/07/29/mantis-8278996_1280.jpg",
//         email:"erdal@gmail.com",
//         phone:"123456789"
//         },
//         selectedFriendId:null

//     },
//     redusers:{
//        setProfile:(state,action)=>{
//         state.selectedFriendId=action.payload
     
//        }
       
//     }
// });
// export const {setProfile} = userSlice.actions;
// export default userSlice.reducer;
export const userSlice =createSlice({
    name:"profile",
    initialState: {
        friends:[],
        // name:"erdal",
        // lastname:"hulagu",
        // image:"https://cdn.pixabay.com/photo/2023/09/27/07/29/mantis-8278996_1280.jpg",
        // email:"erdal@gmail.com",
        // phone:"123456789"

    },
    redusers:{
       setProfile:(state,action)=>{
        state.friend=action.payload
        // state.image=action.payload
        // state.email=action.payload
        // state.phone=action.payload
       }
        // setFullName:(state,action)=>{
            //  state.name=action.payload
        // },
        
        // setImage:(state,action)=>{
        //     state.image=action.payload
        // },
        // setEmail:(state,action)=>{
        //     state.email=action.payload
        // },
        // setPhone:(state,action)=>{
        //     state.phone=action.payload
        // }
    }
});
export const {setProfile} = userSlice.actions;
export default userSlice.reducer;