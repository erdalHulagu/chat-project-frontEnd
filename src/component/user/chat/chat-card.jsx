
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store/hooks';

const ChatCard = () => {
    const navigate = useNavigate();
    const { reqUser } = useAppSelector((state) => state.userSearch);
const hadleMessageProfile = () => {

navigate('/Profile');
    
  
}


    return (
        
            <div className='w-[94%]flex  shadow-slate-600 shadow-md hover:bg-slate-200 '>
                    <div className='flex  justify-between items-center w-full'>
                        <div className='w-24 h-24 mt-3 rounded-full flex flex-col items-center '>
                            <img onClick={hadleMessageProfile} className=' hover:opacity-40 cursor-pointer w-14 h-14 rounded-full ' src="https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg " alt="erdal" />{/*https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg */}
                            <p className='text-blue-950 hover:text-red-700 cursor-pointer text-xs'>{reqUser.firstName}</p>
                        </div>
                        <div className='flex flex-col justify-between mr-2 '>
                            <p className='text-blue-950 text-xs mt-2'>time stamp</p>
                            <p className='text-blue-950 text-xs '>message...</p>
                        </div>
                    </div>
            </div>
        
    )
}

export default ChatCard
