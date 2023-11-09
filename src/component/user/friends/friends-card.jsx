import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const FriendsCard = ({ name, surname, img }) => {
   const navigate= useNavigate();

   const handleNavigateProfile = () => {
    navigate('/profile');
     
   }
   
    return (
        <div onClick={handleNavigateProfile} className="w-[92%] h-auto p-2  rounded m-2  bg-gradient-to-b from-purple-300 via-purple-100 to-white hover:border-2  border-purple-600 shadow-2xl shadow-slate-800 cursor-pointer">
            <div className="w-full h-full border flex items-center justify-center mb-1">
                <img className="rounded " src="https://media.istockphoto.com/id/160945163/tr/fotoğraf/jerusalem.jpg?s=612x612&w=0&k=20&c=VL3IB4BVu3_rdhP679HiP1SyJPbQWg1k3sHUaMZ_sfs=" alt="" />
            </div>




            <div className=" w-full h-10 flex-col items-start justify-start">
                <h5 className="text-slate-900 text-sm ">name: {name}</h5>
                <h5 className="text-slate-900 text-sm ">surname: {surname} </h5>
            </div>
            <div className="w-full h-10 flex items-end justify-end">
                <BiSolidTrash  className="hover:opacity-70 rounded-full w-8 h-8 p-2   hover:bg-gray-300 text-blue-950 hover:text-blue-950 cursor-pointer"/>
            </div>






        </div>
    );
};

export default FriendsCard;
