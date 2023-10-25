import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { HiUserGroup } from 'react-icons/hi'
import { SiInstatus } from 'react-icons/si'
import { ImSearch, ImQuill } from 'react-icons/im'
import { BiFilter } from 'react-icons/bi'
import { PiUserListFill, PiPlusCircleFill } from 'react-icons/pi'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiEmojiStickerFill } from 'react-icons/ri'

import { BsFillChatLeftDotsFill, BsArrowDownSquareFill } from 'react-icons/bs'
import Chat from '../../user/chat/chat-card';
import MessageCard from '../../user/chat/message-card';
import Profil from '../../user/profile/profile';
import UserHome from '../../user/userHome/user-home';


const Home = () => {

    const [query, setQuery] = useState(false)
    const [search, setSearch] = useState("")
    const [userList, setUserList] = useState(false)
    const [profil, setProfil] = useState(false);

    const hadleUserList = () => {
        setUserList(true);
    }


    const handleSearch = () => { }

    const handleQuery = () => {
        setQuery(true);
    }

    const handleProfile = () => {
        setProfil(true);

    }


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