import axios from "axios"
import { BASE_API_URL } from "../api/base-api-url"
import authHeader from "../helper/auth-token/auth-header";

export const createMessage=(message)=>{
    return axios.post(`${BASE_API_URL}/messages/create`,message, { headers: authHeader()});
}
export const allMessages=(message)=>{
    return axios.get(`${BASE_API_URL}/messages/chat/${message.chatId}`,message, { headers: authHeader()});
}