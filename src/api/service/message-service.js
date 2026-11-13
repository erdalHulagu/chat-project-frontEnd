
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

// Mesaj gönder
export const createMessage = (message) => {
  return axios.post(
    `${BASE_API_URL}/messages/create`,
    message,
    { headers: authHeader() }
  );
};

// Sohbet mesajlarını getir
export const allMessages = (chatId) => {
  return axios.get(
    `${BASE_API_URL}/messages/chat/${chatId}`,
    { headers: authHeader() }
  );
};
