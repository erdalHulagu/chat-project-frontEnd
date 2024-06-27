const ChatDetail = ({item, handleCreatedChat}) => {

    return (
        
            <div onClick={()=>handleCreatedChat(item.id)} className='w-[94%]flex  shadow-slate-600 shadow-md hover:bg-slate-200 '>
                    <div className='flex  justify-between items-center w-full'>
                        <div className='w-24 h-24 mt-3 rounded-full flex flex-col items-center '> 
                            <img className=' hover:opacity-40 cursor-pointer w-14 h-14 rounded-full 'src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png" alt="erdal" />{/*hsrc={item.profileImage||"https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png" }alt="erdal" />*/}
                            <p className='text-blue-950 hover:text-red-700 cursor-pointer text-xs'>{item.firstName} {item.lastName}</p>
                        </div>
                        <div className='flex flex-col justify-between mr-2 '>
                            <p className='text-blue-950 text-xs mt-2'>{item.phone}</p>
                            <p className='text-blue-950 text-xs '>message...</p>
                        </div>
                    </div>
            </div>
        
    )
}

export default ChatDetail