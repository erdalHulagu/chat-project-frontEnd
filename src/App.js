
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/home-page';
import ProfilePages from './page/user/profile-pages';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<HomePages/>} />
        <Route path='/profile' element={<ProfilePages/>}/>
        {/* <Route path="/chat" element={<Chat/>} /> */}
      </Routes>
    
    </div>
  );
}

export default App;
