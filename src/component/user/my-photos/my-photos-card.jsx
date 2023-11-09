import React, { useState } from 'react'
import {  BiSolidTrash } from 'react-icons/bi';

const MyPhotos = () => {

  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleToggleSize = () => {
    setIsEnlarged(!isEnlarged);
  };



  return (


    <div className={`${isEnlarged ? 'object-fill h-48 w-96 z-10 mb-20 ' : 'flex items-center h-40 w-80 m-4 p-2'}`}>
      <div className='relative w-full h-full  '>
        <img onClick={handleToggleSize} className='w-full h-auto rounded hover:opacity-90 cursor-pointer  ' src="https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg" alt="" />
       


          <BiSolidTrash className={`${isEnlarged ? 'hidden' : 'hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-2 right-2 text-slate-200 hover:text-red-800 cursor-pointer'}`} />
        {/* </div> */}
      </div>
    </div>


  )
}

export default MyPhotos
