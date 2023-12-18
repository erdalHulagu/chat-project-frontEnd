import React, { useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { MdPhotoCamera } from 'react-icons/md'
import { TfiCommentsSmiley } from 'react-icons/tfi'
import img from '../../../../../assets/img/user.webp'
import { BsFillSave2Fill } from 'react-icons/bs'

const CreateGroupCard = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [createGroupChat, setCreateGroupChat] = useState(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    const handleInputVisible = () => {
        setIsActive(!isActive)
    }
    const handleCreateGroupChat = () => {
        setCreateGroupChat(true);

    }

    return (
        <div className=' w-full h-full  rounded-b-lg'>
            <div className='w-full h-full flex flex-col items-center'>
            <div className='flex items-center justify-center w-full h-[40%] '>
                <label htmlFor="imgInput">
                    <div className='rounded-full w-36 h-36 flex items-center justify-center'>
                        <img className='rounded-full cursor-pointer w-36 h-36 my-5 ' src={img} alt="" />
                        <MdPhotoCamera className='absolute ml-20 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                    </div>

                </label>
                <input type="file" id='imgInput' className='hidden' />
            </div>
           
            <div className='w-full h-[20%] rounded-bl-lg '>
                <div className='w-[94%] flex   border-slate-400 border-b mx-[3%] '>
                    <div className='w-full flex flex-col  '>

                        <div className='flex  w-full'>
                            {isActive ? (<input id='imgInput' className=' ml-3  text-slate-800 bottom-0 w-[90%] bg-slate-200  focus:outline-none ' type="text" alt='' autoFocus />) : <h5 className="ml-3 text-sm text-slate-500 w-[90%]" > Type in group name (optional) </h5>}
                            <div className='w-[10] flex justify-end'>
                                <BiSolidPencil onClick={handleInputVisible} id='imgInput' className={'rounded-full hover:opacity-50 hover:bg-white p-2 w-10 h-10 text-lg text-slate-500 hover:text-red-800 cursor-pointer '} />

                            </div>

                        </div>
                    </div>


                </div>
                <div className='w-[94%] h-[90%] bg-slate-400 flex mt-20 mx-[3%]  '>
                    <div className='w-full h-full flex flex-col '>
                        <p className=" text-gray-200 ml-3 text-sm" > Group Description </p>
                        {isVisible &&
                            <p onClick={handleToggleVisibility} id="textarea" className=" text-gray-300  pl-2 text-sm" > ! click on and write something...  You can add rules for your group member to see</p>
                        }
                        {!isVisible && <textarea id="textarea" className='w-full h-[30%] resize-none overflow-hidden pl-2  pb-28  bg-slate-400 mb-2 text-gray-300 bottom-0 focus:outline-none' type="text" alt='' />}

                    </div>

                    <div className='flex justify-end '>

                        <TfiCommentsSmiley className='mt-3 text-gray-200 w-10 h-10 p-2 hover:opacity-30 hover:bg-slate-100 rounded-full hover:text-red-800 cursor-pointer' />
                    </div>

                </div>
                <div className='mt-3  w-full flex items-center justify-center '>

                    <button className='flex items-center bg-blue-900 py-2 px-3 text-gray-300 rounded'> <BsFillSave2Fill className='bg-blue-900 text-gray-300 pl-1 mr-2' />Save</button>
                </div>
            </div>
            </div>
           

        </div>
    )
}

export default CreateGroupCard