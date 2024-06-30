import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/img/logo.png'

const SignOut = () => {


    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/register');
        }, 2000);
        return () => clearTimeout(timer); 
    }, []);


    return (

        <div className='absolute w-full h-full flex items-center justify-center m-2'>
            {/* <img className='m-2 opacity-80 w-60 h-60 flex items-center justify-center rounded-full' src={require(`../../../assets/img/logo.png`)} alt="" /> */}
            <img className='m-2 opacity-80 w-60 h-60 flex items-center justify-center rounded-full' src={logoImg} alt="#" />
            {loading && <Spinner style={{ width: '17rem', height: '17rem', borderWidth: '0.7rem', borderStyle: 'solid', opacity: 0.50 }} className='absolute  ' animation="border" variant="light" />}
        </div>
    )
}

export default SignOut

