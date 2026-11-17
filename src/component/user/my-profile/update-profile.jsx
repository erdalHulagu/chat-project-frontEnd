import React, { useEffect, useMemo, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { getUser, updateUser } from "../../../api/service/user-service";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { error, toast } from "../../../helper/swal";
import {
  loginSuccess,
  setImageURL,
} from "../../../redux/store/slices/user/auth/auth-slice";
import UpdateProfileImage from "./update_profile_image";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isUserLogin, user, imageUrl } = useAppSelector(
    (state) => state.auth
  );

  const [updating, setUpdating] = useState(false);

  const initialValues = useMemo(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    postCode: user?.postCode || "",
    email: user?.email || "",
  }), [user]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("First name is required"),
    lastName: Yup.string()
      .trim()
      .required("Last name is required"),
    phone: Yup.string()
      .nullable(),
    address: Yup.string()
      .trim()
      .required("Address is required"),
    postCode: Yup.string()
      .nullable(),
    email: Yup.string()
      .email("Enter a valid email address"),
  });

  useEffect(() => {
    if (!isUserLogin) {
      toast("Please log in to update your profile.");
      navigate("/login", { replace: true });
    }
  }, [isUserLogin, navigate]);

  const onSubmit = async (values) => {
    try {
      setUpdating(true);

      const response = await updateUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone,
        address: values.address.trim(),
        postCode: values.postCode,
        email: values.email,
      });

      if (response?.data?.token) {
        encryptedLocalStorage.setItem("token", response.data.token);
      }

      const updatedUserResponse = await getUser();
      const updatedUser = updatedUserResponse.data;

      // Kullanıcı bilgilerini güncelle.
      dispatch(loginSuccess(updatedUser));

      // loginSuccess sonrasında profil fotoğrafını koru.
      const currentImage = imageUrl || updatedUser?.profileImage;

      if (currentImage) {
        dispatch(setImageURL(currentImage));
      }

      toast("Profile updated successfully.");
      navigate(-1);
    } catch (err) {
      console.error("Profile update failed:", err);
      error(
        err?.response?.data?.message ||
        "Profile could not be updated."
      );
    } finally {
      setUpdating(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const handleCancel = () => {
    formik.resetForm();
    navigate(-1);
  };

  if (!isUserLogin || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto bg-slate-100 p-3 sm:p-6">

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">

        {/* Profile image */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-bold text-slate-800">
            Profile Photo
          </h2>

          <UpdateProfileImage />

          <div className="mt-5 text-center">
            <p className="text-lg font-bold text-slate-800">
              {user.firstName} {user.lastName}
            </p>
            <p className="mt-1 break-all text-sm text-slate-500">
              {user.email}
            </p>
          </div>
        </section>

        {/* Profile form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 border-b border-slate-100 pb-5">
            <h1 className="text-2xl font-bold text-slate-900">
              Edit Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <Form noValidate onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <Form.Group>
                <Form.Label className="font-semibold text-slate-700">
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                  className="py-2.5"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-semibold text-slate-700">
                  Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                  className="py-2.5"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-semibold text-slate-700">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  {...formik.getFieldProps("phone")}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                  className="py-2.5"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-semibold text-slate-700">
                  Post Code
                </Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("postCode")}
                  isInvalid={formik.touched.postCode && !!formik.errors.postCode}
                  className="py-2.5"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.postCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="sm:col-span-2">
                <Form.Label className="font-semibold text-slate-700">
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("address")}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                  className="py-2.5"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="sm:col-span-2">
                <Form.Label className="font-semibold text-slate-700">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                  disabled
                  className="bg-slate-100 py-2.5"
                />
                <Form.Text className="text-slate-400">
                  Email address cannot be changed here.
                </Form.Text>
              </Form.Group>
            </div>

            <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating || !formik.dirty}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating && (
                  <Spinner animation="border" size="sm" />
                )}
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default UpdateProfile;
