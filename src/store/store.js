
import { configureStore } from '@reduxjs/toolkit'
import { profileSlice } from './slices/friendsProfileSlices'
import { counterSlice } from './slices/rondomSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    friendprofile:profileSlice
    
  },
})