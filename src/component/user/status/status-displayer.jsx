import React, { useEffect, useState } from 'react'
import { stories } from './dummy-story'
import { BiSolidPaperPlane, BiSolidSticker, BiSolidWinkSmile } from 'react-icons/bi'
import ProgressBar from './progress-bar/progres-bar'

const StatusDisplayer = () => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)


    const handleNextStory = () => {
        if (currentStoryIndex < stories?.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1)
            setActiveIndex(activeIndex + 1)

        }
        else {
            setCurrentStoryIndex(0)
            setActiveIndex(0)
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => [

            handleNextStory()

        ], 3000);

        return () => clearInterval(intervalId);
    }, [currentStoryIndex]);

    return (
        <div className='w-full h-full rounded '>


            <div className='w-[94%] h-[10%] flex items-center justify-center mx-[3%]'>
               {stories.map((story,index)=><ProgressBar key={index}  index={index} activeIndex={activeIndex} />)}
            </div>


            <div className='w-full h-[80%] flex items-center justify-center'>
                <img className=' h-[34vh]  sm:h-[70%] md:h-[94%]  mx-1 shadow-slate-800 shadow-xl rounded ' src={stories?.[currentStoryIndex].image} alt="" />
            </div>
            <div className='w-full h-[10%] bg-blue-950 bottom-0 absolute rounded-b flex items-center justify-center'>
                <BiSolidWinkSmile className='ml-1 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                <BiSolidSticker className=' text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
                <input className=' ml-1 h-10 w-[70%] md:w-[85%] bg-gray-300 rounded px-3' type="text" placeholder='type comment' />
                <BiSolidPaperPlane className='mx-1 text-gray-400 w-14 h-14 p-3 hover:opacity-30 hover:bg-slate-100 hover:text-blue-950 cursor-pointer rounded-full' />
            </div>
        </div>

    )
}

export default StatusDisplayer