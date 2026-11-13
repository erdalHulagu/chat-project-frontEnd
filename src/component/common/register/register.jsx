
import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  BsChatHeartFill,
  BsGlobe2,
  BsShieldLockFill,
} from "react-icons/bs";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiHash,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { toast } from "../../../helper/swal";
import { register } from "../../../api/service/user-service";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postCode: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("First name is required."),

    lastName: Yup.string()
      .trim()
      .required("Last name is required."),

    email: Yup.string()
      .trim()
      .email("Please enter a valid email address.")
      .required("Email is required."),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required."),

    phone: Yup.string()
      .trim()
      .required("Phone number is required."),

    address: Yup.string()
      .trim()
      .required("Address is required."),

    postCode: Yup.string()
      .trim()
      .required("Post code is required."),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await register({
        ...values,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        postCode: values.postCode.trim(),
      });

      console.log("Registered user:", response.data);

      toast("You're registered successfully.", "success");

      formik.resetForm();
      navigate("/login", { replace: true });

    } catch (err) {
      console.error("Registration error:", err);

      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during registration.";

      toast(errorMessage, "error");

      const fieldErrors = err.response?.data?.errors;

      if (fieldErrors && typeof fieldErrors === "object") {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          if (field in initialValues) {
            formik.setFieldError(
              field,
              typeof message === "string" ? message : "Invalid value."
            );
          }
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

  const inputClass =
    "!h-11 !rounded-xl !border-slate-200 !bg-slate-50 !pl-10 !text-sm !text-slate-800 shadow-none focus:!border-indigo-500 focus:!bg-white focus:!ring-2 focus:!ring-indigo-100";

  const renderInput = ({
    name,
    label,
    placeholder,
    icon: Icon,
    type = "text",
    autoComplete,
  }) => (
    <Form.Group className="mb-4" controlId={`register-${name}`}>
      <Form.Label className="mb-2 text-sm font-semibold text-slate-700">
        {label}
      </Form.Label>

      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-indigo-500"
          size={17}
        />

        <Form.Control
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...formik.getFieldProps(name)}
          isInvalid={formik.touched[name] && !!formik.errors[name]}
          className={inputClass}
        />
      </div>

      <Form.Control.Feedback type="invalid">
        {formik.errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <div className="relative flex min-h-[calc(100dvh-6rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 px-4 py-8 sm:px-6">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 p-10 text-white md:flex lg:p-12">

          <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 top-32 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative z-10">

            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg">
                <BsChatHeartFill size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide">
                  Furqan
                </h2>
                <p className="text-xs tracking-[0.2em] text-indigo-200">
                  WORLDWIDE CONNECTION
                </p>
              </div>
            </div>

            <h1 className="max-w-sm text-4xl font-bold leading-tight lg:text-5xl">
              Join our
              <span className="mt-2 block text-indigo-300">
                connected world.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-indigo-100/80">
              Create your account and stay connected with friends,
              family and people around the world.
            </p>

          </div>

          <div className="relative z-10 mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BsGlobe2 size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Worldwide connection
                </p>
                <p className="text-xs text-indigo-200">
                  Connect without boundaries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BsShieldLockFill size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Private conversations
                </p>
                <p className="text-xs text-indigo-200">
                  Your account, your connection
                </p>
              </div>
            </div>

            <p className="pt-6 text-xs text-indigo-200/60">
              © {new Date().getFullYear()} Furqan Worldwide Connection
            </p>

          </div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="flex items-center justify-center bg-white px-5 py-9 sm:px-9 md:px-7 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-7 flex items-center justify-center gap-3 md:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-700 text-white shadow-lg">
                <BsChatHeartFill size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-indigo-950">
                  Furqan
                </h2>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-indigo-500">
                  WORLDWIDE CONNECTION
                </p>
              </div>
            </div>

            <div className="mb-7">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Get started
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in your details to join our community.
              </p>
            </div>

            <Form noValidate onSubmit={formik.handleSubmit}>

              {/* FIRST AND LAST NAME */}
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">

                {renderInput({
                  name: "firstName",
                  label: "First Name",
                  placeholder: "First name",
                  icon: FiUser,
                  autoComplete: "given-name",
                })}

                {renderInput({
                  name: "lastName",
                  label: "Last Name",
                  placeholder: "Last name",
                  icon: FiUser,
                  autoComplete: "family-name",
                })}

              </div>

              {/* EMAIL */}
              {renderInput({
                name: "email",
                label: "Email Address",
                placeholder: "Enter your email",
                icon: FiMail,
                type: "email",
                autoComplete: "email",
              })}

              {/* PASSWORD */}
              <Form.Group className="mb-4" controlId="register-password">

                <Form.Label className="mb-2 text-sm font-semibold text-slate-700">
                  Password
                </Form.Label>

                <div className="relative">
                  <FiLock
                    className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-indigo-500"
                    size={17}
                  />

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                    className={`${inputClass} !pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-700"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>

                <p className="mt-1.5 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>

              </Form.Group>

              {/* PHONE */}
              {renderInput({
                name: "phone",
                label: "Phone Number",
                placeholder: "Enter phone number",
                icon: FiPhone,
                type: "tel",
                autoComplete: "tel",
              })}

              {/* ADDRESS */}
              {renderInput({
                name: "address",
                label: "Address",
                placeholder: "Enter your address",
                icon: FiMapPin,
                autoComplete: "street-address",
              })}

              {/* POST CODE */}
              {renderInput({
                name: "postCode",
                label: "Post Code",
                placeholder: "Enter post code",
                icon: FiHash,
                autoComplete: "postal-code",
              })}

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || loading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-700 via-blue-800 to-purple-800 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </Form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-700 transition hover:text-purple-700"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs text-slate-400">
              Your connection starts here.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
