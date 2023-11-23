import axios from "axios";
import { setting } from "../helpers/settings";

export const API_URL=setting.apiURL;
export const getUsers = () => {
  return axios.get(`${API_URL}`);
};