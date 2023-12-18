
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friendsProfileSlices'
import createdGroupReducer from './slices/created-group-slice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    createGroup:createdGroupReducer,
    
    // other reducers...
  },
});

export default store;