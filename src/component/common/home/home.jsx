import React, { useState } from 'react'

import UserHome from '../../user/userHome/user-home';


const Home = () => {

    


    return (
        <div>
            <div fluid className="h-screen bg-purple-100 ">
                <div className="h-40 bg-blue-950 flex items-end justify-center shadow-2xl">
                    <div className=" bg-gradient-to-b from-purple-300 via-purple-100 to-white absolute bottom-22 w-[94%] top-10 left-[3%] right-[3%] rounded shadow-2xl " >
                        <UserHome/>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home