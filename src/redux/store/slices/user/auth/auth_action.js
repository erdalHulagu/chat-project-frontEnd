import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../../../helper/swal";
import { loginFailed, loginSuccess } from "./auth-slice";
import { getImageById } from "../../../../../api/service/image-service";

export const loginProfile=  (values)=> async (dispatch) => {
    
    

    try {
        const respAuth = await login(values);
        console.log("respAuth", respAuth.data);
        encryptedLocalStorage.setItem("token", respAuth.data.token)

        const respUser = await getUser();
        if (respUser) {
            toast("login successfull")
        }
        toast("login successfull")
        dispatch(loginSuccess(respUser.data));
        
       

        


    } catch (err) {
        dispatch(loginFailed());
        error("incorrect email or password try again");

    } 
};
