import React from 'react'
import UserHome from '../user-home/user-home';
import { BiSolidUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import MyStatus from '../status/my-status';
import Group from '../group/group-chat/group';
import AddExsistingGroup from '../group/group-chat/create-existing-group/add-existing-comminity';
import { IoIosHome } from 'react-icons/io';



const Home = () => {

    const navigater = useNavigate();

    const hadleHome = () => {
        navigater('/home');
    }
    const handleProfile = () => {
        navigater('/profile');
    }
    const handleSignOut = () => {
        navigater('/');
    }




    return (
        
            <div fluid className="h-screen bg-purple-100 ">

                <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                    <div className='h-30 w-30 flex left-3 mt-4'>
                        <div className='h-20 w-20 hover:opacity-30  hover:bg-gray-100 rounded-full flex justify-center items-center ml-10'>
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
                        <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950 hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-out</button>
                    </div>


                    <div className=" h-[84vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded  shadow-slate-900  shadow-xl " >
                         {/* <MyStatus/> */}
                        <UserHome/> 
                        {/* <Group/> */}
                        

                    </div>
                </div>
            </div>
        
    )
}

export default Home