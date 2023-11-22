import { createSlice } from '@reduxjs/toolkit';

// const profilesSlice = createSlice({
//   name: 'profiles',
//   initialState: null,
//   reducers: {
//     setFriendProfile: (state, action) => action.payload,
//   },
// });

// export const { setFriendProfile } = profilesSlice.actions;
// export const selectProfile = (state) => state.profiles;

// export default profilesSlice.reducer;

export const profilesSlice =createSlice({
  name:"profiles",
  initialState: {
      friendProfile:[
       {
          id:5,
          name:"kazim",
          lastname:"hulagu",
          phone:"09876543",
          email:"kazim@gmail.com",
          image:"https://media.istockphoto.com/id/1270766969/tr/fotoğraf/tarlada-silah-yetiştiren-kıdemli-çiftçi.jpg?s=612x612&w=0&k=20&c=aI1XXXCy6McQeLGxd2Q6vzwW0s18ZYl50cbS6HrM1Ko=",
        }
       
      ],
      selectedProfile:null



  },
  redusers:{
    setFriendProfile:(state,action)=>{
      state.friendProfile=action.payloadd
     },
    setSelectedProfile:(state,action)=>{
      state.selectedProfile=action.payloadd
     }
      
  }
});
export const {setFriendProfile,setSelectedProfile} = profilesSlice.actions;
export default profilesSlice.reducer;