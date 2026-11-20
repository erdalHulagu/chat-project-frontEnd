import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiUser,
  FiSave,
  FiShield,
} from "react-icons/fi";

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

        if (hasNewImage) {
          await imageRef.current?.upload();
        } else {
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
    "w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

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
        <p className="mt-1.5 text-xs font-medium text-red-600">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  if (!isUserLogin) return null;

  return (
    <main className="h-full min-h-0 w-full min-w-0 flex-1 overflow-y-auto bg-background p-3 scrollbar-thin-green sm:p-5 lg:p-7">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center">
        {/* Sayfa başlığı */}
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Geri dön"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
          >
            <FiArrowLeft size={19} />
          </button>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Hesap ayarları
            </p>
            <h1 className="mt-1 text-xl font-bold text-text sm:text-2xl">
              Profili düzenle
            </h1>
          </div>
        </div>

        <Form
          onSubmit={formik.handleSubmit}
          className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
        >
          {/* Panel üst başlığı */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-5 sm:px-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <FiUser size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="font-bold text-text">
                Kişisel bilgiler
              </h2>
              <p className="mt-1 text-xs text-text-secondary">
                Profil fotoğrafınızı ve hesap bilgilerinizi güncelleyin.
              </p>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.7fr)]">
            {/* Sol: Profil fotoğrafı */}
            <aside className="min-w-0 border-b border-border bg-background/60 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="mb-5">
                <h3 className="text-sm font-bold text-text">
                  Profil fotoğrafı
                </h3>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Hesabınızda görüntülenecek fotoğrafı seçin.
                </p>
              </div>

              <UpdateProfileImage
                ref={imageRef}
                onFileChange={setHasNewImage}
              />
            </aside>

            {/* Sağ: Form alanları */}
            <section className="min-w-0 p-5 sm:p-7">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-text">
                  Hesap bilgileri
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Bilgilerinizi kontrol edin ve gerekli değişiklikleri yapın.
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
                {renderField("firstName", "Ad")}
                {renderField("lastName", "Soyad")}
                {renderField("phone", "Telefon", "tel")}
                {renderField("email", "E-posta", "email")}

                <div className="min-w-0 sm:col-span-2">
                  <label htmlFor="address" className={labelClass}>
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

                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                {renderField("postCode", "Posta kodu")}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary-soft/60 p-3">
                <FiShield className="mt-0.5 shrink-0 text-primary" size={17} />
                <p className="text-xs leading-5 text-text-secondary">
                  Hesap bilgileriniz yalnızca profilinizi güncellemek için kullanılır.
                </p>
              </div>
            </section>
          </div>

          {/* Alt işlem alanı */}
          <div className="flex flex-col gap-3 border-t border-border bg-background/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs text-text-secondary">
              {hasNewImage || formik.dirty
                ? "Kaydedilmemiş değişiklikleriniz var."
                : "Henüz bir değişiklik yapmadınız."}
            </p>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-secondary transition hover:bg-background disabled:opacity-50"
              >
                İptal
              </button>

              <button
                type="submit"
                disabled={loading || (!formik.dirty && !hasNewImage)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <FiSave size={17} />
                    Değişiklikleri kaydet
                  </>
                )}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default UpdateProfile;