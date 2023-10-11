import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch } from 'react-icons/im'
import { BiFilter } from 'react-icons/bi'
import { PiUserListFill } from 'react-icons/pi'
import { BsFillChatLeftDotsFill, BsArrowDownSquareFill } from 'react-icons/bs'
import Chat from '../../user/chat/chat';
import CurrentMessage from '../../user/chat/currentMessage';


const Home = () => {

    const [query, setQuery] = useState(false)
    const [isOdd, setIsOdd] = useState([])

    const handleQuery = () => {
        setQuery(true);
    }
 const handleCurrentMessage=(num)=>{

   setIsOdd(num / 2===0);
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
                            <div className=' w-[40%] mr-2'>
                                <ul className='left-0 text-decoration: none flex justify-between items-center'>
                                    <li className=' '><HiUserGroup className='text-blue-950 hover:text-red-700 cursor-pointer' /></li>
                                    <li className=''><SiInstatus className='text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                                    <li className=''><BsFillChatLeftDotsFill className='text-blue-950  hover:text-red-700 cursor-pointer' /></li>
                                    <li className='' ><BsArrowDownSquareFill className='text-blue-950  hover:text-red-700 cursor-pointer' /></li>

                                </ul>
                            </div>
                        </div>
                        {/* ------------------- */}
                        <div className='w-full flex'>
                            {/* left column */}
                            <div className='min-w-28 overflow-y-scroll w-[40%] h-[75vh] bg-gradient-to-b from-slate-300  to-slate-100 '>
                                <div className='flex justify-between'>
                                    {/* search */}
                                    <div className=' relative my[15%] w-[80%]  pt-3 mx-3  mt-3'>
                                        <input className='w-[100%] h-10 rounded pl-10 text-blue-950' placeholder='search or start new chat' />
                                        <ImSearch className='absolute top-7 left-2 text-blue-950' />
                                    </div>
                                    <BiFilter className='mt-10 mr-3 text-2xl hover:text-red-700 cursor-pointer' />
                                </div>
                                {/* list of chat */}
                                <div className='cursor-pointer  text-blue-950 hover:text-red-700 flex  mx-2 my-3 border-b border-blue-950'>
                                    <PiUserListFill className='text-2xl  hover:text-red-700 text-blue-950 ml-4' />
                                    <p className='ml-2'>Chat List</p>
                                </div>
                                <div className=' border-b border-blue-950'>
                                    {/* Chat burata geklecek */}
                                    {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <div onClick={handleQuery} className='overflow-hidden bg  border-blue-950 '><Chat /></div>)}
                                </div>


                            </div>
                            {/* right column */}

                            <div className='bootom-0 overflow-scroll w-[65%] h-[75vh] border-red-700'>
                                {query ?
                                    <div className='h-30 w-full bg-slate-300 '>
                                        <Chat />
                                        
                                        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <div className='overflow-hidden '><CurrentMessage/></div>)}
                                        
                                    </div>
                                    : <div className=' object-cover h-full w-full'><img className='object-cover w-full min-h-screen-sm' src="https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg" alt="" /></div>}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home