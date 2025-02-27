

import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { register } from "../../../api/service/user-service";
import axios from "axios";

const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        postCode: ""
       

    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Type in a valid email adress")
            .required("Don't leave blank"),
        password: Yup.string().required("Type in password"),
    });

    const onSubmit = async (values) => {
        console.log("Formik'ten gelen değerler:", values); // Formik değerlerini konsola yazdır
        setLoading(true);
        try {
            const resp=await axios.post(`http://localhost:8081/register`, values);
            // const resp = await register(values);
            toast("You're registered", "success");
            formik.resetForm();
            console.log("registered user", resp.data);
            navigate("/login")

        } catch (err) {
            const errorMessage =
            err.response?.data?.message || "An error occurred during registration.";
        toast(errorMessage, "error");

        if (err.response?.data?.errors) {
            Object.entries(err.response.data.errors).forEach(([field, message]) => {
                formik.setFieldError(field, message);
            });
        }
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className=" h-full w-full flex  items-center justify-center rounded">


            <div className='h-full  opacity-80 w-full rounded  max-w-xl  flex flex-col items-center justify-center '>
                
                <Form className="w-[70%]  text-white" noValidate onSubmit={formik.handleSubmit}>
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
                        <Form.Label>Post Code</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Post Code"
                            {...formik.getFieldProps("postCode")}
                            isInvalid={formik.touched.postCode && !!formik.errors.postCode}
                            isValid={formik.touched.postCode && !formik.errors.postCode}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.postCode}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            {...formik.getFieldProps("phone")}
                            isInvalid={formik.touched.phone && !!formik.errors.phone}
                            isValid={formik.touched.phone && !formik.errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="w-full h-14 flex items-center justify-end ">
                        <div>
                            <button className="  h-10  w-24 rounded-lg bg-gray-100 text-slate-900  hover:text-gray-100 hover:bg-slate-700   " type="submit"
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