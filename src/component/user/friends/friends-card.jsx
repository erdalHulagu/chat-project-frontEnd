import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const FriendsCard = ({ name,lastname,image,handleFriendProfile }) => {
   
    const navigate = useNavigate();

    // const handleNavigateProfile = () => {
        
    //     // Navigate to the '/profile' route
    //     navigate('/friendProfile');
    // }
   
   

    return (
        <div className="w-[94%] h-auto p-2 max-h-200 rounded m-3  bg-gradient-to-b from-purple-300 via-purple-100 to-white hover:border-2  shadow-2xl shadow-slate-800 cursor-pointer">
            <div className="w-full h-60  flex items-center justify-center mb-1">
                <img onClick={handleFriendProfile}  className="rounded m-0 w-full h-full " src={image} alt="" />
            </div>



            <div className="w-full h-[40%] flex items-center justify-center">
                <div className=" w-full h-full flex items-cemter justify-center">
                    <p className="mr-2 text-slate-950 ">{name}</p>
                    <p className="text-slate-950 ">{lastname} </p>
                </div>
                <div className="w-full h-10 flex items-center justify-end">
                    <BiSolidTrash className="hover:opacity-70 rounded-full w-8 h-8 p-2   hover:bg-purple-200 text-purple-950 hover:text-blue-950 cursor-pointer" />
                </div>
            </div>







        </div>
    );
};

export default FriendsCard;
