import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

import {
    loginSuccess,
    setImageURL,
} from "../../../redux/store/slices/user/auth/auth-slice";

import { uploadImage } from "../../../api/service/image-service";
import { getUser } from "../../../api/service/user-service";
import { toast, error } from "../../../helper/swal";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const UpdateProfileImage = () => {
    const dispatch = useAppDispatch();

    const { imageUrl } = useAppSelector((state) => state.auth);

    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleProfileImageChange = async (event) => {
        const input = event.target;
        const file = input.files?.[0];

        if (!file) return;

        if (uploading) {
            input.value = "";
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
            error("Yalnızca JPG ve PNG dosyaları yükleyebilirsiniz.");
            input.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            error("Fotoğraf en fazla 5 MB olabilir.");
            input.value = "";
            return;
        }

        const newPreview = URL.createObjectURL(file);

        try {
            setUploading(true);
            setPreview(newPreview);

            // 1. Fotoğrafı yükle
            const response = await uploadImage(file);

            const imageId = response?.data?.imageId;

            if (!imageId) {
                throw new Error("Sunucudan fotoğraf ID bilgisi alınamadı.");
            }

            // 2. Redux fotoğraf bilgisini güncelle
            dispatch(setImageURL(imageId));

            // 3. Kullanıcı bilgilerini yenile
            try {
                const updatedUserResponse = await getUser();

                if (updatedUserResponse?.data) {
                    dispatch(loginSuccess(updatedUserResponse.data));
                }
            } catch (refreshError) {
                console.error("User refresh failed:", refreshError);

                // Fotoğraf yüklemesi başarılı olduğu için
                // bu hata yükleme işlemini başarısız göstermemeli.
            }

            toast("Profil fotoğrafınız başarıyla güncellendi.");

        } catch (err) {
            console.error("Profile image upload failed:", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });

            setPreview("");

            error(
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Profil fotoğrafı yüklenemedi."
            );

        } finally {
            setUploading(false);
            input.value = "";
        }
    };

    const displayedImage = preview || imageUrl || DEFAULT_IMAGE;

    return (
        <div className="flex w-full flex-col items-center justify-center px-4 py-5">

            <label
                htmlFor="profileImageInput"
                className={`group relative cursor-pointer ${
                    uploading ? "pointer-events-none" : ""
                }`}
            >
                <img
                    src={displayedImage}
                    alt="Profil fotoğrafı"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg transition duration-300 group-hover:brightness-90 sm:h-40 sm:w-40"
                />

                <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-md transition group-hover:bg-emerald-700 sm:h-11 sm:w-11">
                    <span className="text-lg">📷</span>
                </div>

                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/60">
                        <Spinner animation="border" variant="light" />
                    </div>
                )}
            </label>

            <input
                type="file"
                id="profileImageInput"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleProfileImageChange}
                disabled={uploading}
            />

            <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-slate-800 sm:text-base">
                    {uploading
                        ? "Fotoğraf yükleniyor..."
                        : "Profil fotoğrafını değiştir"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    JPG veya PNG · Maksimum 5 MB
                </p>
            </div>
        </div>
    );
};

export default UpdateProfileImage;