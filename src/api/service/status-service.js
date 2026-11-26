
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

const STATUS_URL = `${BASE_API_URL}/statuses`;

// Status oluştur
export const createStatus = (imageId, caption) => {
  const params = {};

  if (imageId) params.imageId = imageId;
  if (caption?.trim()) params.caption = caption.trim();

  return axios.post(STATUS_URL, null, {
    headers: authHeader(),
    params,
  });
};

// Kendi statuslarım
export const getMyStatuses = () => {
  return axios.get(`${STATUS_URL}/my`, {
    headers: authHeader(),
  });
};

// Arkadaşlarımın ve kendi aktif statuslarım
export const getFriendsStatuses = () => {
  return axios.get(`${STATUS_URL}/friends`, {
    headers: authHeader(),
  });
};

// Status sil
export const deleteStatus = (statusId) => {
  return axios.delete(`${STATUS_URL}/${statusId}`, {
    headers: authHeader(),
  });
};
