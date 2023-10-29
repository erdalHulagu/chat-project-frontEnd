
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/user/home-page';
import ProfilePages from './page/user/profile-pages';
import ChatCard from './component/user/chat/chat-card';
import RegisterPage from './page/common/register-page';
import LoginPage from './page/common/login-page';
import MenuPage from './page/common/menu-page';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<MenuPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePages/>} />
        <Route path='/profile' element={<ProfilePages/>}/>
        <Route path="/chat" element={<ChatCard/>} />
      </Routes>
    
    </div>
  );
}

export default App;
