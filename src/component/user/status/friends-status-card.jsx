import React from 'react'
import { useNavigate } from 'react-router-dom'

const FriendStatusCard = () => {
   const navigate= useNavigate();
const handleNavigate = () => {
    navigate('/status/:id')
    
}


    return (

        
            <div onClick={handleNavigate} className='h-[14%] w-full flex items-center p-2 hover:bg-slate-200 shadow-md my-1 shadow-slate-400'>
                <img className='h-12 w-12 mr-2 rounded-full' src="https://cdn.pixabay.com/photo/2017/05/28/10/23/swan-2350668_1280.jpg" alt="" />
                <div className=''>
                    <span className='text-sm'>Erdal Hulagu</span>
                    <p className='text-xs'>day at time</p>
                </div>
            </div>
      


    )
}

export default FriendStatusCard