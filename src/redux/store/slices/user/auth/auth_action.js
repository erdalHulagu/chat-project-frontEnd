
import {
  getUser,
  login,
} from "../../../../../api/service/user-service";

import {
  encryptedLocalStorage,
} from "../../../../../helper/auth-token/encrypt-storage";

import {
  error,
  toast,
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
  try {
    // 1. Authenticate user
    const respAuth = await login(values);
    const token = respAuth.data?.token;

    if (!token) {
      throw new Error("Authentication token was not returned.");
    }

    // 2. Store JWT
    encryptedLocalStorage.setItem("token", token);

    // 3. Get authenticated user profile
    const respUser = await getUser();

    if (!respUser.data) {
      throw new Error("User profile could not be loaded.");
    }

    // 4. Update Redux authentication state
    dispatch(loginSuccess(respUser.data));

    // 5. Load profile image separately
    const profileImageId = respUser.data.profileImage;

    if (profileImageId) {
      try {
        const image = await getImageById(profileImageId);

        const blob = new Blob([image.data], {
          type: "image/png",
        });

        const imageUrl = URL.createObjectURL(blob);

        dispatch(setImageURL(imageUrl));
      } catch (imageError) {
        console.error(
          "Profile image could not be loaded:",
          imageError
        );

        dispatch(setImageURL(getDefaultImage()));
      }
    } else {
      dispatch(setImageURL(getDefaultImage()));
    }

    // 6. Notify successful login
    toast("Login successful");

    return true;

  } catch (err) {
    console.error("Login failed:", err);

    encryptedLocalStorage.removeItem("token");

    dispatch(loginFailed());

    error(
      err.response?.data?.message ||
      "Incorrect email or password. Please try again."
    );

    return false;
  }
};
