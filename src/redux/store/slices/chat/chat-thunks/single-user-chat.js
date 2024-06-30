import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";

export const singleUserChat =  createAsyncThunk('chats/singleChat', async (values, { rejectWithValue }) => {

    try {
        const respChat = await createChat(values);
        encryptedLocalStorage.setItem("token", respChat.data.token);
        console.log("users chats",respChat.data)
        return respChat.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});