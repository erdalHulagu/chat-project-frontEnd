import { useParams } from "react-router-dom";
import { getImageById, uploadImage } from "../../../../../../api/service/image-service";
import { getUser, updateUser } from "../../../../../../api/service/user-service";
import {  toast } from "../../../../../../helper/swal";
import { loginFailed, loginSuccess, setImageURL } from "../../auth/auth-slice";



export const updateProfileAction = (values, profileImageURL) => async (dispatch) => {
  const{imageParamId}=useParams();
    try {
      
      
      let lastId=null
      if (profileImageURL) {
        const formData = new FormData();
        formData.append("imageFile", profileImageURL);
        const imageResponse = await uploadImage(formData);
        console.log("imageResponse...................................... ",imageResponse.data.id)
       let imageId = imageResponse.data.id;
        lastId =imageParamId(imageId);
      }
  
      const updatedUserData = { ...values,  lastId };
      await updateUser(updatedUserData);
  
      // const respUser = await getUser();
      // dispatch(loginSuccess(respUser.data));
      toast("Profile updated successfully");
    } catch (err) {
      dispatch(loginFailed());
      err("Failed to update profile. Please try again.");
    }
  };