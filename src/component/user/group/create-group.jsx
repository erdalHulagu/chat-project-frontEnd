import React, { useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { BiSolidDownArrow, BiSolidDownArrowSquare, BiSolidLeftArrowSquare } from 'react-icons/bi'
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
// import Dropdown from '../../../helper/dropdown-menu';




const MyStatus = () => {
    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate();

    const handleNavigete = () => {
        navigate(-1)
    }

const handleDorpdown = () => {
    setDropdown(!dropdown)
    
}




    return (
        <div className='h-full w-full flex'>
            {/* left bar */}
            <div className='w-[40%] lg:w-[25%] sm: rounded-l-lg h-full bg-slate-100 '>
                <div className=' flex justify-between rounded-tl-lg h-[14%] border-b w-[full]  bg-blue-950 border-slate-100 border'>

                    <div className='flex items-center justify-center w-[50%] -ml-3' >
                        <BiSolidLeftArrowSquare className='  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                        <p className='text-gray-400 mt-3'>Groups</p>
                    </div>
                    {/* dropdown menu */}
                    <div className=' relative flex w-[50] justify-end'>

                        <IoIosArrowDropdownCircle onClick={handleDorpdown} className='m-1  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                        {dropdown&&
                            <div className="py-1 rounded absolute z-10 bg-slate-200 -bottom-3 left-6 flex-col items-center justify-center w-36 h-30">
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

                </div>
                <div className='h-[86%] w-full  rounded-bl-lg  '>

                    {/* Right Bar */}
                    <div className='h-full w-[60%] lg:w-[75%]'><div className='w-full h-full flex items-center justify-center'>

                        <div>
                            <div className=' w-full  flex items-center justify-center '>
                            </div>
                            <p>Click on contact to view up date</p>
                        </div>




                    </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default MyStatus