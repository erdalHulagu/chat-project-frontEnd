import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { updateUserProfile } from "../../../redux/store/slices/user/upDateUser/update-user-action";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const { isUserLogin, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserLogin) {
      toast.error("Please log in to update your profile!");
      navigate("/login");
    }
  }, [isUserLogin, navigate]);

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
    profileImage : user?.profileImage || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Type in a valid email address")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  //   postCode: Yup.string()
  //     .matches(/^\d{6}$/, "Post code must be 5 digits")
  //     .required("Post code is required"),
  });

  // const handleProfileImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setProfileImage(file);
  // };

  const onSubmit = async (values) => {
    setLoading(true); // Yükleniyor durumunu başlat
    const imageId = user?.profileImage; // Kullanıcıdan profil resmi ID'sini al
    await dispatch(updateUserProfile({ ...values }, imageId)); // Redux eylem oluşturucusunu çağır
    setLoading(false); // Yükleniyor durumunu durdur
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
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Last Name <span className="text-slate-600">{user?.lastName}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Phone Number <span className="text-slate-600">{user?.phone}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Post Code <span className="text-slate-600">{user?.postCode}</span>
              </div>
              <div className="p-3 flex flex-col h-full text-sm shadow-lg shadow-slate-800 text-gray-500">
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
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  isInvalid={!!formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  isInvalid={!!formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  isInvalid={!!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  isInvalid={!!formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  isInvalid={!!formik.errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="postCode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Post Code"
                  name="postCode"
                  onChange={formik.handleChange}
                  value={formik.values.postCode}
                  isInvalid={!!formik.errors.postCode}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.postCode}
                </Form.Control.Feedback>
              </Form.Group>

              {//<Form.Group controlId="profileImage">
                //<Form.Label>Profile Image</Form.Label>
                //<Form.Control
                  //type="file"
                  //accept="image/*"
                  //onChange={handleProfileImageChange}
               ///>
              // </Form.Group>
              }

              <div className="flex justify-between mt-3">
                <div
                  onClick={updateProfile}
                  className="cursor-pointer text-gray-300 hover:text-red-600"
                >
                  <FaLongArrowAltLeft /> Back
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
