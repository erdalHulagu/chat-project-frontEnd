import React, { useEffect, useState } from 'react'
import { BiSolidLeftArrowSquare, BiSolidPencil } from 'react-icons/bi'
import { IoIosHome, IoMdPhotos } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { RiUserSettingsFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { MdPhotoCamera, MdOutlineMonochromePhotos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import FriendsCard from '../friends/friends-card';
import MyPhotos from '../my-photos/my-photos-card';
import { Col, Row } from 'react-bootstrap'

// import useAppSelector from '../../../redux/store/hooks/hooks';
// import useAppDispatch from '../../../redux/store/hooks/hooks';
// import { getUsers } from '../../../api/user.service';
// import {setFriend, setSelectedProfile} from '../../../redux/store/slices/friendsProfileSlices'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setFriend, setSelectedProfile } from '../../../redux/store/slices/friendsProfileSlices';


const MyProfile = () => {
    const navigate = useNavigate();
const dispatcher=useDispatch();
const friends=useSelector((state)=>state.friend.user)
    const [friendsCard, setFriendsCard] = useState(false);
    const [searchFriends, setSearchFriends] = useState("");
    const [myPhotos, setMyPhotos] = useState(false);


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
    const handlePhotos = () => {
        setMyPhotos(true)
        setFriendsCard(false);
    }

    const handleFriendsCard = () => {
        setFriendsCard(true);
        setMyPhotos(false);
    }
    const [isEnlarged, setIsEnlarged] = useState(false);

    const handleToggleSize = () => {
        setIsEnlarged(!isEnlarged);
    };
    useEffect(() => {
      try {
        axios.get("https://carrental-v3-backend.herokuapp.com").then(resp=>{
                    dispatcher(setFriend(resp.data.friends));
                });
      } catch (error) {
            console.log('Error fetching user data:', error);
        
      }
    

}, [dispatcher])
   

const handleFriendProfile = (friend) => {
dispatcher(setSelectedProfile(friend));
  
}



    
    return (
        <div className="h-screen bg-purple-100 ">
            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex w-[20%] left-3 mt-4'>
                    <div className='my-1 ml-[30%] w-full h-full'>
                        <BiSolidLeftArrowSquare className={`${isEnlarged ? 'hidden' : ' text-gray-400 w-16 h-16 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full'}`} onClick={handleNavigate} />
                    </div>
                </div>
                <div className='w-[80%] h-40 mt-1  flex  justify-end right-0 '>
                    <div className=' flex mt-4 pt-2 h-10 text-center  w-24 rounded-lg text-gray-400 cursor-pointer hover:text-red-700 ' onClick={handleNavigate}>
                        <IoIosHome className='mt-1 mr-1 ' />Home
                    </div>
                    <button className='mt-4 h-10 mr-3 w-24 hover:opacity-30  rounded-lg text-gray-400  hover:text-slate-950   hover:bg-gray-100   ' onClick={handleSignOut}  >Sign-out</button>
                </div>

                <div className={`${isEnlarged ? 'max-h-[86vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl flex justify-center ' : " h-[86vh] w-[94%] bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl "}`} >
                    {/* top bar */}
                    {isEnlarged ? <div className='rounded w-full h-auto max-h-[86vh] flex justify-center '><MyPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </div> : <>
                        <div className='w-full text-slate-800 bg-slate-100 rounded-t-lg h-[12%] flex  items-center justify-between shadow-slate-950 shadow-2xl border-b'>

                            <h4 className='ml-6 font-semibold '>Profile</h4>
                            <RiUserSettingsFill className=' text-blue-950 w-14 h-14 p-3 mr-6 hover:opacity-80 hover:bg-gray-300 hover:text-blue-950 cursor-pointer rounded-full' />


                        </div>
                        <div className='w-full h-[88%] rounded-b-lg flex'>
                            {/* left bar */}
                            <div className='w-[40%] h-full rounded-b-lg '>
                                <div className='w-full flex items-center border h-full marker:rounded-bl-lg'>
                                    <div className='relative bg-slate-200 w-full  h-full top-0 flex flex-col justify-center rounded-b-lg'>

                                        <label htmlFor="imgInput">
                                            <div className=' w-full h-[40vh] flex items-center justify-center'>
                                                <img className='hover:opacity-70 rounded-full cursor-pointer w-48 h-48 my-5 ' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg" alt="" />
                                                <MdPhotoCamera className='absolute cursor-pointer ml-32 text-purple-300 text-3xl' />
                                            </div>

                                        </label>
                                        <input type="file" id='imgInput' className='hidden' />
                                        <div className='h-[30vh]  w-full  border rounded-bl-lg'>
                                            <div className='w-[94%] h[50%] flex   border-slate-400 border-b mx-[3%] '>
                                                <div className='w-full h[50%] flex flex-col  '>
                                                    <h5 className="ml-3  text-blue-800 text-lg font-bold w-[20vw] " > Your name </h5>
                                                    <input id='imgInput' className=' ml-3 mt-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

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
                                                    <h5 className="ml-3  text-blue-800 text-lg font-bold w-[20vw]" > About </h5>
                                                    <input id='imgInput' className='mt-3 ml-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

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
                            <div className='w-[80%] h-full overflow-hidden overflow-y-scroll '>
                                <div className='sticky z-10 top-0 w-full h-20  flex items-center justify-between shadow-slate-900 shadow-2xl bg-blue-950'>
                                    <div className='w-[80%] h-full flex items-center justify-start' >

                                        <FaUserFriends onClick={handleFriendsCard} className={`ml-3 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full ${friendsCard && "hidden"}  `} />


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


                                    <div className={` w-[30%] h-full flex items-center justify-end `}>{/* {` w-[50%] h-full flex items-center justify-end ${friendsCard && "hidden"} `}*/}
                                        <IoMdPhotos className=' text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' onClick={handlePhotos} />
                                        <div className=''>
                                            <MdOutlineMonochromePhotos className='md:hidden sm:inline  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                                        </div>
                                    </div>

                                </div >
                                <div >
                                    <Row >
                                        {myPhotos && !friendsCard && [...Array(50)].map((photo) => <Col md={12} lg={6} xxl={4}  ><MyPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </Col>)}
                                        {friendsCard && !myPhotos && friends.map((friend) => <Col key={friend.id} md={12} lg={6} xl={4}> <FriendsCard  {...friend.users}  onClick={handleFriendProfile(friend)}/></Col >)}
                                        {/* {friendsCard && !myPhotos && friends.map((friend, id) => <Col key={id} md={12} lg={6} xl={4}> <FriendsCard  {...friend}  /><FriendProfile friend={friend} onClick={()=>{handleFriendProfile(friend)}}/></Col >)} */}
                                    </Row>
                                </div>
                            </div>
                        </div></>}

                </div>

            </div>
        </div>
        // ------

    )
}

export default MyProfile;
