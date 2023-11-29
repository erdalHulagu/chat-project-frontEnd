import { createSlice } from "@reduxjs/toolkit";



// const initialState={
  
// ]}

export const profileSlice = createSlice({

  name: 'profile',
  initialState:{
    friendList:[
    {
      "id": 0,
      "image": "https://cdn.pixabay.com/photo/2015/05/26/12/30/baby-784608_1280.jpg",
      "name": "Erdal",
      "lastname": "Hulagu",
      "email": "erdal@gmail.com"
    }]
  },
  redusers: {

    setFriendProfile: (state, action) => {
                   state.friendList=action.payload

      
    }
  }
}

);
export const { setSelectedProfile, setFriend } = profileSlice.actions;
export default profileSlice.reducer;
