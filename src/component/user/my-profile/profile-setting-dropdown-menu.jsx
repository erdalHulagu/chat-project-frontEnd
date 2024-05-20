import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';

const ProfileSettingDropdownMenu = ({ handleCreateGroup, handleCreateCominityGroup, handleAddExistingComminity, onClick }) => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);

  const handleHover = (setDropdown, value) => {
    setDropdown(value);
  };

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
            <div className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  h-14 w-full  h-14] px-2 hover:bg-gray-400'>
              Up Date Profile
            </div>
            <div
              onMouseEnter={() => handleHover(setDropdown2, true)}
              onMouseLeave={() => handleHover(setDropdown2, false)}
              className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  w-full  h-14 px-2 hover:bg-gray-400'
            >
              Home
            </div>
           
            <div
              onMouseEnter={() => handleHover(setDropdown3, true)}
              onMouseLeave={() => handleHover(setDropdown3, false)}
            >
              <div className=' text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 w-full flex items-center h-14 px-2 hover:bg-gray-400'>
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