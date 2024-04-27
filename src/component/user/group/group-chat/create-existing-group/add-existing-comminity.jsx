import React, { useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import ExistingGroupCard from './exsisting-group-card';

const AddExsistingComminity = () => {

  const [isActive, setIsActive] = useState(false);

  const handleInputVisible = () => {
    setIsActive(!isActive)
  }


  return (
   <>
      <div className='sticky-top bg-slate-200 shadow-sm shadow-slate-900'>
          <p className='py-3 px-3  border-slate-400 border-b   text-gray-500 text-lg'> Add exsisting group in to comminity (optionlal) </p>
          <div className='h-[4rem] w-[90%]mx-3 '>
            <div className='flex h-[4rem]'>
              {isActive ? (<input id='imgInput' className=' ml-3  text-slate-800 bottom-0 w-[90%] bg-slate-200  focus:outline-none ' type="text" alt='' autoFocus />) : <h5 className="ml-3 text-sm text-slate-500 w-[90%]" > Search group name </h5>}
              <div className=' w-[10] flex justify-end '>
                <BiSolidPencil onClick={handleInputVisible} id='imgInput' className={'rounded-full hover:opacity-50 hover:bg-white mt-2 p-2 w-10 h-10 text-lg text-slate-500 hover:text-red-800 cursor-pointer '} />
              </div>
            </div>

          </div>

        </div>
   
      <div className='w-full h-[68%]  bg-slate-200 rounded  overflow-clip hover:overflow-y-scroll'>
     

        
          <div className=''>
            {[...Array(15)].map(() => <ExistingGroupCard />)}

          
        </div>

      </div>
   
      </>

  )
}

export default AddExsistingComminity