import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./loading.scss";

const Loading = () => {
  return (
    <div className="w-[100%] h-[100%] relative p-2 flex text-center">
        <Spinner animation="border" className='text-blue-900'/>
    </div>
  )
}

export default Loading
