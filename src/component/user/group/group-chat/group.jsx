import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GroupDropdownMenu from '../group-dropdown-menu';
import { BiSolidLeftArrowSquare } from 'react-icons/bi';
import CreateGroupCard from './create-group/create-group-card';
import { HiUserGroup } from 'react-icons/hi';
import CreateComminityGroup from './comminity-group/create-comminity-group';
import AddExsistingComminity from './comminity-group/create-existing-group/add-existing-comminity';



const Group = () => {
    const navigate = useNavigate();
    const [createGroup, setCreateGroup] = useState(false);
    const [createCominityGroup, setCreateCominityGroup] = useState(false);
    const [addExistingComminity, setAddExistingComminity] = useState(false)



    const handleNavigate = () => {
        navigate("/groups")
    }
    const handleCreateGroup = () => {

        setCreateGroup(true);
        setCreateCominityGroup(false);
        setAddExistingComminity(false)
    }

    const handleCreateCominityGroup = () => {
        setCreateCominityGroup(true);
        setCreateGroup(false);
        setAddExistingComminity(false)
    }
    const handleAddExistingComminity = () => {
        setAddExistingComminity(true)
        setCreateCominityGroup(false);
        setCreateGroup(false);
    }





    return (
        <div className='h-full w-full flex '>
            {/* left top bar */}
            <div className='w-[40%] lg:w-[25%] sm: rounded-l-lg  bg-slate-200 '>
                <div className=' flex justify-between rounded-tl-lg h-[14%] border-b w-[full]  bg-blue-950 border-slate-100 border'>

                    <div className='flex items-center justify-center w-[50%] -ml-3' >
                        <BiSolidLeftArrowSquare onClick={handleNavigate} className='  text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                        <p className='text-gray-400 mt-3'>Groups</p>
                    </div>
                    <GroupDropdownMenu
                        handleCreateGroup={handleCreateGroup}
                        handleCreateCominityGroup={handleCreateCominityGroup}
                        handleAddExistingComminity={handleAddExistingComminity}
                    />
                </div>

                {/* left bottom bar */}
                {!(createGroup || createCominityGroup || addExistingComminity) &&
                    <div className='w-full h-[86%] rounded-bl flex items-center justify-center bg-slate-100'>
                        <div className='p-3 rounded bg-slate-200 h-[95%] w-[90%] flex flex-col items-center justify-center mx-[5%] my-[5%]'>
                            <div className='h-[50%] w-[90%] flex items-center justify-center'>
                                <HiUserGroup className='h-40 w-40  text-gray-400 ' />
                            </div>
                            <div className='h-[50%] w-[90%]'>

                                <p className='text-2xl text-gray-400 '>You can create comminities and groups... <br /> (from comminities and groups you can create or add existing group )</p>

                            </div>
                        </div>
                    </div>}
                <>
                    {createGroup && < CreateGroupCard />}
                    {createCominityGroup && <CreateComminityGroup />}
                    {addExistingComminity && <AddExsistingComminity />}
                     
                </>



            </div>
            {/* Right Bar */}
            <div className='h-[86%] w-[60%]  rounded-bl-lg  '>


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
    )
}

export default Group