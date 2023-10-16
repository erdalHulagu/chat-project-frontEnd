import React from 'react'

const Chat = () => {
    return (
        
            <div className='w-full flex border-b  border-blue-950 top-0 hover:bg-slate-100'>
                    <div className='flex justify-between w-full'>
                        <div className=' '>
                            <img className='ml-3 mt-2 hover:border-blue-900 border-2 cursor-pointer w-20 h-20 rounded-full ' src="https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg " alt="erdal" />{/*https://cdn.pixabay.com/photo/2023/07/11/13/28/bird-8120621_1280.jpg */}
                            <p className='text-blue-950 ml-3 hover:text-red-700 cursor-pointer'>user name</p>
                        </div>
                        <div className='flex flex-col justify-between mr-2 mt-3'>
                            <p className='text-blue-950'>time stamp</p>
                            <p className='text-blue-950'>message...</p>
                        </div>
                    </div>
            </div>
        
    )
}

export default Chat
