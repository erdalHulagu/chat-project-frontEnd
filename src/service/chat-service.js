import axios from "axios";
import { BASE_API_URL } from "../api/base-api-url";
import authHeader from "../helper/auth-token/auth-header";

export const createChat = (chat) => {
    return axios.put(`${BASE_API_URL}/users/auth`, chat, { headers: authHeader() });
  };