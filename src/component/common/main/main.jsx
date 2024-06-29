import React, { useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import CustomRouters from '../../../router/custom-routers';



const Main = () => {

    const navigate = useNavigate();
    const [showMenu, setshowMenu] = useState(false)
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const [home, sethome] = useState(false)

    const hadleHome = () => {
        navigate('/userHome');
    }
    const handleProfile = () => {
        navigate('/profile');
    }
    const handleSignOut = () => {
        navigate('/');
    }
    const handleRegister = () => {

        setRegister(true);
        setLogin(false);
        navigate('/register')

    }

    const handleLogin = () => {
        setLogin(true);
        setRegister(false);
        navigate('/login');
    }







    return (

        <div fluid className="h-screen bg-purple-100 ">

            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex left-3 mt-4'>
                    <div className='h-20 w-20 rounded-full flex justify-center items-center ml-10'>
                        <img className=' rounded-full cursor-pointer w-20 h-20 absolute ' src={require(`../../../assets/img/logo.png`)} alt="" />
                    </div>
                </div>

                <div className='w-full h-40 mt-1  flex  justify-end right-0'>


                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={hadleHome}>
                        <IoIosHome className='mt-1 mr-1 ' />
                        <p>- Home</p>
                    </div>
                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleProfile}>
                        <BiSolidUser className='mt-1 mr-1 ' />
                        <p>- Profile</p>
                    </div>

                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-Out</button>
                    <button className='mt-4 h-10  w-24 hover:opacity-30 rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100  ' onClick={handleLogin}>Login</button>
                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100' onClick={handleRegister}  >Register</button>

                </div>
                <div className=" h-[84vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded  shadow-slate-900  shadow-xl " >
                    <div className=' rounded w-full h-full flex  justify-center'>
                        <img className='rounded object-cover absolute w-full h-full' src="https://media.istockphoto.com/id/1327187531/tr/vektör/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=vfLYnJcaXytQn-7D4XYJQZcbXrvvUjHrujtJAl6JoeA=" alt="" />
                       
                        <CustomRouters />
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Main