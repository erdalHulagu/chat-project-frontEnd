import React, { useState } from 'react'
import { BiSolidLeftArrowSquare, BiSolidMessageDetail, BiSolidVideo } from 'react-icons/bi'
import { IoIosHome, IoMdPhotos } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import FriendsCard from '../friends/friends-card';
import { Col, Row } from 'react-bootstrap'
import FriendPhotos from './friend-photos-card';
import users from '../my-photos/friends.json'
import { useDispatch, useSelector } from 'react-redux';
const FriendProfile = () => {
    const profile= useSelector((state) => state.profile.friendList)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [friendsCard, setFriendsCard] = useState(false);
    const [searchFriends, setSearchFriends] = useState("");
    const [friendPhotos, setFriendPhotos] = useState(false);


    //--------------------------------------
    const handleNavigate = () => {
        navigate(-1);
    }

    const handleSignOut = () => {
        navigate("/");
    }
    //--------------------------------------
    const handleSearchFriends = () => {
        setFriendsCard(true);
    }
    const handleFriendPhotos = () => {
        setFriendPhotos(true)
        setFriendsCard(false);
    }

    const handleFriendsCard = () => {
        setFriendsCard(true);
        setFriendPhotos(false);
    }
    const [isEnlarged, setIsEnlarged] = useState(false);

    const handleToggleSize = () => {
        setIsEnlarged(!isEnlarged);
    };
    
    

    return (
        <div className="h-screen bg-purple-100 ">
            <div className="h-48 bg-blue-950  flex  justify-center shadow-black shadow-2xl ">
                
                <div className='w-full h-40 mt-1  flex  justify-end  '>
                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleNavigate}>
                        <IoIosHome className='mt-1 mr-1 ' />Home
                    </div>
                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950   hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-out</button>
                </div>

                <div className={`${isEnlarged ? 'max-h-[86vh]  w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl flex justify-center ' : " h-[86%] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl "}`} >
                    {/* top bar */}
                    {isEnlarged ? <div className='rounded w-full h-auto max-h-[86vh] flex justify-center '><FriendPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </div> : <>
                        <div className='w-full text-slate-800 bg-blue-950 border rounded-t-lg h-24 z-20 flex  items-center justify-center shadow-slate-950 shadow-2xl border-b'>
                            <div className='w-20 h-full items-center flex justify-center'>
                                <BiSolidLeftArrowSquare onClick={handleNavigate} className='text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                            </div>
                            <div className='w-full text-center'>
                                <h4 className=' ml-6 font-semibold text-slate-100 mr-[12%] '>{profile.name}'s Profile</h4>

                            </div>




                        </div>
                        <div className='w-full h-[90%] rounded-b-lg flex'>
                            {/* left bar */}
                            <div className='w-[40%] mb-6 marker:rounded-bl-lg '>
                                <div className='w-full flex items-center h-full'>
                                    <div className=' bg-slate-200 w-full  h-full rounded-bl-lg flex flex-col  justify-center'>



                                        <div className=' w-full flex items-center justify-center '>
                                            <div className='rounded-full shadow-2xl shadow-slate-800 '>
                                            <img className='rounded-full  w-36 h-36 ' src={profile.image} alt="" />
                                            </div>
                                            

                                        </div>
                                        
                                        <div className=' w-full h-[10%] flex items-center justify-center border-b border-gray-300 '>
                                            <div className='flex items-center justify-between w-36'>
                                            <BiSolidVideo className=' text-blue-950 w-14 h-14 p-3 hover:opacity-80 hover:bg-gray-500 hover:text-slate-200 cursor-pointer rounded-full' />
                                           
                                           <BiSolidMessageDetail className=' text-blue-950 w-14 h-14 p-3 hover:opacity-80 hover:bg-gray-500 hover:text-slate-200 cursor-pointer rounded-full' />
                                       
                                            </div>
                                           </div>


                                        <div className='h-70 w-[96%] flex flex-col items-start justify-start rounded-bl-lg '>
                                            <div className='border-b border-gray-300 flex flex-col w-[90%] h-16 ml-[10%]'>
                                                <span className='text-red-900 '>Name </span>
                                                <span >{profile.name}</span>
                                            </div>
                                            <div className='border-b border-gray-300 flex flex-col w-[90%] h-16 ml-[10%]'>
                                                <span className='text-red-900 '>Last name </span>
                                                <span >{profile.lastname}</span>
                                            </div>
                                            <div className='border-b border-gray-300 flex flex-col w-[90%] h-16 ml-[10%]'>
                                                <span className='text-red-900 '>Phone Number </span>
                                                <span className='mx-2' >123456789</span>
                                            </div>
                                            <div className=' border-gray-300 flex flex-col w-[90%] h-16 ml-[10%]'>
                                                <span className='text-red-900 '>Email Adress</span>
                                                <span >{profile.email}</span>
                                            </div>
                                            

                                        </div>
                                    </div>


                                </div>

                            </div >
                            {/* right bar */}
                            <div className='w-[80%] h-[96%] overflow-hidden '>
                                <div className='w-full h-full hover:overflow-clip hover:overflow-y-auto'>
                                <div className='sticky z-10 top-0 w-full h-20 right-0 flex items-center justify-between shadow-slate-900 shadow-2xl bg-blue-950'>
                                    <div className='w-[80%] h-full flex items-center justify-start' >

                                        <FaUserFriends onClick={handleFriendsCard} className={`ml-3 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full ${friendsCard && "hidden"}  `} />
                                        <p className='sm:hidden md:inline text-gray-400 mt-3 mr-3'>Friends</p>

                                        {friendsCard &&
                                            <input className='w-[80%] ml-5 focus:outline-none text-sm  text-gray-400 pl-8 py-2 rounded  cursor-pointercursor-pointer '
                                                type="text"
                                                placeholder="search..."
                                                onChange={(e) => {
                                                    setSearchFriends(e.target.value)
                                                    handleSearchFriends(e.target.value)
                                                }}
                                                value={searchFriends}
                                            />}
                                        <ImSearch className={`absolute top-8 left-8 text-blue-900 ${!friendsCard && "hidden"} `} />
                                    </div>


                                    <div className={` w-[30]% h-full flex items-center justify-end `}>{/* {` w-[50%] h-full flex items-center justify-end ${friendsCard && "hidden"} `}*/}
                                        <IoMdPhotos className=' text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' onClick={handleFriendPhotos} />
                                        <p className='sm:hidden md:inline  text-gray-400 mt-3 mr-3'>Photos</p>
                                    </div>

                                </div >
                                <div >
                                <Row >
                                        {friendPhotos && !friendsCard && [...Array(50)].map((photo) => <Col md={6} lg={4} xxl={3}  ><FriendPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </Col>)}
                                        {friendsCard && !friendPhotos && users.map((friend,id) => <Col key={id} md={6} lg={4} xl={3}> <FriendsCard {...friend} /></Col >)}
                                    </Row>
                                </div>
                                </div>

                            </div>
                        </div></>}

                </div>

            </div>
        </div>
    

    )
}


export default FriendProfile
