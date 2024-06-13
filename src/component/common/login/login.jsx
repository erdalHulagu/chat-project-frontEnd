// import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidLeftArrowSquare } from "react-icons/bi"
import * as Yup from "yup";
import { getUser, login } from "../../../service/user-service";
import { useDispatch, useSelector } from "react-redux";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { toast } from "../../../helper/swal";
import { useAppDispatch } from "../../../redux/store/hooks";
import { loginFailed, loginSuccess } from "../../../redux/store/slices/auth-slice";

const Login = () => {
    
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
  const dispatch= useAppDispatch();

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
            const respAuth =await login(values);
            console.log(respAuth.data);
            formik.resetForm();
            encryptedLocalStorage.setItem("token", respAuth.data.token)

            const respUser=await getUser();
            dispatch(loginSuccess(respUser.data));
            toast("login successfull")
            navigate("/userHome")
            

        } catch (err) {
            dispatch(loginFailed());
            toast("error");
            
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

        <div className=" h-[90%] w-full flex items-center justify-center rounded ">
            <div className='opacity-80 w-full rounded  max-w-xl  flex items-center justify-center '>
            <Form className="w-[70%]  text-white"  noValidate onSubmit={formik.handleSubmit}>

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
                    <button className=" mb-3 h-10  w-24 rounded-lg bg-gray-100 text-slate-900  hover:text-gray-100 hover:bg-slate-700   "  
                            type="submit"
                            disabled={!(formik.dirty && formik.isValid) || loading}
                        >
                            {loading && <Spinner animation="border" size="sm" />}
                            Login
                        </button>
                    </div>

                </div>

            </Form>
        </div>
        </div>



    );
};

export default Login;