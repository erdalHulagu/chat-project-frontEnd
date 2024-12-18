import { updateUser } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage"; // encryptedLocalStorage'ı ekle
import { updateSuccess, updateFailed, updateRequest } from "./update-user-slice";

// Kullanıcı güncelleme eylemi
export const updateUserProfile = (values, imageId) => async (dispatch) => {
  dispatch(updateRequest()); // Loading durumunu başlat
  try {
    const updatedUserData = await updateUser(values, imageId); // API çağrısı
    encryptedLocalStorage.setItem("token", updatedUserData.data.token); // Token'ı kaydet
    dispatch(updateSuccess(updatedUserData.data)); 
    // Kullanıcı bilgilerini güncelle
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to update user"; // Hata mesajını al
    console.error(errorMessage); // Hata mesajını konsola yaz
    dispatch(updateFailed()); // Hata durumunu işaretle
  }
};
