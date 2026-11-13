
import { getUser, login } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";
import { getImageById } from "../../../../../api/service/image-service";

import {
  loginFailed,
  loginSuccess,
  setImageURL,
} from "./auth-slice";

export const loginProfile = (values) => async (dispatch) => {
  try {
    const respAuth = await login(values);
    const token = respAuth.data.token;

    if (!token) {
      throw new Error("Authentication token was not returned.");
    }

    encryptedLocalStorage.setItem("token", token);

    const respUser = await getUser();

    dispatch(loginSuccess(respUser.data));

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
        console.error("Profile image could not be loaded:", imageError);

        const defaultImage = require("../../../../../assets/img/user.webp");
        dispatch(setImageURL(defaultImage));
      }
    } else {
      const defaultImage = require("../../../../../assets/img/user.webp");
      dispatch(setImageURL(defaultImage));
    }

    toast("Login successful");

    return true;
  } catch (err) {
    console.error("Login failed:", err);

    encryptedLocalStorage.removeItem("token");
    dispatch(loginFailed());

    error("Incorrect email or password. Please try again.");

    return false;
  }
};
