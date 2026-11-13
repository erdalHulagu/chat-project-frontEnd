
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChat } from "../../../../../api/service/chat-service";

export const getAllUsersChats = createAsyncThunk(
    "allUsersChat/getAllUsersChats",
    async (_, { rejectWithValue }) => {
        console.log("GET ALL CHATS: İstek başladı");

        try {
            const response = await getAllChat();

            console.log("GET ALL CHATS STATUS:", response.status);
            console.log("GET ALL CHATS DATA:", response.data);

            return response.data;
        } catch (err) {
            console.error("GET ALL CHATS ERROR:", err);
            console.error("ERROR RESPONSE:", err.response?.data);
            console.error("ERROR STATUS:", err.response?.status);

            return rejectWithValue(
                err.response?.data || err.message
            );
        }
    }
);
