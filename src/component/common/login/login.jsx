// import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidLeftArrowSquare } from "react-icons/bi"
import * as Yup from "yup";

const Login = () => {
    const navigater = useNavigate();

    const handleNavigater = () => {
        navigater('/home');
    }
   

    
    const handleNavigate = () => {
        navigater("/")
    }
    


    const initialValues = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        phonenumber: "",
        adress: "",
        remember: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Type in a valid email adress")
            .required("Don't leave blank"),
        password: Yup.string().required("Type in password"),
    });

    const onSubmit = async (values) => {
        try {
            // const resp = await axios.post("https://carrental-v3-backend.herokuapp.com/login", values);
            // console.log(resp.data);
            // localStorage.setItem("token", resp.data.token)

        } catch (err) {
            console.log(err);
            // alert(err.response.data.message);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div fluid className="h-screen bg-purple-100 ">
            <div className="h-48 bg-blue-950  flex  justify-center shadow-2xl ">
                <div className='h-30 w-30 flex items-start ml-10 w-full  mt-4'>
                    <div className='my-3 flex items-start  border-white justify-start w-full h-full'>
                        <BiSolidLeftArrowSquare className='cursor-pointer text-3xl text-gray-400   hover:text-red-700 ' onClick={handleNavigate} />
                    </div>
                </div>
                
                <div className=" flex  justify-center items-center h-[86vh] w-[94%]  absolute bottom-22  top-28 rounded  shadow-slate-700  shadow-2xl " >

                    <div className=' rounded w-full h-full flex  justify-center'>
                        <img className='rounded object-cover absolute w-full h-full' src="https://media.istockphoto.com/id/1327187531/tr/vektör/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=vfLYnJcaXytQn-7D4XYJQZcbXrvvUjHrujtJAl6JoeA=" alt="" />
                        <h5 className='top-20 text-bold absolute text-gray-400'>- World wide connection -</h5>
                    </div>
                    <div className='overflow-hidden opacity-90 absolute rounded bg-slate-300 w-[80%] mt-20 h-[80%]  p-10 flex items-center justify-center  shadow-slate-400  shadow-2xl'>
                        <Container className="mt-3 ">
                            <Form noValidate onSubmit={formik.handleSubmit}>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...formik.getFieldProps("email")}
                                        isInvalid={formik.touched.email && !!formik.errors.email}
                                        isValid={formik.touched.email && !formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        {...formik.getFieldProps("password")}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                        isValid={formik.touched.password && !formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="w-full h-14 flex items-center justify-end ">
                                    <div>
                                        <button className=" h-10  w-24 rounded-lg bg-slate-700 text-slate-100  hover:text-slate-950 hover:bg-gray-100   " type="submit" onClick={handleNavigater}>
                                            Submit
                                        </button>
                                    </div>

                                </div>

                            </Form>
                        </Container>

                    </div>




                </div>
            </div>
        </div>


    );
};

export default Login;