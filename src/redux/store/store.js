
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import chatReducer from './slices/chat/chat-slice'
import messageReducer from './slices/message/message-slice';
import authSlice from './slices/user/auth/auth-slice';
import userSearchReducer from './slices/user/user/user-search-slice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth:authSlice,
    createGroup:createdGroupReducer,
    chat:chatReducer,
    message:messageReducer,
    userSearch:userSearchReducer,

    
    // other reducers...
  }
});

export default store;