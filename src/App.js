
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/user/home-page';
import ProfilePages from './page/user/profile-pages';
import ChatCard from './component/user/chat/chat-card';
import Main from './component/common/main/main';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/home" element={<HomePages/>} />
        <Route path='/profile' element={<ProfilePages/>}/>
        <Route path="/chat" element={<ChatCard/>} />
      </Routes>
    
    </div>
  );
}

export default App;
