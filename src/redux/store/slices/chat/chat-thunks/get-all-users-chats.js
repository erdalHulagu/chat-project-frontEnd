import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";

export const getAllUsersChats = createAsyncThunk('chats/groupChat', async (values, { rejectWithValue }) => {

    try {
        const respAllUsersChat= await getAllChat(values);
        encryptedLocalStorage.setItem("token", respAllUsersChat.data.token);
        console.log(respAllUsersChat.data)
        toast("chat's sent")
        return respAllUsersChat.data;

    } catch (err) {
        return rejectWithValue(error("group chat error",err.response.data));
    }
});