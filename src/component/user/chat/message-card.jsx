import React from 'react'

// const CurrentMessage = (image) => {
const MessageCard = ({ isRegUserMessage, content, img }) => {







    return (

        
            <div className={` flex  h- w-full items-center max-w-[40%] py-3 px-2 rounded ${isRegUserMessage ? "self-start bg-slate-200  text-gray-600" : "self-end bg-white text-gray-600"}`}>

                <span>{content} adasdasasasa sxasxasxaAAzA zazazAzAsx` sx`sx`sx`</span>


            </div>

        

    )
}

export default MessageCard
