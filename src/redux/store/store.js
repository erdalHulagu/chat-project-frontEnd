
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friendsProfileSlices'
import createdGroupReducer from './slices/created-group-slice';
import authReducer from './slices/auth-slice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    createGroup:createdGroupReducer,
    auth:authReducer,
    
    // other reducers...
  }
});

export default store;