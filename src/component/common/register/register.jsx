
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = ({handleSubmit}) => {
    

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
            const resp = await axios.post("https://carrental-v3-backend.herokuapp.com/login", values);
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token)

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
        <Container className="mt-4 ">
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                        isInvalid={formik.touched.name && !!formik.errors.name}
                        isValid={formik.touched.name && !formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="LastName"
                        {...formik.getFieldProps("lastname")}
                        isInvalid={formik.touched.lastname && !!formik.errors.lastname}
                        isValid={formik.touched.lastname && !formik.errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.lastname}
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
                        placeholder="Adress"
                        {...formik.getFieldProps("adress")}
                        isInvalid={formik.touched.adress && !!formik.errors.adress}
                        isValid={formik.touched.adress && !formik.errors.adress}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.adress}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        {...formik.getFieldProps("phonenumber")}
                        isInvalid={formik.touched.phonenumber && !!formik.errors.phonenumber}
                        isValid={formik.touched.phonenumber && !formik.errors.phonenumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.phonenumbera}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="w-full h-14 flex items-center justify-end ">
                    <div>
                    <button className=" mb-3 h-10  w-24 rounded-lg bg-slate-700 text-slate-100  hover:text-slate-950 hover:bg-gray-100   "  type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    </div>
                    
                </div>

            </Form>
        </Container>
    );
};

export default Register;