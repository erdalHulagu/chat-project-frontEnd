import React, { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const DropdownMenu = () => {
    const [dropdown, setDropdown] = useState(false)
    

    const handleHover = () => {
        setDropdown(true);
      };
    
      const handleLeave = () => {
        setDropdown(false);
      };
  

  return (
    <div className=' relative flex w-[50] justify-end'>

                        <IoIosArrowDropdownCircle
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave} className='m-1  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                        {dropdown &&
                            <div
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave} 
                             className="py-1 rounded absolute z-10 bg-slate-200 -bottom-3 left-6 flex-col items-center justify-center w-36 h-30">
                                <div className='flex items-center  border-b w-full h-[32%] px-2 hover:bg-gray-300 '>
                                    <span className='text-gray-500'>Groups</span>
                                </div>
                                <div className='border w-full h-[32%] px-2 hover:bg-gray-300  '>
                                    <span className='text-gray-500'>Create Groups</span>
                                </div>
                                <div className=' border w-full h-[32%] px-2 hover:bg-gray-300 '>
                                    <span className='text-gray-500'>Add Groups</span>
                                </div>

                            </div>
                        }


                    </div>
  );
};

export default DropdownMenu;