import React, { useEffect, useMemo, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/hooks";

import {
  getUser,
  updateUser,
} from "../../../api/service/user-service";

import {
  encryptedLocalStorage,
} from "../../../helper/auth-token/encrypt-storage";

import {
  error,
  toast,
} from "../../../helper/swal";

import {
  loginSuccess,
} from "../../../redux/store/slices/user/auth/auth-slice";

import UpdateProfileImage from "./update_profile_image";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isUserLogin } = useAppSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserLogin) {
      navigate("/login", { replace: true });
    }
  }, [isUserLogin, navigate]);

  const initialValues = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      address: user?.address || "",
      postCode: user?.postCode || "",
      email: user?.email || "",
    }),
    [user]
  );

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("Ad alanı zorunludur.")
      .max(50, "Ad en fazla 50 karakter olabilir."),

    lastName: Yup.string()
      .trim()
      .required("Soyad alanı zorunludur.")
      .max(50, "Soyad en fazla 50 karakter olabilir."),

    phone: Yup.string()
      .trim()
      .required("Telefon alanı zorunludur.")
      .max(20, "Telefon numarası çok uzun."),

    address: Yup.string()
      .trim()
      .max(250, "Adres en fazla 250 karakter olabilir."),

    postCode: Yup.string()
      .trim()
      .max(20, "Posta kodu çok uzun."),

    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin.")
      .required("E-posta alanı zorunludur."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);

      try {
        const request = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phone: values.phone.trim(),
          address: values.address.trim(),
          postCode: values.postCode.trim(),
          email: values.email.trim(),
        };

        const response = await updateUser(request);

        // Backend yeni token döndürüyorsa sakla.
        const token = response.data?.token;

        if (token) {
          encryptedLocalStorage.setItem("token", token);
        }

        // Güncel kullanıcı profilini backend'den tekrar getir.
        const updatedUserResponse = await getUser();

        if (!updatedUserResponse.data) {
          throw new Error("Güncel profil bilgileri alınamadı.");
        }

        dispatch(loginSuccess(updatedUserResponse.data));

        toast("Profil bilgileriniz başarıyla güncellendi.");

        navigate(-1);
      } catch (err) {
        console.error("Profile update error:", err);

        error(
          err.response?.data?.message ||
          err.message ||
          "Profil bilgileri güncellenemedi."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  const renderField = (name, label, type = "text") => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className={`${inputClass} ${
          formik.touched[name] && formik.errors[name]
            ? "border-red-500"
            : ""
        }`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={loading || name === "email"}
      />

      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  if (!isUserLogin) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Geri dön
          </button>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Profili düzenle
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Kişisel bilgilerinizi ve profil fotoğrafınızı buradan güncelleyebilirsiniz.
          </p>
        </div>

        <div className="space-y-6">
          <UpdateProfileImage />

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
              Kişisel bilgiler
            </h2>

            <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {renderField("firstName", "Ad")}
                {renderField("lastName", "Soyad")}
                {renderField("phone", "Telefon", "tel")}
                {renderField("email", "E-posta", "email")}

                <div className="sm:col-span-2">
                  <label htmlFor="address" className={labelClass}>
                    Adres
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className={inputClass}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loading}
                  />

                  {formik.touched.address &&
                    formik.errors.address && (
                      <p className="mt-1 text-xs text-red-600">
                        {formik.errors.address}
                      </p>
                    )}
                </div>

                {renderField("postCode", "Posta kodu")}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={loading || !formik.dirty}
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner animation="border" size="sm" />
                      Kaydediliyor...
                    </span>
                  ) : (
                    "Değişiklikleri kaydet"
                  )}
                </button>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;