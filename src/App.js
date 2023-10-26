
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/user/home-page';
import ProfilePages from './page/user/profile-pages';
import ChatCard from './component/user/chat/chat-card';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<HomePages/>} />
        <Route path='/profile' element={<ProfilePages/>}/>
        <Route path="/chat" element={<ChatCard/>} />
      </Routes>
    
    </div>
  );
}

export default App;
