import React from "react";

const FriendsCard = ({ name, surname,  img }) => {
    return (
        <div className="w-full h-50 p-2 mt-3 mx-3 rounded flex  justify-between  bg-gradient-to-b from-purple-300 via-purple-100 to-white hover:opacity-80 shadow-2xl shadow-slate-800">
            
                <img className="rounded-full h-24 w-24" src="https://media.istockphoto.com/id/160945163/tr/fotoğraf/jerusalem.jpg?s=612x612&w=0&k=20&c=VL3IB4BVu3_rdhP679HiP1SyJPbQWg1k3sHUaMZ_sfs=" alt="" />
            

           
                <div className=" w-full ml-3 ">
                    <h5 className="text-slate-900 mx-1">name: {name}</h5>
                    <h5 className="text-slate-900">surname: {surname} </h5>
                </div>
                <div className="w-full flex justify-end ">
                    <button className="text-slate-100 w-20 hover:opacity-30 rounded bg-purple-900 mr-1 mb-1 ">delete</button>
                </div>

            




        </div>
    );
};

export default FriendsCard;
