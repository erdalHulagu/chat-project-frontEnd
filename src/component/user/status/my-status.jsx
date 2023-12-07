import React, { useState } from 'react'
import FriendStatusCard from './friends-status-card'
import { SiInstatus } from 'react-icons/si'


const MyStatus = () => {





  return (
    <>
      <div className='h-full w-full flex'>

        {/* left bar */}
        <div className='w-[40%] rounded-l-lg h-full bg-slate-100 '>
          <div className='flex items-center rounded-l-lg h-[14%] border-b w-[90%]'>
            <div className='flex m-3 ' >
              <img className='mr-2 w-14 h-14 rounded-full' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
              <div>
                <span>My Status</span>
                <p className='text-xs '>No Updates</p>
              </div>
            </div>

          </div>
          <div className='h-[86%] w-full  rounded-bl-lg overflow-hidden overflow-y-scroll scrollbar-thin '>
            <div className='p-2 h-14 w-auto sticky top-0 bg-slate-100 border-b'>
              <p className='p-2  text-gray-600'>RECENT</p>
            </div>

            {[...Array(20)].map((item) => <div className='mx-2  overflow-hidden bg '><FriendStatusCard /></div>)}

          </div>
        </div>
        {/* Right Bar */}
        <div className='w-[60%] h-full flex items-center justify-center'>
          <div>
          <div className=' w-full  flex items-center justify-center '>
            <SiInstatus className='text-gray-600 mb-20 h-40 w-40' />
            </div>
            <p>Click on contact to view up date</p>
          </div>
         
          


        </div>
      </div>
    </>
  )
}

export default MyStatus