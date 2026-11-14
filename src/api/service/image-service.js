
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

// JSON Content-Type başlığını kaldırıyoruz.
// Axios, multipart/form-data için boundary bilgisini kendisi eklemeli.
const getMultipartHeaders = () => {
    const headers = { ...authHeader() };
    delete headers["Content-Type"];
    return headers;
};

// Profil veya sohbet görseli yükleme
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("imageFile", file);

    return axios.post(
        `${BASE_API_URL}/images/upload`,
        formData,
        { headers: getMultipartHeaders() }
    );
};

// Görsel indirme
export const downloadImage = (imageId) => {
    return axios.get(
        `${BASE_API_URL}/images/download/${imageId}`,
        { responseType: "arraybuffer" }
    );
};

// Görseli görüntüleme
export const getImageById = (imageId) => {
    return axios.get(
        `${BASE_API_URL}/images/display/${imageId}`,
        { responseType: "arraybuffer" }
    );
};

// Görsel silme
export const deleteImage = (imageId) => {
    return axios.delete(
        `${BASE_API_URL}/images/delete/${imageId}`,
        { headers: authHeader() }
    );
};

// Dosya sistemine görsel yükleme
export const uploadImageToFileSystem = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return axios.post(
        `${BASE_API_URL}/images/file`,
        formData,
        { headers: getMultipartHeaders() }
    );
};

// Bütün görselleri getirme
export const getAllImages = () => {
    return axios.get(`${BASE_API_URL}/images/all`);
};
