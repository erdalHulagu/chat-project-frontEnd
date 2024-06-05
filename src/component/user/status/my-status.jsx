import React, { useState } from 'react'
import FriendStatusCard from './friends-status-card'
import { SiInstatus } from 'react-icons/si'
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import StatusDisplayer from './status-displayer';


const MyStatus = () => {
  const navigate = useNavigate();
  const [friendStatus, setFriendStatus] = useState(false)

  const handleNavigete = () => {
    navigate(-1)
  }

  const handleFriendStatus = () => {
    setFriendStatus(true)

  }


  return (
    <>

      {friendStatus ? <StatusDisplayer />
        :
        <div className='h-full w-full flex absolute bg-slate-300 rounded'>
          {/* left bar */}
          <div className='w-[40%] lg:w-[25%] sm: rounded-l-lg h-full bg-slate-100 '>
            <SiInstatus onClick={handleFriendStatus} />
            <div className='flex items-center rounded-l-lg h-[14%] border-b w-[90%]'>
              <div className='flex m-3 ' >
                <img className='mr-2 w-14 h-14 rounded-full' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                <div>
                  <span>My Status</span>
                  <p className='text-xs '>No Updates</p>
                </div>
              </div>

            </div>

            <div className='p-2 h-14 w-auto sticky top-0 bg-slate-100 border-b'>
              <p className='p-2  text-gray-600'>RECENT</p>
            </div>
            <div className='h-[86%] w-full  rounded-bl-lg '>
              <div className='w-[96%] h-[90%] mx-1 hover:overflow-y-scroll overflow-clip'>
                {[...Array(20)].map((item,id) => <div><FriendStatusCard key={id} /></div>)}
              </div>
            </div>
          </div>
          {/* Right Bar */}
          <div className='h-full w-[60%] lg:w-[75%]'>
            <AiFillCloseCircle onClick={handleNavigete} className='absolute m-1  text-blue-950 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full right-0' />
            <div className='w-full h-full flex items-center justify-center'>

              <div>
                <div className=' w-full  flex items-center justify-center '>
                  <SiInstatus className='text-gray-600 mb-20 h-40 w-40' />
                </div>
                <p>Click on contact to view up date</p>
              </div>




            </div>
          </div>


        </div>
      }
    </>
  )
}

export default MyStatus