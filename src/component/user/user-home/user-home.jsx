import React, { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { PiUserListFill, PiPlusCircleFill } from 'react-icons/pi'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiEmojiStickerFill } from 'react-icons/ri'

import { BsFillChatLeftDotsFill, BsArrowDownSquareFill } from 'react-icons/bs'
import MessageCard from '../chat/message-card';
import ChatCard from '../chat/chat-card'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {

    const navigate = useNavigate();

    const [query, setQuery] = useState(false)
    const [search, setSearch] = useState("")
    const [userList, setUserList] = useState(false)

    const hadleUserList = () => {
        setUserList(true);
    }


    const handleSearch = () => { }

    const handleQuery = () => {
        setQuery(true);
    }

    const handleProfile = () => {
        navigate("/profile");

    }
    const handleNavigateStatus = () => {
        navigate("/status");
    }
    

    return (
        < div className='h-[98%] w-full'>
            <div className='w-full  bg-slate-100 shadow-2xl shadow-slate-900 rounded-t-lg h-24 p-0 flex  items-center justify-between border-b z-10  '>
                <div className='flex  items-center w-[50%] '>
                    {/* nav bar */}
                    <img onClick={handleProfile} className=' hover:opacity-70 border-2 cursor-pointer w-20 h-20 rounded-full my-5 mx-4' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                    <p className='cursor-pointer text-blue-950 hover:text-red-700 text-xs'>user name</p>
                </div>
                <div className=' w-[60%] '>
                    <ul className='left-0 text-decoration: none flex justify-between items-center'>
                        <li className=''><HiUserGroup className='text-blue-950 w-12 h-12 p-3  hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' /></li>
                        <li className=''><SiInstatus className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' onClick={handleNavigateStatus} /></li>
                        <li className=''><BsFillChatLeftDotsFill className=' text-blue-950  w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' /></li>
                        <li className='' ><BsArrowDownSquareFill className=' text-blue-950 w-12 h-12 p-3  hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full mr-1' /></li>

                    </ul>
                </div>
            </div>
            <div className='h-[88%] w-full flex  rounded-b-lg'>
                {/* left column */}

                <div className='rounded-b-lg min-w-28 overflow-hidden overflow-y-scroll w-[40%] h-full bg-gradient-to-b from-slate-300  to-slate-100 '>
                    <div className='sticky top-0 flex justify-between'>
                        {/* search */}
                        < div className=' relative  w-full  pt-1  top-0    bg-slate-200'>

                            <input className='w-[94%] h-8 rounded  mx-2  mt-3 pl-10 right-2 text-blue-950'

                                type="text"
                                placeholder="search..."
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                value={search}
                            />
                            <ImSearch className='absolute  top-7 left-6 text-blue-950' />
                           
                            
                                <div onClick={hadleUserList} className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mt-1  border-b shadow-slate-950  shadow-2xl '>
                                    <PiUserListFill className='text-xl mt-1 text-blue-950 ml-4  hover:text-red-700 ' />
                                    <p className='ml-2 mt-1 text-sm'>Chat List</p>

                                </div>
                            
                        </div>
                    </div>
                    <div >
                        {(search || userList) && [...Array(20)].map((item) => <div onClick={handleQuery} className='mx-2  overflow-hidden bg '><ChatCard /></div>)}
                    </div>


                </div>
                {/* right column */}

                <div className='overflow-hidden overflow-y-scroll w-[60%] h-full relaltive flex flex-col rounded-br-lg'>

                    {query ?
                        <div className='h-30 w-full rounded-b-lg '>
                            <div className='w-full  bg-slate-200 top-0 sticky'>
                                <ChatCard />
                            </div>


                            {[...Array(15)].map((item, id) => <div key={id} className='w-full h-auto'><MessageCard /></div>)}
                            <div className=' flex items-between justify-center fixed bottom-0 bg-slate-200 h-12 w-[60%] rounded-br-lg '
                                style={{ position: `absolute` }}>

                                <div className=' flex items-center justify-center rounded-b-lg '>
                                    <RiEmojiStickerFill className='hover:text-red-800 ml-1 text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300  cursor-pointer rounded-full' />
                                    <PiPlusCircleFill className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' />
                                </div>
                                <div className=' max-h-20 flex items-center justify-center w-full'>
                                    <textarea type='text' className='max-h-20  w-full bg-slate-100   rounded p-3 py-2 text-slate-950' />
                                </div>
                                <div className=' flex items-center justify-center rounded-b-lg '>
                                    < FaMicrophoneAlt className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full  mr-1 ' />

                                </div>

                            </div>

                        </div>
                        : <div className='  flex items-center justify-center  text-white object-cover h-full w-full text-center opacity-20'
                            style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg') `}}>
                            <div className='relative flex items-center justify-center w-[16%]'>
                                <p className='absolute text-lg'>asiliasiakausbdklaujsbskjdbcskdjbcls</p>
                            </div>
                        </div>}

                </div>

            </div>

        </div>
    )
}

export default UserHome
