import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

export const createChat = (userId) => {
    return axios.post(
        `${BASE_API_URL}/chats/single`,
        { userId },
        { headers: authHeader() }
    );
};

export const createGroupChat = (chat) => {
    return axios.post(
        `${BASE_API_URL}/chats/group`,
        chat,
        { headers: authHeader() }
    );
};

export const getAllChat = () => {
    return axios.get(
        `${BASE_API_URL}/chats/allChats`,
        { headers: authHeader() }
    );
};