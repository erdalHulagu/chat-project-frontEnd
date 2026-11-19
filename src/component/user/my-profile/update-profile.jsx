
import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const imageRef = useRef(null);

  const { user, isUserLogin } = useAppSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(false);
  const [hasNewImage, setHasNewImage] = useState(false);

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
      if (!formik.dirty && !hasNewImage) return;

      setLoading(true);

      try {
        // Formda değişiklik varsa kişisel bilgileri güncelle.
        if (formik.dirty) {
          const request = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            phone: values.phone.trim(),
            address: values.address.trim(),
            postCode: values.postCode.trim(),
            email: values.email.trim(),
          };

          const response = await updateUser(request);

          if (response.data?.token) {
            encryptedLocalStorage.setItem(
              "token",
              response.data.token
            );
          }
        }

        // Yeni fotoğraf seçilmişse yükle.
        // Fotoğraf bileşeni kendi kullanıcı bilgisini güncelliyor.
        if (hasNewImage) {
          await imageRef.current?.upload();
        } else {
          // Yalnızca form değişmişse kullanıcı bilgilerini yenile.
          const updatedUserResponse = await getUser();

          if (!updatedUserResponse.data) {
            throw new Error("Kullanıcı bilgileri alınamadı.");
          }

          dispatch(loginSuccess(updatedUserResponse.data));
        }

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
    "w-full min-w-0 rounded-xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-text";

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
    <div key={name} className="min-w-0">
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
    <main className="h-full min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-background scrollbar-thin-green">
      {/* İçeriği hem yatayda hem dikeyde ortala */}
      <div className="flex min-h-full w-full items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col">

          {/* Sayfa başlığı */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              <span aria-hidden="true">←</span>
              Geri dön
            </button>

            <h1 className="text-2xl font-bold text-text sm:text-3xl">
              Profili düzenle
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Profil fotoğrafınızı ve kişisel bilgilerinizi güncelleyin.
            </p>
          </div>

          {/* Tek ana panel */}
          <Form
            onSubmit={formik.handleSubmit}
            className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          >
            {/* Yeşil başlık */}
            <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light px-5 py-6 sm:px-8 sm:py-7">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                HESAP AYARLARI
              </p>

              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Kişisel bilgilerinizi güncelleyin
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/80">
                Profil fotoğrafınız ve hesap bilgileriniz tek bir yerden yönetilir.
              </p>
            </div>

            {/* Fotoğraf ve form */}
            <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">

              {/* Sol: Fotoğraf */}
              <div className="flex min-w-0 flex-col items-center border-b border-border p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="mb-6 w-full">
                  <h3 className="text-base font-bold text-text">
                    Profil fotoğrafı
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    Profilinizde kullanılacak fotoğrafı buradan değiştirebilirsiniz.
                  </p>
                </div>

                <div className="w-full max-w-sm">
                  <UpdateProfileImage
                    ref={imageRef}
                    onFileChange={setHasNewImage}
                  />
                </div>
              </div>

              {/* Sağ: Kişisel bilgiler */}
              <div className="min-w-0 p-5 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-text">
                    Kişisel bilgiler
                  </h3>

                  <p className="mt-1 text-sm text-text-secondary">
                    Lütfen hesap bilgilerinizi kontrol edin.
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
                  {renderField("firstName", "Ad")}
                  {renderField("lastName", "Soyad")}
                  {renderField("phone", "Telefon", "tel")}
                  {renderField("email", "E-posta", "email")}

                  <div className="min-w-0 sm:col-span-2">
                    <label
                      htmlFor="address"
                      className={labelClass}
                    >
                      Adres
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={3}
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
              </div>
            </div>

            {/* Tek kaydetme alanı */}
            <div className="flex flex-col-reverse gap-4 border-t border-border bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-xs leading-5 text-text-secondary">
                Profil fotoğrafı ve kişisel bilgileriniz tek işlemle güncellenir.
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-text-secondary transition hover:bg-background disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    (!formik.dirty && !hasNewImage)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Değişiklikleri kaydet"
                  )}
                </button>
              </div>
            </div>
          </Form>

          <p className="mt-4 pb-2 text-center text-xs text-text-muted">
            Hesap bilgileriniz güvenli şekilde güncellenir.
          </p>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
