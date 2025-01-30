import { useSelector } from "react-redux";
import { updateUser } from "../../../../../../api/service/user-service";
import { toast } from "../../../../../../helper/swal";
import { updateSuccess, updateFailed, updateRequest, updateImageURL } from "./update-user-slice";

import { getImageById, uploadImage } from "../../../../../../api/service/image-service";

export const updateUserProfile = (userUpdateRequest, profileImageFile) => async (dispatch) => {
  dispatch(updateRequest());

  try {
    let imageFileId = null;

    if (profileImageFile) {
      const formData = new FormData();
      formData.append("profileImage", profileImageFile);

      const uploadedImage = await uploadImage(profileImageFile);
      console.log("imageId..............",uploadedImage)
      imageFileId = uploadedImage; // ID'yi al
    }

    const updatedUserData = await updateUser(userUpdateRequest, imageFileId);
    console.log("updatedUserData:", updatedUserData);

    toast("Update successful");
    dispatch(updateSuccess(updatedUserData.data));

    if (imageFileId) {
      const imageResponse = await getImageById(imageFileId);
      const blob = new Blob([imageResponse.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      dispatch(updateImageURL(imageUrl));
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed...";
    console.error("Update error message:", errorMessage);
    dispatch(updateFailed(errorMessage));
  }
};

