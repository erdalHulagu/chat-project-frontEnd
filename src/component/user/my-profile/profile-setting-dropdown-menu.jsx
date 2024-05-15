import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';

const ProfileSettingDropdownMenu = ({ handleCreateGroup, handleCreateCominityGroup,handleAddExistingComminity }) => {

    const [dropdown1, setDropdown1] = useState(false)
    const [dropdown2, setDropdown2] = useState(false)
    const [dropdown3, setDropdown3] = useState(false)


    const handleHover1 = () => {
        setDropdown1(true);
    };

    const handleLeave1 = () => {
        setDropdown1(false);
    };

    const handleHover2 = () => {
        setDropdown2(true);
    };

    const handleLeave2 = () => {
        setDropdown2(false);
    };
    const handleHover3 = () => {
        setDropdown3(true);
    };

    const handleLeave3 = () => {
        setDropdown3(false);
    };




    return (
        <div className=' relative flex w-[50] h-full justify-end cursor-pointer'>

            <RiUserSettingsFill 
                onMouseOver={handleHover1}
                onMouseLeave={handleLeave1} className=' text-blue-950 w-14 h-14 p-3  hover:opacity-80 hover:bg-gray-300 hover:text-blue-950 z-10 cursor-pointer rounded-full' />
            {dropdown1 &&
                <div
                    onMouseEnter={handleHover1}
                    onMouseLeave={handleLeave1}
                    className="shadow-xl shadow-slate-900 border border-2xl border-slate-600 py-1 rounded absolute  bg-slate-200 mt-14 flex-col items-center justify-center w-30 h-30">

                    <div className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  w-full h-[32%] px-2 hover:bg-gray-400 '>
                        All Groups
                    </div>
                    <div
                        onMouseEnter={handleHover2}
                        onMouseLeave={handleLeave2}
                        className=' text-gray-600 hover:text-slate-100  hover:shadow-md hover:shadow-slate-700 flex items-center  w-full h-[32%] px-2 hover:bg-gray-400 '>
                        Create 
                    </div>
                    {dropdown2 &&
                        <div
                            onMouseEnter={handleHover2}
                            onMouseLeave={handleLeave2}
                            className='shadow-xl shadow-slate-900 py-1 rounded absolute  bg-slate-200 -bottom-1 left-36 flex-col items-center justify-center w-48 h-30'>

                            {/* <div
                                onClick={handleCreateCominityGroup}
                                className=' text-gray-600 hover:text-slate-100  hover:shadow-md hover:shadow-slate-700 flex items-center  w-full h-[32%] px-2 hover:bg-gray-400 '>
                                Create New Comminity
                            </div>
                            <div
                            onClick={handleAddExistingComminity} 
                            className=' text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-400 '>
                                Add Existing Comminity
                            </div> */}
                        </div>
                    }
                    <div
                        onMouseEnter={handleHover3}
                        onMouseLeave={handleLeave3}>
                        <div className=' text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 w-full h-[32%] px-2 hover:bg-gray-400  '>
                            Add Groups
                        </div>
                        {dropdown3 &&
                            <div
                                onMouseEnter={handleHover3}
                                onMouseLeave={handleLeave3}
                                className='shadow-xl shadow-slate-900 py-1 rounded absolute  bg-slate-200 -bottom-2 left-36 flex-col items-center justify-center w-40 h-30'>
{/* 
                                <div onClick={handleCreateGroup} className='text-gray-600 hover:text-slate-100 hover:shadow-md hover:shadow-slate-700 flex items-center  w-full h-[32%] px-2 hover:bg-gray-400 '>
                                    Create New Group
                                </div> */}

                            </div>
                        }
                    </div>


                </div>


            }

        </div>
    );
};

export default ProfileSettingDropdownMenu;