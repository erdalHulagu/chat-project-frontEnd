import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { BiFilter } from 'react-icons/bi'
import { PiUserListFill } from 'react-icons/pi'
import { BsFillChatLeftDotsFill, BsArrowDownSquareFill } from 'react-icons/bs'
import Chat from '../../user/chat/chat-card';
import MessageCard from '../../user/chat/message-card';


const Home = () => {

    const [query, setQuery] = useState(false)
    const [isOdd, setIsOdd] = useState([])
    const [search, setSearch] = useState("")
    const [userList, setUserList] = useState(false)

    const hadleUserList = () => {
        setUserList(true);
    }


    const handleSearch = () => { }

    const handleQuery = () => {
        setQuery(true);
    }
    const handleCurrentMessage = (num) => {

        setIsOdd(num / 2 === 0);
    }


    return (
        <div>
            <div fluid className="h-screen bg-gray-200 ">
                <div className="h-40 bg-blue-950 flex items-end justify-center shadow-2xl">
                    <div className=" bg-gradient-to-b from-red-600 via-red-300 to-red-100 absolute  w-[80%] top-20 left-[10%] right-[10%] rounded shadow-2xl " >
                        <div className='w-full relative  bg-slate-200 shadow-lg rounded-t-lg h-32 p-0 flex  items-center justify-between'>
                            <div className='flex  items-center w-[60%] '>
                                {/* nav bar */}
                                <img className=' hover:border-blue-900 border-2 cursor-pointer w-24 h-24 rounded-full my-5 mx-4' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                                <p className='cursor-pointer text-blue-950 hover:text-red-700 '>user name</p>
                            </div>
                            <div className=' w-[40%] mr-5'>
                                <ul className='left-0 text-decoration: none flex justify-between items-center'>
                                    <li className=''><HiUserGroup className='text-2xl text-blue-950 hover:text-red-700 cursor-pointer' /></li>
                                    <li className=''><SiInstatus className='text-xl text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                                    <li className=''><BsFillChatLeftDotsFill className='text-xl text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                                    <li className='' ><BsArrowDownSquareFill className='text-xl text-blue-950  hover:text-red-700 cursor-pointer' /></li>

                                </ul>
                            </div>
                        </div>
                        {/* ------------------- */}
                        <div className='w-full flex'>
                            {/* left column */}
                            <div className=' min-w-28 overflow-y-scroll w-[40%] h-[75vh] bg-gradient-to-b from-slate-300  to-slate-100 '>
                                <div className='sticky top-0 flex justify-between'>
                                    {/* search */}
                                    < div className=' relative my[10%] w-[100%]  pt-3  top-0    bg-slate-400'>

                                        <input className='w-[73%] h-10 rounded mt-3 mx-3 pl-10 text-blue-950'

                                            type="text"
                                            placeholder="search..."
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                                handleSearch(e.target.value)
                                            }}
                                            value={search}
                                        />
                                        <ImSearch className='absolute  top-11 left-6 text-blue-950' />
                                        <div className='right-1 absolute top-10'>
                                            <BiFilter className='hover:text-red-700 cursor-pointer text-2xl' />
                                        </div>
                                        <div className='hover:text-red-700 cursor-pointer' onClick={hadleUserList}>
                                            <div className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mx-2 mt-3 border-b border-blue-950'>
                                                <PiUserListFill className='text-2xl  hover:text-red-700 text-blue-950 ml-4' />
                                                <p className='ml-2'>Chat List</p>

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
                                    {(search || userList) && [1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <div onClick={handleQuery} className='mx-2 border-b border-blue-950 overflow-hidden bg '><Chat /></div>)}
                                </div>


                            </div>
                            {/* right column */}

                            <div className=' relative border-blue-900 overflow-scroll w-[65%] h-[75vh]'>
                                {query ?
                                    <div className='h-30 w-full bg-slate-300 '>
                                        <div className='absolute w-full bg-slate-400 top-0 sticky'>
                                            <Chat />
                                        </div>


                                        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <div className='overflow-hidden '><MessageCard /></div>)}
                                        <footer className=' sticky rounded flex items-center  bg-slate-200 h-10  border-blue-900 bottom-0   w-[100%]'>
                                            <input className='mx-4 bg-slate-100 w-[100%] h-7 rounded pl-10 text-blue-950' />
                                        </footer>
                                    </div>
                                    : <div className=' object-cover h-full w-full'><img className='object-cover w-full min-h-screen-sm' src="https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg" alt="" />

                                    </div>}

                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home