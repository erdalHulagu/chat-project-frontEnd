import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";


//chat endpoints
export const createChat = (userId) => {
    // return axios.post(`${BASE_API_URL}/chats/single?userId=${userId}`, { headers: authHeader() });
    return axios.post(`${BASE_API_URL}/chats/single?${userId}`);


};
export const createGroupChat = (chat) => {
    return axios.post(`${BASE_API_URL}/chats/group`,chat, { headers: authHeader()});


};
export const getAllChat = (chat) => {
    return axios.getAll(`${BASE_API_URL}/chats/allChats`,chat, { headers: authHeader(chat.token) });


};
// export const createChat = (chat) => {
//     return axios.post(`${BASE_API_URL}/chats/single`, chat,{ headers: authHeader() });


// };
// export const createGroupChat = (chat) => {
//     return axios.post(`${BASE_API_URL}/chats/group`, { headers: authHeader(), body: JSON.stringify(chat.data) });


// };
// export const getAllChat = (chat) => {
//     return axios.getAll(`${BASE_API_URL}/chats/allChats`, { headers: authHeader(), body: JSON.stringify(chat.data) });


// };