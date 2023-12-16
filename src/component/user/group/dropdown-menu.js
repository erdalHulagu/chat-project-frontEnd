import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const DropdownMenu = ({ handleGroupChat, handleCominityGroupChat }) => {

    const [dropdown1, setDropdown1] = useState(false)
    const [dropdown2, setDropdown2] = useState(false)


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




    return (
        <div className=' relative flex w-[50] h-full justify-end cursor-pointer'>

            <IoIosArrowDropdownCircle
                onClick={handleHover1}
                onMouseLeave={handleLeave1} className='m-1  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
            {dropdown1 &&
                <div
                    onMouseEnter={handleHover1}
                    onMouseLeave={handleLeave1}
                    className="border border-2xl border-slate-600 py-1 rounded absolute  bg-slate-200 -bottom-2 left-6 flex-col items-center justify-center w-40 h-30">

                    <div className='flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-300 '>
                        <span className='text-gray-500'>All Groups</span>
                    </div>
                    <div className='flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-300 '>
                        <span onClick={handleCominityGroupChat} className='text-gray-500'>Create Comminity</span>
                    </div>
                    <div
                        onMouseEnter={handleHover2}
                        onMouseLeave={handleLeave2}>
                        <div className=' w-full h-[32%] px-2 hover:bg-gray-300  '>
                            <span className='text-gray-500'>Add Groups</span>
                        </div>
                    </div>
                    {dropdown2 &&
                        <div
                            onMouseEnter={handleHover2}
                            onMouseLeave={handleLeave2}
                            className='py-1 rounded absolute  bg-slate-200 -bottom-7 left-40 flex-col items-center justify-center w-40 h-30'>

                            <div className='flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-300 '>
                                <span onClick={handleGroupChat} className='text-gray-500'>CreateGroup</span>
                            </div>
                            <div className='flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-300 '>
                                <span className='text-gray-500'>Add Existing Group</span>
                            </div>




                        </div>

                    }

                </div>


            }

        </div>
    );
};

export default DropdownMenu;