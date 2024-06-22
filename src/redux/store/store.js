
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import chatReducer from './slices/chat/chat-slice'
import messageReducer from './slices/message/message-slice';
import userSlice from './slices/user/auth/user.slice';
import authSlice from './slices/user/auth/auth-slice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth:authSlice,
    createGroup:createdGroupReducer,
    chat:chatReducer,
    message:messageReducer,
    user:userSlice,

    
    // other reducers...
  }
});

export default store;