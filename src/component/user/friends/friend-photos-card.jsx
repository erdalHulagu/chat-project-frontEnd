import React, { useState } from 'react'
import {  BiSolidLeftArrowSquare, BiSolidTrash } from 'react-icons/bi';

const FriendPhotos = ({isEnlarged, handleToggleSize}) => {

  // const [isEnlarged, setIsEnlarged] = useState(false);

  // const handleToggleSize = () => {
  //   setIsEnlarged(!isEnlarged);
  // };

  
  



  return (


    <div className={`${isEnlarged ? ' w-full h-auto  flex justify-center items-center  ' : 'object-cover  m-2 w-[92%] h-auto rounded hover:w-[96%] hover:flex  shadow-2xl shadow-slate-800 cursor-pointer'}`}>
    {/* <div className={`${isEnlarged ? 'object-fill h-48 w-96 z-10 mb-20 ' : 'flex items-center h-40 w-80 m-4 p-2'}`}> */}
      <div className='w-full h-auto relative '>
        <img onClick={handleToggleSize} className=' object-cover  max-h-[85vh] w-full h-auto rounded hover:opacity-90 cursor-pointer ' src="https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg" alt="" />
          <BiSolidLeftArrowSquare onClick={handleToggleSize}  className={`${!isEnlarged ? 'hidden' : 'hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 left-1 text-slate-200 hover:text-red-800 cursor-pointer'}`} />
          <BiSolidTrash className={`${isEnlarged ? 'hidden' : 'hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 right-1 text-slate-200 hover:text-red-800 cursor-pointer'}`} />
        {/* </div> */}
      </div>
    </div>


  )
}

export default FriendPhotos
