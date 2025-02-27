import axios from "axios"
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";


// user endpoins 
export const register = (user) => {
  console.log("Gönderilen veri:", user); // Gönderilen JSON'u konsola yazdır
  return axios.post(`${BASE_API_URL}/register`, user);
};

//login
export const login = (credential) => {
  return axios.post(`${BASE_API_URL}/login`, credential);
}

//get user
export const getUser =async () => {
  return axios.get(`${BASE_API_URL}/users/profile`, { headers: authHeader() });
}


export const updateUser =async (updateUserRequest) => {
  return axios.put(`${BASE_API_URL}/users/update`, updateUserRequest, { headers: authHeader() });
};

// export const updateUser =async (updateUserRequest,imageId) => {
//   return axios.put(`${BASE_API_URL}/users/update/${imageId}`, updateUserRequest, { headers: authHeader() });
// };

//update password
export const updatePassword =async (credential) => {
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
//delete users image
export const deleteUsersImage=async(imageId)=>{
  return axios.delete(`${BASE_API_URL}/users/deleteImage/${imageId}`,{headers:authHeader()});
}








