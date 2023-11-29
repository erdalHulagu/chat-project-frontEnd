
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friendsProfileSlices'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    // other reducers...
  },
});

export default store;