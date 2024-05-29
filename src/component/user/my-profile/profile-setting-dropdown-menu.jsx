import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ProfileSettingDropdownMenu = ({ handleCreateGroup, handleCreateCominityGroup, handleAddExistingComminity, onClick }) => {
  const navigate = useNavigate();

  const [dropdown1, setDropdown1] = useState(false);

  const handleHover = (setDropdown, value) => {
    setDropdown(value);
  };

  const handleNavigateUpdateProfile = () => {
    navigate('/updateProfile')
  }

  const handleNavigateHome = () => {
    navigate('/home')
  }
  const handleNavigateLogout = () => {
    navigate('/')
  }

  return (
    <div className='relative flex  h-full justify-end cursor-pointer '>

      <RiUserSettingsFill
        onClick={() => handleHover(setDropdown1, true)}
        onMouseLeave={() => handleHover(setDropdown1, false)}
        className=' text-slate-900 w-14 h-14 p-3  hover:opacity-80 hover:bg-slate-300 m-3 hover:text-blue-950 cursor-pointer rounded-full'
      />


      {dropdown1 && (
        <div className='w-20 absolute -bottom-32 right-32'>
          <div
            onMouseEnter={() => handleHover(setDropdown1, true)}
            onMouseLeave={() => handleHover(setDropdown1, false)}
            className='shadow-xl shadow-slate-900 border border-2xl border-slate-600 py-1 rounded absolute bg-slate-200 -bottom-2 left-6 flex-col items-center justify-center w-40 h-30'
          >
            <div onClick={handleNavigateUpdateProfile} className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  h-14 w-full  h-14] px-2 hover:bg-gray-400'>
              Up Date Profile
            </div>
            <div onClick={handleNavigateHome}
              className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  w-full  h-14 px-2 hover:bg-gray-400'
            >
              Home
            </div>

            <div
            >
              <div onClick={handleNavigateLogout}
                className=' text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 w-full flex items-center h-14 px-2 hover:bg-gray-400'>
                Log Out
              </div>


            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ProfileSettingDropdownMenu;