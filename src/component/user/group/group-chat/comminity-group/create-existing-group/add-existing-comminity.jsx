import React, { useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import ExistingGroupCard from './exsisting-group-card';

const AddExsistingComminity = () => {

  const [isActive, setIsActive] = useState(false);

  const handleInputVisible = () => {
    setIsActive(!isActive)
  }


  return (
    <div className='w-full h-[86%]  bg-slate-200 rounded overflow-hidden overflow-y-scroll'>
<div className='sticky-top bg-slate-200 '>
<p className='py-10 px-3  border-slate-400 border-b text-gray-500 text-lg'> Add exsisting group in to comminity (optionlal) </p>
      <div className='h-[5rem] w-[90%] border-slate-400 border-b mx-3 '>
        <div className='flex h-[4rem]'>
          {isActive ? (<input id='imgInput' className=' ml-3  text-slate-800 bottom-0 w-[90%] bg-slate-200  focus:outline-none ' type="text" alt='' autoFocus />) : <h5 className="ml-3 text-sm text-slate-500 w-[90%]" > Search group name (optional) </h5>}
          <div className=' w-[10] flex justify-end '>
            <BiSolidPencil onClick={handleInputVisible} id='imgInput' className={'rounded-full hover:opacity-50 hover:bg-white mt-2 p-2 w-10 h-10 text-lg text-slate-500 hover:text-red-800 cursor-pointer '} />
          </div>
        </div>

      </div>
</div>
     
      {[...Array(15)].map(()=> <div className='flex flex-col '><ExistingGroupCard/></div>) }

    </div>

  )
}

export default AddExsistingComminity