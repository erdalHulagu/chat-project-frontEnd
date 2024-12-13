// import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppSelector } from "../../../redux/store/hooks";
import { updateUser } from "../../../api/service/user-service";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const UpdateProfile = () => {
    const { isUserLogin, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        postCode: "",
        profileImage: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Type in a valid email address")
            .required("Don't leave blank"),
        password: Yup.string().required("Type in a password"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        postCode: Yup.string()
            .matches(/^\d{5}$/, "Post code must be 5 digits")
            .required("Post code is required"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const resp = await updateUser(values);
            toast("Profile updated successfully", "success");
            formik.resetForm();
            navigate("/profile"); // Update sonrası yönlendirme
        } catch (err) {
            toast(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                password: "",
                phone: user.phone || "",
                address: user.address || "",
                postCode: user.postCode || "",
                profileImage: user.profileImage || "",
            });
        }
    }, [user]);

    const updateProfile = () => {
        setUpdate(!update);
    };

    return (
        <div className="h-full w-full flex absolute">
            <div className="rounded-l w-[40%] max-w-md h-full flex flex-col items-center justify-center bg-slate-200">
                {isUserLogin && (
                    <div className="w-full max-w-md h-full relative flex flex-col items-center justify-center rounded-full">
                        <div className="w-full h-[35%] max-w-md shadow-lg shadow-slate-800 flex items-center justify-center">
                            <img
                                className="h-60 w-60 rounded-full p-3"
                                src={user.profileImage}
                                alt=""
                            />
                        </div>

                        <div className="h-[80%] w-full flex flex-col">
                            <td className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                First Name <th className="text-slate-600">{user.firstName}</th>
                            </td>
                            <td className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Last Name <th className="text-slate-600">{user.lastName}</th>
                            </td>
                            <td className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Phone Number <th className="text-slate-600">{user.phone}</th>
                            </td>
                            <td className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Post Code <th className="text-slate-600">{user.postCode}</th>
                            </td>
                            <td className="p-3 h-full text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Address <th className="text-slate-600">{user.address}</th>
                            </td>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-full w-[70%] rounded">
                <div className="opacity-80 w-full rounded max-w-2xl flex justify-center">
                    {!update ? (
                        <div className="h-30 w-full">
                            <div className="flex items-center justify-end">
                                <div
                                    onClick={updateProfile}
                                    className="flex my-2 mr-4 h-10 w-auto gap-2 items-center cursor-pointer justify-evenly hover:text-red-600 text-gray-300"
                                    type="button"
                                >
                                    <FaLongArrowAltRight /> Update Profile
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full w-full">
                            <div className="h-[10%] w-full flex items-center justify-end">
                                <div
                                    onClick={updateProfile}
                                    className="flex my-2 mr-4 h-10 w-auto items-center cursor-pointer justify-evenly gap-2 hover:text-red-600 text-gray-300"
                                    type="button"
                                >
                                    <FaLongArrowAltLeft /> Back
                                </div>
                            </div>
                            <div className="h-[70%] w-full flex items-center justify-center">
                                <Form
                                    className="w-[70%] text-white"
                                    noValidate
                                    onSubmit={formik.handleSubmit}
                                >
                                    <Form.Group className="mb-5" controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps("firstName")}
                                            isInvalid={
                                                formik.touched.firstName && !!formik.errors.firstName
                                            }
                                            isValid={
                                                formik.touched.firstName && !formik.errors.firstName
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps("lastName")}
                                            isInvalid={
                                                formik.touched.lastName && !!formik.errors.lastName
                                            }
                                            isValid={
                                                formik.touched.lastName && !formik.errors.lastName
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            {...formik.getFieldProps("email")}
                                            isInvalid={
                                                formik.touched.email && !!formik.errors.email
                                            }
                                            isValid={
                                                formik.touched.email && !formik.errors.email
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            {...formik.getFieldProps("password")}
                                            isInvalid={
                                                formik.touched.password && !!formik.errors.password
                                            }
                                            isValid={
                                                formik.touched.password && !formik.errors.password
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps("address")}
                                            isInvalid={
                                                formik.touched.address && !!formik.errors.address
                                            }
                                            isValid={
                                                formik.touched.address && !formik.errors.address
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formPostCode">
                                        <Form.Label>Post Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps("postCode")}
                                            isInvalid={
                                                formik.touched.postCode && !!formik.errors.postCode
                                            }
                                            isValid={
                                                formik.touched.postCode && !formik.errors.postCode
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.postCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps("phone")}
                                            isInvalid={
                                                formik.touched.phone && !!formik.errors.phone
                                            }
                                            isValid={
                                                formik.touched.phone && !formik.errors.phone
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="w-full h-10 flex items-center justify-end">
                                        <button
                                            className="border mb-5 h-10 w-24 hover:opacity-30 rounded-lg cursor-pointer text-gray-300 hover:text-slate-950 hover:bg-gray-50"
                                            type="submit"
                                            disabled={!(formik.dirty && formik.isValid) || loading}
                                        >
                                            {loading && <Spinner animation="border" size="sm" />} Update
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
