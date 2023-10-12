import React from 'react'

// const CurrentMessage = (image) => {
const MessageCard = ({isRegUserMessage,content,img}) => {







    return (

        <div className=' text-slate-950 align-middle text-end '>
            {/* <img src={`${image}`} alt="" /> */}
            <div className='py-2 px-2 max-w-[50%] max-h-[25%] '>
                <img className='rounded' src="https://cdn.pixabay.com/photo/2016/05/02/13/17/deer-1367217_1280.jpg" alt="" />
            </div>
            <div className={` max-w-[50%] py-3 px-2 rounded ${isRegUserMessage? "self-start bg-slate-200 text-slate-800" : "self-end bg-slate-600 text-white"}`}>

                <p >{content} </p>
            </div>

        </div>

    )
}

export default MessageCard
