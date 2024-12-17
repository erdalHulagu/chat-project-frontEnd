// import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const UpdateProfile = () => {
    const dispatch = useAppDispatch();
    const { isUserLogin, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (!isUserLogin) {
            navigate("/login");
        }
    }, [isUserLogin, navigate]);

    const initialValues = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        password: "",
        phone: user?.phone || "",
        address: user?.address || "",
        postCode: user?.postCode || "",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .email("Type in a valid email address")
            .required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        address: Yup.string().required("Address is required"),
        postCode: Yup.string()
            .matches(/^\d{5}$/, "Post code must be 5 digits")
            .required("Post code is required"),
    });

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const onSubmit = async (values) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("phone", values.phone);
            formData.append("address", values.address);
            formData.append("postCode", values.postCode);

            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            const resp = await updateUser(formData);
            toast("Profile updated successfully", "success");
            dispatch(updateUserSlice(resp.data));
            setUpdate(false);
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
                                src={user?.profileImage || "/default-avatar.png"}
                                alt="Profile"
                            />
                        </div>
                        <div className="h-[80%] w-full flex flex-col">
                            <div className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                First Name <span className="text-slate-600">{user?.firstName}</span>
                            </div>
                            <div className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Last Name <span className="text-slate-600">{user?.lastName}</span>
                            </div>
                            <div className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Phone Number <span className="text-slate-600">{user?.phone}</span>
                            </div>
                            <div className="p-3 h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Post Code <span className="text-slate-600">{user?.postCode}</span>
                            </div>
                            <div className="p-3 h-full text-sm shadow-lg shadow-slate-800 text-gray-500">
                                Address <span className="text-slate-600">{user?.address}</span>
                            </div>
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
                                    {/* Other Fields */}
                                    <Form.Group className="mb-5" controlId="formProfileImage">
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileImageChange}
                                        />
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
