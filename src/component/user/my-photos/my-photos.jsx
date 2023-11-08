import React, { useState } from 'react'
import { BiSolidLeftArrowSquare, BiSolidTrash } from 'react-icons/bi';

const MyPhotos = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [photoNormalSize, setPhotoNormalSize] = useState(true);

  const handlePhotoFullSize = () => {
    setFullScreen(true);
    setPhotoNormalSize(false);

  }
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleToggleSize = () => {
    setIsEnlarged(!isEnlarged);
  };



  return (


    <div className={`relative ${isEnlarged ? ' w-screen flex items-center' : 'flex items-center justify-center w-36 h-auto m-1 '}`}>

      <img onClick={handleToggleSize} className='w-full h-auto rounded hover:opacity-90 cursor-pointer  ' src="https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg" alt="" />
      <BiSolidTrash onClick={handleToggleSize} className={`${isEnlarged ? 'hidden' : 'absolute top-0 right-0 text-slate-200  text-2xl mt-1 mr-1 hover:text-red-800 cursor-pointer'}`} />
    </div>


  )
}

export default MyPhotos
