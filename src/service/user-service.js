import axios from "axios"
import { BASE_API_URL } from "../api/base-api-url";
import authHeader from "../helper/auth-token/auth-header";


// user endpoins 
export const register=(user)=>{
return axios.post(`${BASE_API_URL}/register`,user);
};

export const login=(credential)=>{
    return axios.post(`${BASE_API_URL}/login`,  credential);
}

export const getUser=()=>{
    return axios.get(`${BASE_API_URL}/users/profile`,{headers:  authHeader() });
}
export const updateUser = (user) => {
    return axios.put(`${BASE_API_URL}/users/auth`, user, { headers: authHeader() });
  };
export const updatePassword = (credential) => {
    return axios.patch(`${BASE_API_URL}/users/auth/password`, credential, {
      headers: authHeader(),
    });
  };