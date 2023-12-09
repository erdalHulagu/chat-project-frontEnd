import React, { useState, useEffect } from 'react';
import './progress-bar.css'


const ProgressBar = ({index,activeIndex,duration}) => {
  const isActive=(index===activeIndex)
  const [progress, setProgress] = useState();

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
            return prevProgress + 1;
        }
        clearInterval(intervalId);
        return prevProgress;
      });

    }, duration/100); 

}, [duration, activeIndex]);

useEffect(() => {
    setProgress(0);

}, [activeIndex])

  return (
    
    <div className={`progress-bar-container ${isActive ? "active":""}`}>
      <div 
      className={`${isActive?"progress-bar":""}`} 
      style={{ width: `${progress}%` }}></div>
    </div>
  );
};
export default ProgressBar

