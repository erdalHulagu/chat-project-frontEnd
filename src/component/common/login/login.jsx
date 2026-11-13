
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
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

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

    onSubmit: async (values) => {
      const success = await dispatch(loginProfile(values));

      if (success) {
        navigate("/userHome", { replace: true });
      }
    },
  });

  return (
    <div className="relative flex min-h-[calc(100dvh-6rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 px-4 py-10 sm:px-6">

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
              Stay connected.
              <span className="mt-2 block text-indigo-300">
                Wherever you are.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-indigo-100/80">
              Connect with friends, share moments and keep your
              conversations close. Your world, one conversation away.
            </p>

          </div>

          <div className="relative z-10 mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BsGlobe2 size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold">Worldwide connection</p>
                <p className="text-xs text-indigo-200">Connect without boundaries</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BsShieldLockFill size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold">Private conversations</p>
                <p className="text-xs text-indigo-200">Your account, your connection</p>
              </div>
            </div>

            <p className="pt-6 text-xs text-indigo-200/60">
              © {new Date().getFullYear()} Furqan Worldwide Connection
            </p>

          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 md:px-9 lg:px-14">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
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

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
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

                <Form.Label className="mb-2 text-sm font-semibold text-slate-700">
                  Email address
                </Form.Label>

                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500"
                    size={18}
                  />

                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...formik.getFieldProps("email")}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    className="!h-12 !rounded-xl !border-slate-200 !bg-slate-50 !pl-11 !text-sm !text-slate-800 shadow-none focus:!border-indigo-500 focus:!bg-white focus:!ring-2 focus:!ring-indigo-100"
                  />
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>

              </Form.Group>

              {/* PASSWORD */}
              <Form.Group controlId="loginPassword" className="mb-4">

                <Form.Label className="mb-2 text-sm font-semibold text-slate-700">
                  Password
                </Form.Label>

                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500"
                    size={18}
                  />

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...formik.getFieldProps("password")}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    className="!h-12 !rounded-xl !border-slate-200 !bg-slate-50 !pl-11 !pr-12 !text-sm !text-slate-800 shadow-none focus:!border-indigo-500 focus:!bg-white focus:!ring-2 focus:!ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-700"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>

              </Form.Group>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-700 via-blue-800 to-purple-800 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">WELCOME</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-700 transition hover:text-purple-700"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-slate-400">
              Securely connect with the people who matter.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
