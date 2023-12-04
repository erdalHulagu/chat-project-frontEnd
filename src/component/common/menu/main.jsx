import React, { useState } from 'react'
import Register from '../register/register'
import Login from '../login/login';
import { BiSolidLeftArrowSquare } from 'react-icons/bi';

const Menu = () => {
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handleRegister = () => {
        setRegister(true);
        setLogin(false);
    }

    const handleLogin = () => {
        setLogin(true);
    }

    const handleSubmit = () => {
        setSubmit(true);
    }


    return (
        
            <div fluid className="h-screen bg-purple-100 ">

                <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                    <div className='h-30 w-30 flex left-3 mt-4 '>

                        
                         <div className='h-16 w-48  flex items-center '>
                                <img className='ml-[3%] hover:opacity-30 rounded-full cursor-pointer w-14 h-14 absolute ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />

                            </div>
                    



                    </div>
                    <div className='w-full h-40 mt-1  flex  justify-end right-0'>
                        <button className='mt-4 h-10  w-24 hover:opacity-30 rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100  ' onClick={handleLogin}>Login</button>
                        <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100' onClick={handleRegister}  >Register</button>
                    </div>
                    <div className=" flex  justify-center items-center h-[86vh] w-[94%]  absolute bottom-22  top-24 rounded  shadow-slate-700  shadow-2xl " >

                        <div className=' rounded w-full h-full flex  justify-center'>
                            <img className='rounded object-cover absolute w-full h-full' src="https://media.istockphoto.com/id/1327187531/tr/vektör/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=vfLYnJcaXytQn-7D4XYJQZcbXrvvUjHrujtJAl6JoeA=" alt="" />
                            <h5 className='top-20 text-bold absolute text-gray-400'>- World wide connection -</h5>
                        </div>
                        {register && 
                            <div className='overflow-hidden opacity-90 absolute rounded bg-slate-300 w-[80%] max-w-lg mt-20 h-[80%]  p-10 flex items-center justify-center  shadow-slate-400  shadow-2xl'>
                                <Register handleSubmit={handleSubmit} />
                            </div>}
                        {(submit || login) &&
                            <div className='overflow-hidden opacity-90 absolute rounded bg-slate-300 w-[80%] max-w-lg mt-20 h-[80%]  p-10 flex items-center justify-center  shadow-slate-400  shadow-2xl'>
                                <Login />
                            </div>}



                    </div>
                </div>
            </div>
       
    )
}

export default Menu
