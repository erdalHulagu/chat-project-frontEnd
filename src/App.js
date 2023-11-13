
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/user/home-page';
import RegisterPage from './page/common/register-page';
import LoginPage from './page/common/login-page';
import MenuPage from './page/common/menu-page';
import MyProfilePage from './page/user/my-profile-page';
import FriendProfilePage from './page/user/friend-profile-page';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<MenuPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePages/>} />
        <Route path='/profile' element={<MyProfilePage/>}/>
        <Route path='/friendProfile' element={<FriendProfilePage/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
