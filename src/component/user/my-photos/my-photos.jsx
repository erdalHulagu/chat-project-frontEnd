import React,{ Col }  from 'react'
import { ImBin } from 'react-icons/im'

const MyPhotos = () => {
  return (

    <div className='relative w-80  border-blue-950 border'>
      
        <img className='absolute hover:opacity-90 cursor-pointer' src="https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg" alt="" />
        <ImBin className='m-2 absolute right-0 top-0  text-purple-200 text-2xl hover:text-red-800 cursor-pointer'/>
    </div>
  )
}

export default MyPhotos
