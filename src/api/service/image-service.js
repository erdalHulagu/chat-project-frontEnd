import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

export const uploadImage=(file)=>{
    return axios.post(`${BASE_API_URL}/images/upload`,file,{
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" }});
}
export const downloadImage=(imageId)=>{
    return axios.get(`${BASE_API_URL}/images/download/${imageId}`);
}

export const getImageById=(imageId)=>{
    return axios.get(`${BASE_API_URL}/images/display/${imageId}`,{ responseType: "arraybuffer" });
}
// export const getImageById=()=>{
//     return axios.get(`${BASE_API_URL}/users/userImage`);
// }
export const deleteImage=(imageId)=>{
    return axios.delete(`${BASE_API_URL}/images/delete/${imageId}`);
}
export const uploadImageToFileSystem=(file)=>{
    return axios.post(`${BASE_API_URL}/images/file`,file);
}
export const getAllImages=()=>{
    return axios.get(`${BASE_API_URL}/images/all`);
}