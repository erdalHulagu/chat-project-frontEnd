
import { BiSolidUser } from "react-icons/bi";
import ProfileSettingDropdownMenu from "./component/user/my-profile/profile-setting-dropdown-menu";
import CustomRouters from "./router/custom-routers";
import { IoIosHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";




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
    <div fluid className="h-screen bg-purple-100 ">

      <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
        <div className='h-30 w-30 flex left-3 mt-4'>
          <div className='h-20 w-20 hover:opacity-30  hover:bg-gray-100 rounded-full flex justify-center items-center ml-10'>
            {/* <img className=' rounded-full cursor-pointer w-20 h-20 absolute ' src={require(`./assets/img/logo.png`)} alt="" /> */}
          </div>
        </div>
        <div className='w-full h-40 mt-1  flex  justify-end right-0'>
          <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={hadleHome}>
            <IoIosHome className='mt-1 mr-1 ' />
            <p>- Home</p>
          </div>
          <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleProfile}>
            <BiSolidUser className='mt-1 mr-1 ' />
            <p>- Profile</p>
          </div>
          <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-out</button>
        </div>

            <CustomRouters />
          
      </div>
    </div>

  );
}

export default App;
