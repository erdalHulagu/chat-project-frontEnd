import { createAsyncThunk } from "@reduxjs/toolkit";
import { createGroupChat } from "../../../../../api/service/chat-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";

export const createUserGroupChat = createAsyncThunk('chats/groupChat', async (values, { rejectWithValue }) => {

    try {
        const respGroupChat = await createGroupChat(values);
        encryptedLocalStorage.setItem("token", respGroupChat.data.token);
        console.log(respGroupChat.data)
        toast("chat's sent")
        return respGroupChat.data;

    } catch (err) {
        return rejectWithValue(error("group chat error",err.response.data));
    }
});