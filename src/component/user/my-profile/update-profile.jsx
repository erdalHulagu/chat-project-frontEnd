// import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppSelector } from "../../../redux/store/hooks";
import { updateUser } from "../../../api/service/user-service";
const UpdateProfile = () => {
    const { isUserLogin, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const initialValues = {
        id:user.id,
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
            const resp = await updateUser(values);
            toast("Profile updated succesfully", "success");
            formik.resetForm();
            console.log(resp.data);
            navigate('/login')

        } catch (err) {
            toast(err.response.data.messsage, "error")
            console.log(err);
            // alert(err.response.data.message);
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
        < div className="h-full w-full   flex  absolute">
            <div className="rounded-l w-[40%] max-w-md h-full flex flex-col items-center justify-center  bg-slate-200">

            {isUserLogin &&
                <div className=" w-full max-w-md h-full relative  flex flex-col items-center justify-center rounded-full">
                    <div className="w-full h-[35%] max-w-md shadow-lg shadow-slate-800 flex items-center justify-center">
                        <img className="h-60 w-60 rounded-full p-3" src={require(`../../../assets/img/logo.png`)} alt="" />
                    </div>
                    
                        <div className="h-[80%] w-full flex flex-col   ">

                            <td className="p-3 h-24  text-sm  shadow-lg shadow-slate-800 text-gray-500">First Name    <th className="  text-slate-600" >{user.firstName}</th></td>
                            <td className="p-3 h-24  text-sm  shadow-lg shadow-slate-800 text-gray-500">Last Name     <th className="  text-slate-600">{user.lastName}</th></td>
                            <td className="p-3 h-24   text-sm shadow-lg shadow-slate-800 text-gray-500">Phone Number  <th className="  text-slate-600">{user.phone}</th></td>
                            <td className="p-3 h-24  text-sm shadow-lg shadow-slate-800 text-gray-500">Post Code     <th className="  text-slate-600">{user.address}</th></td>
                            <td className="p-3 h-full  text-sm shadow-lg shadow-slate-800  text-gray-500">Adsress       <th className="  text-slate-600" >{user.address} </th></td>


                        </div>
                   
                </div>
}

            </div>

            <div className=" h-full w-[70%] flex rounded items-center justify-center">
                <div className='opacity-80 w-full rounded  max-w-2xl  flex justify-center '>

                    <Form className="w-[70%]  text-white" noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-5" controlId="formBasicEmail">
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
                        <Form.Group className="mb-5" controlId="formBasicEmail">
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
                        </Form.Group><Form.Group className="mb-5" controlId="formBasicEmail">
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
                        <Form.Group className="mb-5" controlId="formBasicPassword">
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
                        <Form.Group className="mb-5" controlId="formBasicEmail">
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
                        <Form.Group className="mb-5" controlId="formBasicEmail">
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
                                <button className=" mb-3 h-10  w-24 rounded-lg bg-slate-700 text-slate-100  hover:text-slate-950 hover:bg-gray-100   " type="submit"
                                    disabled={!(formik.dirty && formik.isValid) || loading}
                                >
                                    {loading && <Spinner animation="border" size="sm" />}
                                    Submit
                                </button>
                            </div>

                        </div>

                    </Form>
                </div>
            </div>

        </div>

    );
};

export default UpdateProfile;