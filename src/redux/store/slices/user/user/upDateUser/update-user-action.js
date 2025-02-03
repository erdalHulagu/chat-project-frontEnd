import { useSelector } from "react-redux";
import { updateUser } from "../../../../../../api/service/user-service";
import { toast } from "../../../../../../helper/swal";
import { updateSuccess, updateFailed, updateRequest, updateImageURL } from "./update-user-slice";

import { getImageById, uploadImage } from "../../../../../../api/service/image-service";

export const updateUserProfile = (formData) => async (dispatch) => {
  dispatch(updateRequest());

  // try {

  //     const uploadedImage = await uploadImage(formData.imageFile);
  //     const imageId=uploadedImage.data.id;
  //     console.log("imageId..............",uploadedImage)
     

  //   const updatedUserData = await updateUser({...formData}, imageId);
  //   console.log("updatedUserData:", updatedUserData.data);

  //   toast("Update successful");
  //   dispatch(updateSuccess(updatedUserData.data));

  //     const imageResponse = await getImageById(imageId);
  //     const blob = new Blob([imageResponse.data], { type: "image/png" });
  //     const imageUrl = URL.createObjectURL(blob);
  //     dispatch(updateImageURL(imageUrl));

  // } catch (error) {
  //   const errorMessage = error.response?.data?.message || "Update failed...";
  //   console.error("Update error message:", errorMessage);
  //   dispatch(updateFailed(errorMessage));
  // }
};

