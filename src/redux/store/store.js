
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/friend/friendsProfileSlices'
import createdGroupReducer from './slices/group/created-group-slice';
import messageReducer from './slices/message/message-slice';
import authSlice from './slices/user/auth/auth-slice';
import getAllUsersChatsReducer from './slices/chat/chat-slices/getAll-users-chats-slice';
import singleUserChatReducer from './slices/chat/chat-slices/single-user-chat-slice';
import usersGroupChatReducer from './slices/chat/chat-slices/users-group-chat-slice';
import userSearchReducer from './slices/user/user/serachUser/user-search-slice';
import updateUserReducer from './slices/user/upDateUser/update-user-slice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth:authSlice,
    createGroup:createdGroupReducer,
    message:messageReducer,
    userSearch:userSearchReducer,
    allUsersChat:getAllUsersChatsReducer,
    usersSingleChat:singleUserChatReducer,
    usersGroupChats:usersGroupChatReducer,
    updateCurrentUser:updateUserReducer,
    

    
    // other reducers...
  }
});

export default store;