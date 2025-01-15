import React, { useEffect, useState } from 'react'
import { BiSolidLeftArrowSquare, BiSolidPencil } from 'react-icons/bi'
import { IoIosHome, IoMdPhotos } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { FaUserFriends } from 'react-icons/fa';
import { MdPhotoCamera, MdOutlineMonochromePhotos } from 'react-icons/md';
import FriendsCard from '../friends/friends-card';
import MyPhotos from '../my-photos/my-photos-card';
import { Col, Row } from 'react-bootstrap'
import friends from "../my-photos/friends.json"
import { useDispatch } from 'react-redux';
import { setFriendProfile } from '../../../redux/store/slices/friend/friendsProfileSlices';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store/hooks';
import ProfileSettingDropdownMenu from './profile-setting-dropdown-menu';
import { RiUserSettingsFill } from 'react-icons/ri';
import { getImageById } from '../../../api/service/image-service';
import { error, toast } from '../../../helper/swal';
const MyProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isUserLogin, user } = useAppSelector((state) => state.auth);
   

    const [friendsCard, setFriendsCard] = useState(false);
    const [searchFriends, setSearchFriends] = useState("");
    const [myPhotos, setMyPhotos] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    useEffect(() => {
        const userImage = async () => {
            if (user?.profileImage) {
                try {
                    const image = await getImageById(user.profileImage);
                    const base64Image = `data:image/jpeg;base64,${image.data}`;
                    setProfileImage(base64Image);
                    console.log("image", image.data);
                    // setprofileImage(image);
                } catch (err) {
                    error("Image not found: " + err.message);
                };

            } else {
                setProfileImage(require(`../../../assets/img/user.webp`))
            }
        };
            userImage();
        },[user]);
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



    const handleFriendProfile = (friend) => {
        dispatch(setFriendProfile(friend));
        navigate('/friendProfile');
    };




    return (
        <div className="h-full w-full flex items-center justify-center ">

            <div className='h-full w-full absolute rounded bg-gradient-to-b from-purple-300  via-purple-50 to-white'>


                <div className={`${isEnlarged ?
                    'h-full w-full  bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl flex justify-center '
                    :
                    " h-full w-full  bottom-22  top-28 rounded-lg shadow-slate-700 shadow-2xl "}`} >
                    {/* top bar */}
                    {isEnlarged ? <div className='rounded w-full h-auto max-h-[86vh] flex justify-center '><MyPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </div>
                        :
                        <>
                            <div className='w-full text-slate-800 bg-slate-100 rounded-t-lg h-[12%] flex  items-center justify-between shadow-slate-950 shadow-2xl border-b'>


                                <h4 className='ml-6 font-semibold '>{user.firstName} {user.lastName}'s Profile</h4>
                                <div className='z-20 h-62 w-40'>

                                    <ProfileSettingDropdownMenu />

                                </div>




                            </div>
                            <div className='w-full h-[88%] rounded-b-lg flex'>
                                {/* left bar */}
                                {isUserLogin &&
                                    <div className='w-[40%] h-full rounded-b-lg '>
                                        <div className='w-full flex items-center border h-full marker:rounded-bl-lg'>
                                            <div className='relative bg-slate-200 w-full  h-full top-0 flex flex-col justify-center rounded-b-lg'>

                                                <label htmlFor="imgInput">
                                                    <div className=' w-full h-full flex items-center justify-center '>
                                                        <img className='shadow-2xl shadow-slate-800 rounded-full cursor-pointer w-36 h-36 my-5 ' src={profileImage} alt="" />
                                                        <MdPhotoCamera className='absolute ml-20 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                                                    </div>

                                                </label>
                                                <input type="file" id='imgInput' className='hidden' />
                                                <div className='w-full  h-full rounded-bl-lg'>
                                                    <div className='w-[94%] flex   border-slate-400 border-b mx-[3%] '>
                                                        <div className='w-full flex flex-col  '>
                                                            <h5 className="ml-3  text-blue-900 text-lg font-bold w-[20vw] " >{user.firstName} {user.lastName}</h5>
                                                            <input id='imgInput' className=' ml-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

                                                        </div>

                                                        <div className=' w-[50%] flex right-0 justify-end items-end'>
                                                            <BiSolidPencil id='imgInput' className='text-lg text-slate-600 hover:text-red-800 cursor-pointer' />
                                                        </div>

                                                    </div>
                                                    <div className='w-[90%]  flex items-center mx-3'>
                                                        <p className=' my-8 flex flex-col items-center font-bold'>
                                                            This is not your name. This name will be visible on your account contact
                                                        </p>
                                                    </div>

                                                    <div className='w-[94%] h[50%] flex   border-slate-400 border-b mx-[3%] '>
                                                        <div className='w-full h[50%] flex flex-col  '>
                                                            <h5 className="ml-3  text-blue-900 text-lg font-bold w-[20vw]" > About </h5>
                                                            <input id='imgInput' className='ml-3  text-slate-800 bottom-0 w-[80%] bg-slate-200  focus:outline-none' type="text" alt='' />

                                                        </div>

                                                        <div className=' w-[50%] flex right-0 justify-end items-end'>
                                                            <BiSolidPencil className='text-lg text-slate-600 hover:text-red-800 cursor-pointer' />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div >
                                }
                                {/* right bar */}
                                <div className='w-[80%] h-full overflow-hidden overflow-y-scroll '>
                                    <div className='sticky z-10 top-0 w-full h-20  flex items-center justify-between shadow-slate-900 shadow-2xl bg-blue-950'>
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
                                            <IoMdPhotos className=' text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' onClick={handlePhotos} />
                                            <p className='sm:hidden md:inline  text-gray-400 mt-3 mr-3'>Photos</p>
                                            <MdOutlineMonochromePhotos className='md:hidden sm:inline  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />

                                        </div>

                                    </div >
                                    <div >
                                        <Row >
                                            {myPhotos && !friendsCard && [...Array(50)].map((photo) => <Col md={12} lg={6} xxl={4}  ><MyPhotos isEnlarged={isEnlarged} handleToggleSize={handleToggleSize} /> </Col>)}
                                            {friendsCard && !myPhotos && friends.map((friend) => <Col key={friend.id} md={12} lg={6} xl={4}> <FriendsCard   {...friend} handleFriendProfile={handleFriendProfile(friend)} /></Col >)}

                                        </Row>
                                    </div>
                                </div>
                            </div></>}

                </div>

            </div>
        </div>
        //  </div>
        // ------

    )
}

export default MyProfile;
