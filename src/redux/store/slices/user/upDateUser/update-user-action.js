import { updateUser } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage"; // encryptedLocalStorage'ı ekle
import { toast } from "../../../../../helper/swal";
import { updateSuccess, updateFailed, updateRequest } from "./update-user-slice";

// Kullanıcı güncelleme eylemi
export const updateUserProfile = async  (values) => async(dispatch) => {
  dispatch(updateRequest()); // Loading durumunu başlat
  try {
    const updatedUserData = await updateUser(values); // API çağrısı
    console.log("update user data :",updatedUserData)
    encryptedLocalStorage.setItem("token", updatedUserData.data.token); // Token'ı kaydet
    toast("update successfull")
    dispatch(updateSuccess(updatedUserData.data)); 
    // Kullanıcı bilgilerini güncelle
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to update user .........."; // Hata mesajını al
    console.error("error message :",errorMessage); // Hata mesajını konsola yaz
    dispatch(updateFailed()); // Hata durumunu işaretle
  }
};
