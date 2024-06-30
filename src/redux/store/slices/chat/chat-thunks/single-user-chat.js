import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";

export const singleUserChat =  createAsyncThunk('chats/singleChat', async (userId, { rejectWithValue }) => {

    try {
        // if (!userId) throw new Error('UserId is required');
        const respChat = await createChat(userId);
        console.log("respChat------------------",respChat)
        encryptedLocalStorage.setItem("token", respChat.data.token);
        console.log("users chats",respChat.data)
        return respChat.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});