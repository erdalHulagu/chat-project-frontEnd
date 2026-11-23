
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

const getMultipartHeaders = () => {
    const headers = { ...authHeader() };
    delete headers["Content-Type"];
    return headers;
};

// Görsel yükleme
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
        {
            headers: authHeader(),
            responseType: "arraybuffer",
        }
    );
};

// Görseli arraybuffer olarak getirme
export const getImageById = (imageId) => {
    if (!imageId) {
        return Promise.reject(new Error("Görsel ID boş olamaz."));
    }

    return axios.get(
        `${BASE_API_URL}/images/display/${imageId}`,
        {
            headers: authHeader(),
            responseType: "arraybuffer",
        }
    );
};

// Görsel ID'sini img src içinde kullanılabilir URL'ye çevirme
export const getImageObjectUrl = async (imageId) => {
    if (!imageId) return null;

    const response = await getImageById(imageId);

    const contentType =
        response.headers?.["content-type"] || "image/jpeg";

    const blob = new Blob(
        [response.data],
        { type: contentType }
    );

    return URL.createObjectURL(blob);
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
    return axios.get(
        `${BASE_API_URL}/images/all`,
        { headers: authHeader() }
    );
};

// Görseli kişisel görsellere ekleme
export const addImageToYourImages = (imageId) => {
    return axios.patch(
        `${BASE_API_URL}/users/addImage/${imageId}`,
        null,
        { headers: authHeader() }
    );
};

// Oturum açmış kullanıcının görsellerini getirme
export const getUsersImages = () => {
    return axios.get(
        `${BASE_API_URL}/users/myImages`,
        { headers: authHeader() }
    );
};

// Arkadaşın fotoğraf ID'lerini getirme
// Backend: GET /users/myFriendImages/{friendId}
// Dönüş: String ID dizisi
export const getMyFriendImages = (friendId) => {
    return axios.get(
        `${BASE_API_URL}/users/myFriendImages/${friendId}`,
        { headers: authHeader() }
    );
};
