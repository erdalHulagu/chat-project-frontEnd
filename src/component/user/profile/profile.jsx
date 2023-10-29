import React from 'react'
import { BiSolidLeftArrowSquare } from 'react-icons/bi'
import { IoIosHome } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);

    }

    return (
        <div fluid className="h-screen bg-purple-100 ">
            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex left-3 mt-4'>
                    <div className='my-3 mx-6 w-20 h-20'>
                        <BiSolidLeftArrowSquare className='cursor-pointer text-2xl text-gray-400   hover:text-red-700 ' onClick={handleNavigate} />
                    </div>
                </div>
                <div className='w-full h-40 mt-1  flex  justify-end right-0'>
                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleNavigate}>
                        <IoIosHome className='mt-1 mr-1 ' />
                        <p>Home</p>
                    </div>

                    <button className='mt-4 h-10  w-24 hover:opacity-30 rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100  ' >Login-in</button>
                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100   '  >Sign-in</button> */}
                </div>
                <div className=" h-[86vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl " >
                    {/* top bar */}
                    <div className='w-full  bg-slate-100 shadow-lg rounded-t-lg h-[12%] flex  items-center justify-center'>
                        <h4 className='cursor-pointer font-semibold hover:text-red-700'>Profile</h4>
                    </div>
                    <div className='w-full h-[88%] bg-red-200 rounded-b-lg '>
                        {/* left bar */}
                        <div className='w-[40%] h-full rounded-b-lg'>
                            <div className='w-full flex items-center border h-full '>
                                <div className='bg-slate-200 w-full  h-full top-0 flex justify-center rounded-b-lg'>
                                    <label htmlFor="imgInput">
                                        <img className='rounded-full cursor-pointer w-48 h-48 mt-10 ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                                    </label>
                                    <input type="file" id='imgInput' className='hidden' />
                                </div>
                            </div>
                        </div >
                        {/* right bar */}
                        <div className='w-[60%] h-full'>

                        </div>
                    </div>






                </div>
            </div>
        </div>
        // ------

    )
}

export default Profile
