import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import UserHome from '../../user/userHome/user-home';
import Erdal from '../erdal';


const Home = () => {




    return (
        <div>
            <div fluid className="h-screen bg-purple-100 ">

                <div className="h-40 bg-blue-950  flex items-center justify-center shadow-2xl ">
                    <div className='h-30 w-30 flex left-3 top'>
                        <div className='h-28 w-28 hover:opacity-30  hover:bg-gray-100 rounded-full flex justify-center items-center '>
                            <img className='rounded-full cursor-pointer w-20 h-20 absolute ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-full h-40 mt-1  flex  justify-end right-0'>

                        <button className='mt-4 h-10 mx-3 w-24 hover:opacity-30 rounded-lg text-slate-100 hover:text-slate-950 hover:bg-gray-100' >Login-in</button>
                        <button className='mt-4 h-10 mx-3 w-24 hover:opacity-30  rounded-lg text-slate-100 hover:text-slate-950 hover:bg-gray-100'  >Sign-in</button>
                    </div>


                    <div className=" h-[86vh] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22 w-[88%] top-[10vh]   rounded shadow-2xl " >

                        {/* <div className='h-20 w-20'>alsjbalsa<button className='bg-blue-700'></button></div> */}



                        {/* <UserHome/> */}
                        {/* </div> */}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home