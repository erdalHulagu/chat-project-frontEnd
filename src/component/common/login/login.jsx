// import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidLeftArrowSquare } from "react-icons/bi"
import * as Yup from "yup";
import axios from "axios";
import { login } from "../../../service/user-service";

const Login = () => {
    const navigater = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleNavigater = () => {
        navigater('/home');
    }
   

    
    const handleNavigate = () => {
        navigater("/")
    }
    


    const initialValues = {
        email: "",
        password: "",
      
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Type in a valid email adress")
            .required("Don't leave blank"),
        password: Yup.string().required("Type in password"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const resp = login(values);
            console.log(resp.data);
            formik.resetForm();
            localStorage.setItem("token", resp.data.token)

        } catch (err) {
            console.log(err);
            // alert(err.response.data.message);
        }finally{
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        
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
                                        <button className=" h-10  w-24 rounded-lg bg-slate-700 text-slate-100  hover:text-slate-950 hover:bg-gray-100   " 
                                        type="submit"
                                        //  onClick={handleNavigater}
                                        disabled={!(formik.dirty && formik.isValid) || loading}
                                        >
                                            {loading && <Spinner animation="border" size="sm" />}
                                        Login
                                        </button>
                                    </div>

                                </div>

                            </Form>
                        </Container>

      

    );
};

export default Login;