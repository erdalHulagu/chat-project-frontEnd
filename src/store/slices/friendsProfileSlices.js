import { createSlice } from "@reduxjs/toolkit";





export const profileSlice = createSlice({

  name: 'profile',
  initialState:{
    id: 3,
    image: "https://cdn.pixabay.com/photo/2016/04/12/19/01/three-1325106_1280.png",
    name: "Adem",
    lastname: "Hulagu",
    email: "adem@gmail.com"
  },
  redusers: {
    setFriend: (state, action) => {
      state.name = action.payload
      state.image = action.payload
      state.lastname = action.payload
      state.email = action.payload
    },
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload
    }

  }
});
export const { setSelectedProfile, setFriend } = profileSlice.actions;
export default profileSlice.reducer;
