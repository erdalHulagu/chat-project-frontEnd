import React, { useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { BiFilter } from 'react-icons/bi'
import { PiUserListFill, PiPlusCircleFill } from 'react-icons/pi'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiEmojiStickerFill } from 'react-icons/ri'

import { BsFillChatLeftDotsFill, BsArrowDownSquareFill } from 'react-icons/bs'
import MessageCard from '../../user/chat/message-card';
import Profil from '../../user/profile/profile';
import ChatCard from '../../user/chat/chat-card'
import { useNavigate } from 'react-router-dom'

const Main = () => {

    const [query, setQuery] = useState(false)
    const [search, setSearch] = useState("")
    const [userList, setUserList] = useState(false)
    const [profil, setProfil] = useState(false);

    const hadleUserList = () => {
        setUserList(true);
    }


    const handleSearch = () => { }

    const handleQuery = () => {
        setQuery(true);
    }

    const handleProfile = () => {
        setProfil(true);

    }

    return (
        < >
            <div className='w-full  bg-slate-100 shadow-lg rounded-t-lg h-[12%] p-0 flex  items-center justify-between '>
                <div className='flex  items-center w-[60%] '>
                    {/* nav bar */}
                    <img onClick={handleProfile} className=' hover:border-purple-500  border-2 cursor-pointer w-20 h-20 rounded-full my-5 mx-4' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                    <p className='cursor-pointer text-blue-950 hover:text-red-700 '>user name</p>
                </div>
                <div className=' w-[40%] mr-5'>
                    <ul className='left-0 text-decoration: none flex justify-between items-center'>
                        <li className=''><HiUserGroup className='text-xl text-blue-950 hover:text-red-700 cursor-pointer' /></li>
                        <li className=''><SiInstatus className='text-lg text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                        <li className=''><BsFillChatLeftDotsFill className='text-lg text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                        <li className='' ><BsArrowDownSquareFill className='text-lg text-blue-950  hover:text-red-700 cursor-pointer' /></li>

                    </ul>
                </div>
            </div>

            {profil ? <Profil />
                : <div className='h-[88%] w-full flex  rounded-b-lg'>
                    {/* left column */}

                    <div className='rounded-b-lg min-w-28 overflow-y-scroll w-[40%] h-full bg-gradient-to-b from-slate-300  to-slate-100 '>
                        <div className='sticky top-0 flex justify-between'>
                            {/* search */}
                            < div className=' relative  w-full  pt-1  top-0    bg-slate-200'>

                                <input className='w-[94%] h-8 rounded  ml-3  mt-3 pl-10 right-2 text-blue-950'

                                    type="text"
                                    placeholder="search..."
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        handleSearch(e.target.value)
                                    }}
                                    value={search}
                                />
                                <ImSearch className='absolute  top-7 left-6 text-blue-950' />
                                <div className='right-3 mr-3 absolute bottom-4'>
                                    <BiFilter className='hover:text-red-700 cursor-pointer text-2xl' />
                                </div>
                                <div className='hover:text-red-700 cursor-pointer' onClick={hadleUserList}>
                                    <div className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mt-1 border-b border-blue-950'>
                                        <PiUserListFill className='text-xl mt-1 hover:text-red-700 text-blue-950 ml-4' />
                                        <p className='ml-2 mt-1 text-sm'>Chat List</p>

                                    </div>
                                </div>
                                {/* <BiFilter className='mt-10 mr-3 text-2xl hover:text-red-700 cursor-pointer' /> */}
                            </div>
                            {/*                                     
                                    <div className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mx-2 my-3 border-b border-blue-950'>
                                        <PiUserListFill className='text-2xl  hover:text-red-700 text-blue-950 ml-4' />
                                        <p className='ml-2'>Chat List</p>
                                    </div> */}
                        </div>
                        {/* list of chat */}
                        {/* <div className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mx-2 my-3 border-b border-blue-950'>
                                    <PiUserListFill className='text-2xl  hover:text-red-700 text-blue-950 ml-4' />
                                    <p className='ml-2'>Chat List</p>
                                </div> */}
                        <div >
                            {/* Chat burata geklecek */}
                            {(search || userList) && [...Array(20)].map((item) => <div onClick={handleQuery} className='mx-2 border-b border-blue-950 overflow-hidden bg '><ChatCard /></div>)}
                        </div>


                    </div>
                    {/* right column */}

                    <div className=' overflow-scroll w-[60%] h-full relaltive flex flex-col rounded-b-lg'>

                        {query ?
                            <div className='h-30 w-full rounded-b-lg '>
                                <div className='w-full  bg-slate-200 top-0 sticky'>
                                    <ChatCard />
                                </div>


                                {[...Array(15)].map((item, id) => <div key={id} className='overflow-hidden w-full'><MessageCard /></div>)}
                                <div className=' flex items-between justify-center fixed bottom-0 bg-slate-200 h-16 w-[60%] rounded-br-lg '  
                                style={{position: `absolute`}}>

                                    <div className=' flex items-center justify-center rounded-b-lg '>
                                        <RiEmojiStickerFill className='hover:text-red-700 cursor-pointer text-2xl  mx-3' />
                                        <PiPlusCircleFill className='hover:text-red-700 cursor-pointer text-2xl' />
                                    </div>
                                    <div className='  h-20 flex items-center justify-center w-full'>
                                        <textarea type='text' className=' w-[94%] bg-slate-100  h-12 mb-3 rounded p-3 py-2 text-slate-950' />
                                    </div>
                                    <div className=' flex items-center justify-center rounded-b-lg '> 
                                    < FaMicrophoneAlt className='hover:text-red-700 cursor-pointer text-2xl  mr-4 ' />

                                    </div>
                                   
                                </div>

                            </div>
                            : <div className='  flex items-center justify-center  text-white object-cover h-full w-full text-center'
                                style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg') `, opacity: `0.5 ` }}>
                                <div className='relative flex items-center justify-center w-[16%]'>
                                    <p className='absolute text-lg'>asiliasiakausbdklaujsbskjdbcskdjbcls</p>
                                </div>
                            </div>}

                    </div>

                </div>}

        </>
    )
}

export default Main
