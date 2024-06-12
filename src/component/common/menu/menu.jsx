import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Menu = () => {


    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
navigate('/register');
        }, 3000);


        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, []);


    return (

        <div className='absolute w-full h-full flex items-center justify-center '>
            <img className=' opacity-70 w-60 h-60 flex items-center justify-center rounded-full' src={require(`../../../assets/img/logo.png`)} alt="" />
            {loading && <Spinner style={{ width: '15rem', height: '15rem' }} className='absolute  ' animation="border" variant="light" />}
        </div>
    )
}

export default Menu

