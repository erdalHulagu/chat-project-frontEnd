import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";

export const singleUserChat =  createAsyncThunk('chats/singleChat', async (userId, { rejectWithValue }) => {

    try {
        
        const respChat = await createChat(userId);
        console.log("users chats succes-----------------",respChat.data)
        return respChat.data;
    } catch (err) {
        return rejectWithValue("users chat error-------",err.response.data);
    }
});