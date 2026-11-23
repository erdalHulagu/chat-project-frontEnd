
import React from "react";
import { useParams } from "react-router-dom";
import FriendProfile from "../../component/user/friends/friend-profile";

const FriendProfilePage = () => {
    const { friendId } = useParams();

    return <><FriendProfile friendId={friendId} /></>;
};

export default FriendProfilePage;
