import { updateUser } from "../../../../../../api/service/user-service";
import { toast } from "../../../../../../helper/swal";
import { updateSuccess, updateFailed, updateRequest } from "./update-user-slice";

export const updateUserProfile = (userUpdateRequest, profileImage) => async (dispatch) => {
  dispatch(updateRequest());
  try {
    const formData = new FormData();
    formData.append("userUpdateRequest", JSON.stringify(userUpdateRequest));
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const updatedUserData = await updateUser(formData);
    toast("Update successful");
    dispatch(updateSuccess(updatedUserData.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed...";
    console.error("update error message:", errorMessage);
    dispatch(updateFailed(errorMessage));
  }
};
