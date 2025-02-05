import { getImageById, uploadImage } from "../../../../../../api/service/image-service";
import { getUser, updateUser } from "../../../../../../api/service/user-service";
import { error, toast } from "../../../../../../helper/swal";
import { loginFailed, loginSuccess, setImageURL } from "../../auth/auth-slice";



export const updateProfileAction = (userData, profileImage) => async (dispatch) => {
    try {
      let imageId = userData.profileImage;
      
      if (profileImage) {
        const formData = new FormData();
        formData.append("imageFile", profileImage);
        const imageResponse = await uploadImage(formData);
        imageId = imageResponse.data.id;
      }
  
      const updatedUserData = { ...userData, profileImage: imageId };
      await updateUser(updatedUserData, imageId);
  
      const respUser = await getUser();
      dispatch(loginSuccess(respUser.data));
      toast.success("Profile updated successfully");
    } catch (err) {
      dispatch(loginFailed());
      toast.error("Failed to update profile. Please try again.");
    }
  };