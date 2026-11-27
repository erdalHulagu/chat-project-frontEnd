
import {
  getUser,
  login,
} from "../../../../../api/service/user-service";

import {
  encryptedLocalStorage,
} from "../../../../../helper/auth-token/encrypt-storage";

import {
  error,
} from "../../../../../helper/swal";

import {
  getImageById,
} from "../../../../../api/service/image-service";

import {
  loginFailed,
  loginSuccess,
  setImageURL,
} from "./auth-slice";

const getDefaultImage = () =>
  require("../../../../../assets/img/user.webp");

export const loginProfile = (values) => async (dispatch) => {
  let imageUrl = null;

  try {
    // 1. Kullanıcı girişi
    const respAuth = await login(values);
    const token = respAuth.data?.token;

    if (!token) {
      throw new Error("Authentication token was not returned.");
    }

    // 2. JWT kaydet
    encryptedLocalStorage.setItem("token", token);

    // 3. Kullanıcı profilini getir
    const respUser = await getUser();

    if (!respUser.data) {
      throw new Error("User profile could not be loaded.");
    }

    // 4. Redux kullanıcı bilgilerini güncelle
    dispatch(loginSuccess(respUser.data));

    // 5. Profil fotoğrafını yükle
    const profileImageId = respUser.data.profileImage;

    if (profileImageId) {
      try {
        const image = await getImageById(profileImageId);

        const blob = new Blob([image.data], {
          type: image.headers?.["content-type"] || "image/png",
        });

        imageUrl = URL.createObjectURL(blob);

        dispatch(setImageURL(imageUrl));
      } catch (imageError) {
        console.error("Profile image could not be loaded:", imageError);
        dispatch(setImageURL(getDefaultImage()));
      }
    } else {
      dispatch(setImageURL(getDefaultImage()));
    }

    return true;

  } catch (err) {
    console.error("Login failed:", err);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    encryptedLocalStorage.removeItem("token");

    dispatch(loginFailed());

    error(
      err.response?.data?.message ||
      "Incorrect email or password. Please try again."
    );

    return false;
  }
};
