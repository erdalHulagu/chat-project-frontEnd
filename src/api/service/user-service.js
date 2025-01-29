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

// update user  eski update rent cardaki gibi
// export const updateUser = async (updateUserRequest,imageId) => {
//   return axios.put(`${BASE_API_URL}/users/update`, updateUserRequest, image{ headers: authHeader() });
// };
export const updateUser =async (updateUserRequest,imageId) => {
  return axios.put(`${BASE_API_URL}/users/update/${imageId}`, updateUserRequest, { headers: authHeader() });
};
// export const updateUser = async (formData) => {
//   return axios.post(`${BASE_API_URL}/users/update`, formData, { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } });
// };

// export const updateUser = async (updateUserRequest, imageId) => {
//   try {
//     const response = await axios.put(`${BASE_API_URL}/users/auth/${imageId}`, updateUserRequest, {
//       headers: authHeader(), // Yetkilendirme başlığı
//     });
//     return response.data; // API'den dönen veriyi geri döndür
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw error; // Hataları yakalamak için at
//   }
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









