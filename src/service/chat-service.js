import axios from "axios";
import { BASE_API_URL } from "../api/base-api-url";
import authHeader from "../helper/auth-token/auth-header";
import { CREATE_CHAT } from "../redux/store/slices/chat/chat-type";


//chat endpoints
export const createChat = (chat) => {
    return axios.post(`${BASE_API_URL}/chats/single`, { headers: authHeader(), body: JSON.stringify(chat.data) });


};
export const createGroupChat = (chat) => {
    return axios.post(`${BASE_API_URL}/chats/group`, { headers: authHeader(), body: JSON.stringify(chat.data) });


};
export const getAllChat = (chat) => {
    return axios.getAll(`${BASE_API_URL}/chats/allChats`, { headers: authHeader(), body: JSON.stringify(chat.data) });


};