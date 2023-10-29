import React, { useState } from 'react'
import Register from '../register/register'

const Main = () => {
    const [register, setRegister] = useState(false);

    const handleRegister = () => {
        setRegister(true);

    }


    return (
        <div>
            <div fluid className="h-screen bg-purple-100 ">

                <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                    <div className='h-30 w-30 flex left-3 mt-4'>
                        <div className='h-20 w-20 hover:opacity-30  hover:bg-gray-100 rounded-full flex justify-center items-center ml-10'>
                            <img className=' rounded-full cursor-pointer w-20 h-20 absolute ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-full h-40 mt-1  flex  justify-end right-0'>
                        <button className='mt-4 h-10  w-24 hover:opacity-30 rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100  ' >Login</button>
                        <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100' onClick={handleRegister}  >Register</button>
                    </div>
                    <div className=" h-[86vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded  shadow-slate-700  shadow-2xl " >
                        {register?
                        <div className='rounded bg-slate-200 w-full h-full flex items-center justify-center'>
                            <Register />
                        </div>

                        :<div className=' rounded w-full h-full flex  justify-center'>
                            <img className='rounded object-cover absolute w-full h-full' src="https://media.istockphoto.com/id/1327187531/tr/vektör/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=vfLYnJcaXytQn-7D4XYJQZcbXrvvUjHrujtJAl6JoeA=" alt="" />
                            <h5 className='top-20 text-bold absolute text-gray-400'>- World wide connection -</h5>
                        </div>}





                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
