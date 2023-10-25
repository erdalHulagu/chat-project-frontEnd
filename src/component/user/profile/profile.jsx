import React from 'react'
import { BiSolidLeftArrowSquare } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);

    }

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10'>
                <BiSolidLeftArrowSquare className='cursor-pointer text-lg hover: text-red-700' onClick={handleNavigate} />
                <p className='cursor-pointer font-semibold hover: text-red-700'>Profile</p>
            </div>
            <div>
                <label htmlFor="imgInput">
                <img className='rounded cursor-pointer w-[15vw] h-[15vh]' src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg"  alt="" />
                </label>
                <input type="file" id='imgInput' className='hidden' />
            </div>


        </div>
    )
}

export default Profile
