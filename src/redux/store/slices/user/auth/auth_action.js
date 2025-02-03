import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";
// import { loginFailed, loginSuccess,setImageUrl } from "./auth-slice";
import { getImageById } from "../../../../../api/service/image-service";
import { loginFailed, loginSuccess, setImageURL,  } from "./auth-slice";

export const loginProfile = (values) => async (dispatch) => {



    try {
        const respAuth = await login(values);
        encryptedLocalStorage.setItem("token", respAuth.data.token)

        const respUser = await getUser();
        dispatch(loginSuccess(respUser.data));
       
        
        const image= await  getImageById(respUser.data.profileImage)
        const blob = new Blob([image.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        dispatch(setImageURL(imageUrl));
       
       

        if (respUser) {
            toast("login successfull")
        }
    } catch (err) {
        dispatch(loginFailed());
        error("incorrect email or password try again");

    }
};
