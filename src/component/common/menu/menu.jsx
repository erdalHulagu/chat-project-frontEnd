import React, { useEffect, useState } from 'react'
import Register from '../register/register'
import Login from '../login/login';
import { BiSolidLeftArrowSquare } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Menu = ({register,login,handleLogin,handleRegister}) => {

    // const [register, setRegister] = useState(false)
    // const [login, setLogin] = useState(false)

    // const handleRegister = () => {
    //     setRegister(true);
    //     setLogin(false);

    // }


    // const handleLogin = () => {
    //     setLogin(true);
    //     setRegister(false);

    // }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // 3 seconds
  
      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }, []);





    return (

        <div fluid className="h-screen bg-purple-100 ">

            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex left-3 mt-4 '>


                    <div className='h-16 w-48  flex items-center '>
                        <img className='ml-[3%] hover:opacity-30 rounded-full cursor-pointer w-14 h-14 absolute ' src={require(`../../../assets/img/logo.png`)} alt="" />

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
                    <div className='absolute w-full h-full flex items-center justify-center '>
                        <img className='relative opacity-70 w-60 h-60 flex items-center justify-center rounded-full' src={require(`../../../assets/img/logo.png`)}alt="" />
                        {loading &&  <Spinner style={{ width: '15rem', height: '15rem' }} className='absolute  ' animation="border" variant="light" />}
                    </div>
               

                </div>
              



             </div>
         </div>

    )
}

export default Menu

