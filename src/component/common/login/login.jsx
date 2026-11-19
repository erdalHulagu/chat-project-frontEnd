
import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import {
  BsChatHeartFill,
  BsShieldLockFill,
  BsGlobe2,
} from "react-icons/bs";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { loginProfile } from "../../../redux/store/slices/user/auth/auth_action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Please enter a valid email address.")
        .required("Email is required."),

      password: Yup.string()
        .required("Password is required."),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await dispatch(loginProfile(values));

        if (success) {
          navigate("/userHome", { replace: true });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-4 sm:px-6">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />

      <div className="relative z-10 grid h-full max-h-[850px] w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light p-10 text-white md:flex lg:p-12">

          {/* Decorative circles */}
          <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 top-32 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-sm">
                <BsChatHeartFill size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide">
                  Furqan
                </h2>

                <p className="text-xs tracking-[0.2em] text-white/70">
                  WORLDWIDE CONNECTION
                </p>
              </div>
            </div>

            <h1 className="max-w-sm text-4xl font-bold leading-tight lg:text-5xl">
              Stay connected.
              <span className="mt-2 block text-emerald-200">
                Wherever you are.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/80">
              Connect with friends, share moments and keep your
              conversations close. Your world, one conversation away.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BsGlobe2 size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Worldwide connection
                </p>

                <p className="text-xs text-white/65">
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

                <p className="text-xs text-white/65">
                  Your account, your connection
                </p>
              </div>
            </div>

            <p className="pt-6 text-xs text-white/50">
              © {new Date().getFullYear()} Furqan Worldwide Connection
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="custom-scrollbar flex h-full min-h-0 items-start justify-center overflow-y-auto bg-surface px-6 py-8 sm:px-10 md:items-center md:px-9 lg:px-14">

          <div className="w-full max-w-md shrink-0">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <BsChatHeartFill size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-primary-dark">
                  Furqan
                </h2>

                <p className="text-[10px] font-semibold tracking-[0.18em] text-primary">
                  WORLDWIDE CONNECTION
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-text">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Enter your details below to continue your conversations.
              </p>
            </div>

            <Form
              noValidate
              onSubmit={formik.handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}
              <Form.Group controlId="loginEmail" className="mb-4">
                <Form.Label className="mb-2 text-sm font-semibold text-text">
                  Email address
                </Form.Label>

                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    size={18}
                  />

                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...formik.getFieldProps("email")}
                    isInvalid={
                      formik.touched.email && !!formik.errors.email
                    }
                    className="!h-12 !rounded-xl !border-border !bg-background !pl-11 !text-sm !text-text shadow-none focus:!border-primary focus:!bg-surface focus:!ring-2 focus:!ring-primary/10"
                  />
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group controlId="loginPassword" className="mb-4">
                <Form.Label className="mb-2 text-sm font-semibold text-text">
                  Password
                </Form.Label>

                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    size={18}
                  />

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                    className="!h-12 !rounded-xl !border-border !bg-background !pl-11 !pr-12 !text-sm !text-text shadow-none focus:!border-primary focus:!bg-surface focus:!ring-2 focus:!ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition hover:text-primary"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  formik.isSubmitting
                }
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-dark via-primary to-primary-light text-sm font-bold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {formik.isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </Form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />

              <span className="text-xs text-text-muted">
                WELCOME
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-primary transition hover:text-primary-dark"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-text-muted">
              Securely connect with the people who matter.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
