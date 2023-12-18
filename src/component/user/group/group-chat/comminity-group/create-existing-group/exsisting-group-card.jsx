import React from 'react'

const ExistingGroupCard = () => {
  return (
    <div className='flex justify-center w-full h-[62%] '>
        <div className=' flex items-center  w-[90%] h-[6rem] border-b cursor-pointer hover:bg-slate-300 border-slate-400 px-2'>
          <input className='w-6 h-6  ' type="checkbox" />
          <div className='h-full w-[40%] mx-2 flex items-center'>
            <img className='h-[4rem] w-[4rem] rounded-full' src="https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_1280.jpg" alt="" />
          </div>
          <div className='flex flex-col justify-center  pt-4 w-[70%] h-full'>
            <p className='font-bold'>group name</p>
            <p className='text-sm'>( members )</p>
          </div>
        </div>
      </div>
  )
}

export default ExistingGroupCard