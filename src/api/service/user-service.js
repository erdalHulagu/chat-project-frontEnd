
import axios from "axios";
import { BASE_API_URL } from "../base-api-url";
import authHeader from "../../helper/auth-token/auth-header";

// Kullanıcı kayıt
export const register = (user) => {
  return axios.post(`${BASE_API_URL}/register`, user);
};

// Kullanıcı giriş
export const login = (credential) => {
  return axios.post(`${BASE_API_URL}/login`, credential);
};

// Oturum açmış kullanıcının profili
export const getUser = () => {
  return axios.get(`${BASE_API_URL}/users/profile`, {
    headers: authHeader(),
  });
};

// ID ile kullanıcı bilgisi getir
export const getUserById = (userId) => {
  return axios.get(`${BASE_API_URL}/users/${userId}`, {
    headers: authHeader(),
  });
};

// Sayfalı kullanıcı listesi
export const getAllUser = (page = 0, size = 20, direction = "ASC") => {
  return axios.get(`${BASE_API_URL}/users`, {
    headers: authHeader(),
    params: {
      page,
      size,
      direction,
    },
  });
};

// Yönetici kullanıcı listesi
export const getAllUsers = () => {
  return axios.get(`${BASE_API_URL}/users/admin`, {
    headers: authHeader(),
  });
};

// Kullanıcı bilgilerini güncelle
export const updateUser = (updateUserRequest) => {
  return axios.put(
    `${BASE_API_URL}/users/update`,
    updateUserRequest,
    { headers: authHeader() }
  );
};

export const updateUserImage = (imageId) => {
  return axios.put(
    `${BASE_API_URL}/users/userImages/${imageId}`,
    null,
    { headers: authHeader() }
  );
};

// Profil fotoğrafını güncelle

// Şifre güncelle
export const updatePassword = (credential) => {
  return axios.patch(
    `${BASE_API_URL}/users/auth/password`,
    credential,
    { headers: authHeader() }
  );
};

// İsme göre kullanıcı ara
export const searchUser = (user) =>
    axios.get(`${BASE_API_URL}/users/search`, {
        headers: authHeader(),
        params: {
            firstName: user.firstName,
        },
    });


// Kullanıcı sil
export const deleteUser = (userId) => {
  return axios.delete(`${BASE_API_URL}/users/${userId}`, {
    headers: authHeader(),
  });
};

// Kullanıcının profil fotoğrafını sil
export const deleteUsersImage = (imageId) => {
  return axios.delete(
    `${BASE_API_URL}/users/deleteImage/${imageId}`,
    { headers: authHeader() }
  );
};

// Görsel ID'sinden kullanıcı bul
export const getUserByImageId = (imageId) => {
  return axios.get(
    `${BASE_API_URL}/users/userImage/${imageId}`,
    { headers: authHeader() }
  );
};

// Arkadaş ekle
export const addUserAsFriend = (friendId) => {
  return axios.patch(
    `${BASE_API_URL}/users/addFriend/${friendId}`,
    null,
    { headers: authHeader() }
  );
};

// Görseli kişisel görsellere ekle
export const addImageToYourImages = (imageId) => {
  return axios.patch(
    `${BASE_API_URL}/users/addImage/${imageId}`,
    null,
    { headers: authHeader() }
  );
};

// Oturum açmış kullanıcının görsellerini getir
export const getUsersImages = () => {
  return axios.get(`${BASE_API_URL}/users/myImages`, {
    headers: authHeader(),
  });
};
