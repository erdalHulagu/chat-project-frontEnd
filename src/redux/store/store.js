
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import authReducer from './slices/auth/auth-slice'
import chatReducer from './slices/chat/chat-slice'
import messageReducer from './slices/message/message-slice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    createGroup:createdGroupReducer,
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer,

    
    // other reducers...
  }
});

export default store;