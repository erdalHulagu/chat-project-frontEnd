
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { updateUsers } from "../../../redux/store/slices/user/upDateUser/update-user-action";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const { isUserLogin, user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.updateCurrentUser);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!isUserLogin) {
      toast.error("Please log in to update your profile!");
      navigate("/login");
    }
  }, [isUserLogin, navigate]);

  // Profil Görüntüleme ve Güncelleme Arasında Geçiş
  const updateProfile = () => {
    setUpdate(!update);
  };

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
    if (file) setProfileImage(file);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("postCode", values.postCode);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const resultAction = await dispatch(updateUsers(formData));
      if (updateUsers.fulfilled.match(resultAction)) {
        toast.success("Profile updated successfully!");
        setUpdate(false);
      } else {
        toast.error(resultAction.payload || "Failed to update profile");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="h-full w-full flex absolute">
      {/* Profil Görüntüleme */}
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
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                First Name <span className="text-slate-600">{user?.firstName}</span>
              </div>
              <div className="p-3 lex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Last Name <span className="text-slate-600">{user?.lastName}</span>
              </div>
              <div className="p-3 lex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Phone Number <span className="text-slate-600">{user?.phone}</span>
              </div>
              <div className="p-3 lex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Post Code <span className="text-slate-600">{user?.postCode}</span>
              </div>
              <div className="p-3 lex flex-col h-full text-sm shadow-lg shadow-slate-800 text-gray-500">
                Address <span className="text-slate-600">{user?.address}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profil Güncelleme */}
      <div className="h-full w-[70%] rounded">
        <div className="opacity-80 w-full rounded max-w-2xl flex justify-center">
          {!update ? (
            <div className="h-30 w-full flex items-center justify-end">
              <div
                onClick={updateProfile}
                className="flex my-2 mr-4 h-10 w-auto gap-2 items-center cursor-pointer justify-evenly hover:text-red-600 text-gray-300"
              >
                <FaLongArrowAltRight /> Update Profile
              </div>
            </div>
          ) : (
            <Form
              className="w-[70%] text-white"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("phone")}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                />
              </Form.Group>
              <Form.Group controlId="formAdress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("address")}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("postCode")}
                  isInvalid={formik.touched.postCode && !!formik.errors.postCode}
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="formProfileImage">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </Form.Group>

              <button
                className="border mb-5 h-10 w-24 hover:opacity-30 rounded-lg cursor-pointer text-gray-300 hover:text-slate-950 hover:bg-gray-50"
                type="submit"
                disabled={!(formik.dirty && formik.isValid) || loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Update"}
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
