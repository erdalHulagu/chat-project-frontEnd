import React, { useEffect, useState } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { PiUserListFill, PiPlusCircleFill } from 'react-icons/pi'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiEmojiStickerFill } from 'react-icons/ri'

import { BsFillChatLeftDotsFill } from 'react-icons/bs'
import MessageCard from '../chat/message-card';
import ChatCard from '../chat/chat-card'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import UserHomeDropDownMenu from './user-home-dropdown-menu'
import { searchUsers } from '../../../redux/store/slices/user/user/user-search-action'
import { getAllUsersChats } from '../../../redux/store/slices/chat/chat-thunks/get-all-users-chats'
import { singleUserChat } from '../../../redux/store/slices/chat/chat-thunks/single-user-chat'

const UserHome = () => {
    const dispatch = useAppDispatch();
    const { isUserLogin, user } = useAppSelector((state) => state.auth);
    const allChats = useAppSelector((state) => state.allUsersChat.allChats);
    const searchResults = useAppSelector((state) => state.userSearch.searchResults);
    const navigate = useNavigate();



    const [query, setQuery] = useState(false)
    const [search, setSearch] = useState("")
    const [showUserList, setShowUserList] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        if (isUserLogin) {
            dispatch(getAllUsersChats());
            dispatch(searchUsers())
            handleCreateChat();
        }
    }, [isUserLogin, dispatch]);


    const handleSearch = (value) => {
        setSearch(value);
        if (value) {
            dispatch(searchUsers({ firstName: value }));
        }
    };
   

    const handleCreateChat = (userId) => {
        dispatch(singleUserChat(userId));
        setSelectedUserId(userId);
        setQuery(true);
    }

    const handleUserList = () => {
        setShowUserList(!showUserList);

    }

    const handleProfile = () => {
        navigate("/profile");

    }
    const handleNavigateStatus = () => {
        navigate("/status");
    }
    const handleNavigateGroup = () => {
        navigate("/group");
    }

    const selectedUser = searchResults.find(user => user.id === selectedUserId);


    return (
        < div className='h-full w-full absolute '>
            <div className='w-full  bg-slate-100 shadow-2xl shadow-slate-900 rounded-t-lg h-24  flex  items-center justify-between border-b z-10  '>

                <div className='flex  items-center w-[50%] '>
                    {/* nav bar */}

                    <>
                        <img onClick={handleProfile} className=' hover:opacity-70 border-2 cursor-pointer w-20 h-20 rounded-full my-5 mx-4' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                        <p onClick={handleProfile} className='cursor-pointer text-gray-950 hover:text-red-700 text-xs font-extrabold'>{user.firstName} {user.lastName}</p>
                    </>

                </div>

                <div className=' w-[60%] '>
                    <ul className='left-0 text-decoration: none flex justify-between items-center'>
                        <li className=''><HiUserGroup className='text-blue-950 w-12 h-12 p-3  hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' onClick={handleNavigateGroup} /></li>
                        <li className=''><SiInstatus className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' onClick={handleNavigateStatus} /></li>
                        <li className=''><BsFillChatLeftDotsFill className=' text-blue-950  w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' /></li>
                        <li className='' ><UserHomeDropDownMenu /></li>

                    </ul>
                </div>

            </div>
            {/* left column */}

            <div className=' absolute h-[90%] w-full flex '>


                <div className='rounded-bl-lg min-w-28  w-[40%] h-full bg-gradient-to-b from-slate-100  to-slate-50 border-r'>
                    <div className='sticky top-0 flex justify-between h-28  shadow-slate-600  shadow-md '>
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


                            <div onClick={handleUserList} className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mt-1  '>
                                <PiUserListFill className='text-xl mt-1 text-blue-950 ml-4  hover:text-red-700 ' />
                                <p className='ml-2 mt-1 text-sm'>Chat List</p>
                            </div>

                        </div>
                    </div>
                    <div className='max-h-[90%] h-[84%] overflow-clip hover:overflow-y-scroll' >
                        {(search || showUserList) && searchResults?.map((item, index) => (
                            <div key={index} handleCreatedChat={handleCreateChat}>
                                <ChatCard

                                    item={selectedUser}
                                />
                            </div>
                        ))}
                    </div>


                </div>
                {/* right column */}

                <div className=' w-[60%] h-full relaltive flex flex-col rounded-br-lg '>

                    {query && selectedUserId ?
                        <div className='h-30 w-full rounded-b-lg  overflow-hidden absolute'>
                            <div className='w-full  bg-slate-200 top-0 sticky'>
                                <ChatCard item={selectedUser} />
                            </div>
                            <div className='w-full h-[84%] overflow-y-scroll overflow-clip px-[5%]'>
                                <div className=' flex flex-col justify-center  py-20 space-y-10 '>
                                    {[...Array(15)].map((item, id) => <MessageCard key={id} isRegUserMessage={id % 2 === 0} content={"message"} />)}  {/*1:18:20 VD=2*/}
                                </div>

                            </div>

                            <div className=' flex items-between justify-center fixed bottom-0 bg-slate-200 h-12 w-[60%] rounded-br-lg '
                                style={{ position: `absolute` }}>

                                <div className=' flex items-center justify-center rounded-b-lg '>
                                    <RiEmojiStickerFill className='hover:text-red-800 ml-1 text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300  cursor-pointer rounded-full' />
                                    <PiPlusCircleFill className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full' />
                                </div>
                                <div className=' max-h-20 flex items-center justify-center w-full'>
                                    <input type='text' className='max-h-20  w-full bg-slate-100   rounded p-3 py-2 text-slate-950' />
                                </div>
                                <div className=' flex items-center justify-center rounded-b-lg '>
                                    < FaMicrophoneAlt className=' text-blue-950 w-12 h-12 p-3 hover:opacity-80 hover:bg-gray-300 hover:text-red-800 cursor-pointer rounded-full  mr-1 ' />

                                </div>

                            </div>

                        </div>
                        : <div className='  flex items-center justify-center  text-white object-cover h-full w-full text-center '
                            style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg') ` }}>
                            <div className='relative flex items-center justify-center w-[80%]'>
                                <p className='text-slate-200 absolute text-2xl font-bold'>Connect To The World</p>
                            </div>
                        </div>}

                </div>

            </div>

        </div>

    )
}

export default UserHome
