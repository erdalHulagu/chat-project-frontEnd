import { uploadImage } from "../../../../../../api/service/image-service";
import { getUser, updateUser } from "../../../../../../api/service/user-service";
import { toast, error } from "../../../../../../helper/swal";
import { loginSuccess, setImageURL } from "../../auth/auth-slice";

export const updateProfileAction = (values, profileImageFile) => async (dispatch) => {
  try {
    let imageId = null;

    // Yeni profil fotoğrafı seçilmişse önce fotoğrafı yükle
    if (profileImageFile instanceof File) {
      const imageResponse = await uploadImage(profileImageFile);

      imageId =
        imageResponse?.data?.imageId ??
        imageResponse?.data?.id;

      if (!imageId) {
        throw new Error("Fotoğraf ID bilgisi alınamadı.");
      }
    }

    // Kullanıcı bilgilerini hazırla
    const updatedUserData = {
      ...values,
      ...(imageId ? { lastId: imageId } : {}),
    };

    // Kullanıcı bilgilerini güncelle
    await updateUser(updatedUserData);

    // Güncel kullanıcı bilgilerini getir
    const userResponse = await getUser();

    // Redux kullanıcı bilgilerini güncelle
    if (userResponse?.data) {
      dispatch(loginSuccess(userResponse.data));
    }

    // Yeni profil fotoğrafını Redux'a kaydet
    if (imageId) {
      dispatch(setImageURL(imageId));
    }

    toast("Profil başarıyla güncellendi.");

  } catch (err) {
    console.error("Profile update error:", err);

    error(
      err.response?.data?.message ||
      err.message ||
      "Profil güncellenirken bir hata oluştu."
    );
  }
};