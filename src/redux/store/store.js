
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import authReducer from './slices/auth/auth-slice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    createGroup:createdGroupReducer,
    auth:authReducer,
    
    // other reducers...
  }
});

export default store;