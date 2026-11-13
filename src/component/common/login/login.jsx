
import React from "react";
import { useFormik } from "formik";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAppDispatch } from "../../../redux/store/hooks";
import { loginProfile } from "../../../redux/store/slices/user/auth/auth_action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    <div className="flex h-full w-full items-center justify-center rounded">
      <div className="flex w-full max-w-xl items-center justify-center rounded opacity-90">
        <Form
          className="w-[70%] text-white"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="flex h-14 w-full items-center justify-end">
            <button
              className="mb-3 flex h-10 w-24 items-center justify-center gap-2 rounded-lg bg-gray-100 text-slate-900 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <Spinner animation="border" size="sm" />
              )}
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
