
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import authReducer from './slices/auth/auth-slice'
import chatReducer from './slices/chat/chat-slice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    createGroup:createdGroupReducer,
    auth:authReducer,
    chat:chatReducer,

    
    // other reducers...
  }
});

export default store;