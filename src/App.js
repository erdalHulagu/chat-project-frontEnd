
import { Route, Routes } from 'react-router-dom';
import HomePages from './page/home-page';

function App() {
  return (
    <div className="App ">
     <Routes>
        <Route path="/" element={<HomePages/>} />
        {/* <Route path="/chat" element={<Chat/>} /> */}
      </Routes>
    
    </div>
  );
}

export default App;
