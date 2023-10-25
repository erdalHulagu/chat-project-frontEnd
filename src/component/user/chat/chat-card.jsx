
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();

const hadleMessageProfile = () => {

navigate('/Profile');
    
  
}


    return (
        
            <div className='w-full flex border-b  border-blue-950 top-0 hover:bg-slate-400'>
                    <div className='flex justify-between w-full'>
                        <div className=' '>
                            <img onClick={hadleMessageProfile} className='ml-3 mt-2 hover:border-purple-400 border-2 cursor-pointer w-14 h-14 rounded-full ' src="https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg " alt="erdal" />{/*https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg */}
                            <p className='text-blue-950 ml-3 hover:text-red-700 cursor-pointer text-xs'>user name</p>
                        </div>
                        <div className='flex flex-col justify-between mr-2 '>
                            <p className='text-blue-950 text-xs mt-2'>time stamp</p>
                            <p className='text-blue-950 text-xs '>message...</p>
                        </div>
                    </div>
            </div>
        
    )
}

export default Chat
