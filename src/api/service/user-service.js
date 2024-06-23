import axios from "axios"
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";


// user endpoins 
export const register = (user) => {
  return axios.post(`${BASE_API_URL}/register`, user);
};

//login
export const login = (credential) => {
  return axios.post(`${BASE_API_URL}/login`, credential);
}

//get user
export const getUser = () => {
  return axios.get(`${BASE_API_URL}/users/profile`, { headers: authHeader() });
}

//update user
export const updateUser = (user) => {
  return axios.put(`${BASE_API_URL}/users/auth`
    , user
    , { headers: authHeader() });
};

//update password
export const updatePassword = (credential) => {
  return axios.patch(`${BASE_API_URL}/users/auth/password`
    , credential
    , {
      headers: authHeader(),
    });
}

//search user

export const searchUser = (user) => {
  return axios.get(`${BASE_API_URL}/users/search?firstName=${user.firstName}`, { headers: authHeader() });
};