import React from 'react'
import { BiSolidLeftArrowSquare, BiSolidPencil } from 'react-icons/bi'
import { IoIosHome, IoMdPhotos } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { MdPhotoCamera, MdOutlineMonochromePhotos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);

    }
    const handleSignOut = () => {
        navigate("/");
    }


    return (
        <div className="h-screen bg-purple-100 ">
            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex w-[20%] left-3 mt-4'>
                    <div className='my-3 ml-[30%] w-full h-full'>
                        <BiSolidLeftArrowSquare className='cursor-pointer text-3xl text-gray-400   hover:text-red-700 ' onClick={handleNavigate} />
                    </div>
                </div>
                <div className='w-[80%] h-40 mt-1  flex  justify-end right-0 '>
                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleNavigate}>
                        <IoIosHome className='mt-1 mr-1 ' />
                        <p>Home</p>
                    </div>
                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950   hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-out</button> */}
                </div>
                <div className=" h-[86vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl " >
                    {/* top bar */}
                    <div className='w-full text-slate-800 bg-slate-100 rounded-t-lg h-[12%] flex  items-center justify-end shadow-slate-950 shadow-2xl border-b'>
                        <div className='w-[50%] flex  items-center justify-between right-0 '>
                            <h4 className='cursor-pointer font-semibold hover:text-red-700'>Profile</h4>
                            <RiUserSettingsFill className='text-slate-800 mr-[3%] text-2xl cursor-pointer hover:text-red-800' />
                        </div>

                    </div>
                    <div className='w-full h-[88%] rounded-b-lg flex'>
                        {/* left bar */}
                        <div className='w-[40%] h-full rounded-b-lg '>
                            <div className='w-full flex items-center border h-full marker:rounded-bl-lg'>
                                <div className='relative bg-slate-200 w-full  h-full top-0 flex flex-col justify-center rounded-b-lg'>

                                    <label htmlFor="imgInput">
                                        <div className=' w-full h-[40vh] flex items-center justify-center'>
                                            <img className='rounded-full cursor-pointer w-48 h-48 my-5 ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                                            <MdPhotoCamera className='absolute cursor-pointer ml-32 text-purple-300 text-3xl' />
                                        </div>

                                    </label>
                                    <input type="file" id='imgInput' className='hidden' />
                                    <div className='h-[30vh]  w-full  border rounded-bl-lg'>
                                        <div className='w-[94%] h[50%] flex   border-slate-400 border-b mx-[3%] '>
                                            <div className='w-full h[50%] flex flex-col  '>
                                                <h5 className="ml-3  text-purple-800 text-lg font-bold w-[20vw] " > Your name </h5>
                                                <input id='imgInput' className='mt-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

                                            </div>

                                            <div className=' w-[50%] flex right-0 justify-end items-end'>
                                                <BiSolidPencil id='imgInput' className='text-2xl text-slate-600 hover:text-red-800 cursor-pointer' />
                                            </div>

                                        </div>
                                        <div className='w-[90%]  flex items-center mx-3'>
                                            <p className=' my-12 flex flex-col items-center font-bold'>
                                                This is not your name. This name will be visible on your account contact
                                            </p>
                                        </div>

                                        <div className='w-[94%] h[50%] flex   border-slate-400 border-b mx-[3%] '>
                                            <div className='w-full h[50%] flex flex-col  '>
                                                <h5 className="ml-3  text-purple-800 text-lg font-bold w-[20vw]" > About </h5>
                                                <input id='imgInput' className='mt-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

                                            </div>

                                            <div className=' w-[50%] flex right-0 justify-end items-end'>
                                                <BiSolidPencil className='text-2xl text-slate-600 hover:text-red-800 cursor-pointer' />
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div >
                        {/* right bar */}
                        <div className='w-[60%] h-full '>
                            <div className='w-full h-20  flex items-center justify-center shadow-slate-900 shadow-2xl bg-blue-950'>
                                <div className='w-[50%] h-full flex items-center justify-start ' >
                                    <FaUserFriends className='ml-3 text-gray-400 text-xl  hover:text-red-800 cursor-pointer' />
                                </div>
                                <div className='w-[50%] h-full flex items-center justify-end '>
                                    <IoMdPhotos className='text-gray-400 text-xl  hover:text-red-800 cursor-pointer' />
                                    <MdOutlineMonochromePhotos className='text-gray-400 text-xl mx-3 hover:text-red-800 cursor-pointercursor-pointer' />

                                </div>

                            </div>
                        </div>
                    </div>






                </div>
            </div>
        </div>
        // ------

    )
}

export default Profile
