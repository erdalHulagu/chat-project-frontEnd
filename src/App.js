
import { BiSolidUser } from "react-icons/bi";
import ProfileSettingDropdownMenu from "./component/user/my-profile/profile-setting-dropdown-menu";
import CustomRouters from "./router/custom-routers";
import { IoIosHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Main from "./component/user/main/main";




function App() {


  const navigater = useNavigate();

  const hadleHome = () => {
      navigater('/home');
  }
  const handleProfile = () => {
      navigater('/profile');
  }
  const handleSignOut = () => {
      navigater('/');
  }

  return (
   <>
    <Main/>
   </>
           
     
  );
}

export default App;
