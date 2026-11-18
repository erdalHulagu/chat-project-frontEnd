
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
      .trim()
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

        // 1. Kullanıcı bilgilerini güncelle.
        const response = await updateUser(request);

        // 2. Backend yeni token döndürdüyse kaydet.
        if (response.data?.token) {
          encryptedLocalStorage.setItem(
            "token",
            response.data.token
          );
        }

        // 3. Güncel kullanıcı bilgilerini yeniden getir.
        const updatedUserResponse = await getUser();

        if (!updatedUserResponse.data) {
          throw new Error("Kullanıcı bilgileri alınamadı.");
        }

        // 4. Redux kullanıcı bilgilerini güncelle.
        // loginSuccess imageUrl değerini değiştirmemelidir.
        dispatch(loginSuccess(updatedUserResponse.data));

        toast("Profil bilgileriniz başarıyla güncellendi.");

        navigate(-1);
      } catch (err) {
        console.error("Profil güncelleme hatası:", err);

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
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-slate-400 focus:border-[#075E45] focus:ring-4 focus:ring-[#075E45]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const getInputClass = (name) => {
    const hasError =
      formik.touched[name] && formik.errors[name];

    return `${inputClass} ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : ""
    }`;
  };

  const renderField = (name, label, type = "text") => (
    <div key={name}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className={getInputClass(name)}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={loading || name === "email"}
        placeholder={`${label} girin`}
      />

      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  if (!isUserLogin) return null;

  return (
    <main className="min-h-screen bg-[#F1F5F9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Sayfa başlığı */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#075E45] transition hover:bg-[#075E45]/10"
          >
            <span aria-hidden="true">←</span>
            Geri dön
          </button>

          <div className="rounded-2xl bg-gradient-to-r from-[#043D30] via-[#075E45] to-[#0B7657] p-6 shadow-md sm:p-8">
            <p className="mb-2 text-sm font-semibold text-white/70">
              HESAP AYARLARI
            </p>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Profili düzenle
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
              Kişisel bilgilerinizi ve profil fotoğrafınızı
              buradan kolayca güncelleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profil fotoğrafı */}
          <UpdateProfileImage />

          {/* Kişisel bilgiler */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-[#1E293B]">
                Kişisel bilgiler
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Hesabınıza ait bilgileri bu bölümden düzenleyebilirsiniz.
              </p>
            </div>

            <div className="p-5 sm:p-8">
              <Form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {renderField("firstName", "Ad")}

                  {renderField("lastName", "Soyad")}

                  {renderField("phone", "Telefon", "tel")}

                  {renderField("email", "E-posta", "email")}

                  {/* Adres */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className={labelClass}
                    >
                      Adres
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={4}
                      className={`${getInputClass("address")} resize-y`}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      placeholder="Adresinizi girin"
                    />

                    {formik.touched.address &&
                      formik.errors.address && (
                        <p className="mt-2 text-xs font-medium text-red-600">
                          {formik.errors.address}
                        </p>
                      )}
                  </div>

                  {renderField("postCode", "Posta kodu")}
                </div>

                {/* Form butonları */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    İptal
                  </button>

                  <button
                    type="submit"
                    disabled={loading || !formik.dirty}
                    className="inline-flex items-center justify-center rounded-xl bg-[#075E45] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#043D30] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Spinner animation="border" size="sm" />
                        Kaydediliyor...
                      </span>
                    ) : (
                      "Değişiklikleri kaydet"
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </section>

          <p className="pb-4 text-center text-xs text-slate-400">
            Hesap bilgileriniz güvenli şekilde güncellenir.
          </p>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
