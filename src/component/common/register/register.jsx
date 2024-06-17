
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import {  Container, Form, Spinner, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../../service/user-service";
import { toast } from "../../../helper/swal";

const Register = ({setKey}) => {
  
    const [loading, setLoading] = useState(false);
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        remember: false,
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
            const resp=await register(values);
           toast("You're registered", "success");
            formik.resetForm();
            console.log("registered user",resp.data);
            setKey("login");

        } catch (err) {
            toast(err.response.data.messsage,"error")
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
        <div className=" h-[90%] w-full flex items-center justify-center rounded ">
            <div className='opacity-80 w-full rounded  max-w-xl  flex items-center justify-center '>
            <Form className="w-[70%]  text-white"  noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        {...formik.getFieldProps("firstName")}
                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        isValid={formik.touched.firstName && !formik.errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        {...formik.getFieldProps("lastName")}
                        isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                        isValid={formik.touched.lastName && !formik.errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group><Form.Group className="mb-2" controlId="formBasicEmail">
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
                <Form.Group className="mb-2" controlId="formBasicPassword">
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
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Address"
                        {...formik.getFieldProps("address")}
                        isInvalid={formik.touched.address && !!formik.errors.address}
                        isValid={formik.touched.address && !formik.errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        {...formik.getFieldProps("phoneNumber")}
                        isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                        isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="w-full h-14 flex items-center justify-end ">
                    <div>
                    <button className=" mb-3 h-10  w-24 rounded-lg bg-gray-100 text-slate-900  hover:text-gray-100 hover:bg-slate-700   "  type="submit" 
                    disabled={!(formik.dirty && formik.isValid) || loading}
                >
                    {loading && <Spinner animation="border" size="sm" />}
                Register
                    </button>
                    </div>
                    
                </div>

            </Form>
            </div>
        </div>
    );
};

export default Register;