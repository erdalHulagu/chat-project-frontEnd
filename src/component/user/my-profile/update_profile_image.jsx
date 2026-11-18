import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

import {
  loginSuccess,
  setImageURL,
} from "../../../redux/store/slices/user/auth/auth-slice";

import {
  uploadImage,
  getImageById,
} from "../../../api/service/image-service";

import {
  updateUserImage,
  getUser,
} from "../../../api/service/user-service";

import { DEFAULT_IMAGE, revokeImageObjectUrl } from "../../../helper/profile-image-utils";
import { error, toast } from "../../../helper/swal";

const UpdateProfileImage = () => {
  const dispatch = useAppDispatch();

  const { imageUrl } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        revokeImageObjectUrl(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      error("JPG, PNG veya WEBP formatında bir görsel seçin.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      error("Fotoğraf en fazla 5 MB olabilir.");
      return;
    }

    if (preview) {
      revokeImageObjectUrl(preview);
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      error("Lütfen önce fotoğraf seçin.");
      return;
    }

    setLoading(true);

    let newUrl = null;

    try {
      // 1. Fotoğrafı yükle
      const uploadResponse = await uploadImage(file);

      const imageId =
        uploadResponse.data?.imageId ||
        uploadResponse.data?.id;

      if (!imageId) {
        throw new Error("Fotoğraf ID bilgisi alınamadı.");
      }

      // 2. Fotoğrafı kullanıcı profiline bağla
      await updateUserImage(imageId);

      // 3. Güncel kullanıcıyı getir
      const userResponse = await getUser();
      const updatedUser = userResponse.data;

      if (!updatedUser) {
        throw new Error("Kullanıcı bilgileri alınamadı.");
      }

      // 4. Backend'deki profil fotoğrafı ID'sini al
      const savedImageId =
        typeof updatedUser.profileImage === "string"
          ? updatedUser.profileImage
          : updatedUser.profileImage?.imageId ||
            updatedUser.profileImage?.id ||
            updatedUser.profileImage?._id;

      if (!savedImageId) {
        throw new Error("Güncel profil fotoğrafı ID'si bulunamadı.");
      }

      // 5. Fotoğrafı tekrar backend'den indir
      const imageResponse = await getImageById(savedImageId);

      const blob = new Blob([imageResponse.data], {
        type:
          imageResponse.headers?.["content-type"] ||
          file.type ||
          "image/jpeg",
      });

      newUrl = URL.createObjectURL(blob);

      // 6. Redux'u güncelle
      dispatch(loginSuccess(updatedUser));
      dispatch(setImageURL(newUrl));

      // 7. Eski URL'yi temizle
      if (imageUrl?.startsWith("blob:")) {
        revokeImageObjectUrl(imageUrl);
      }

      setFile(null);
      setPreview(null);

      toast("Profil fotoğrafı güncellendi.");
    } catch (err) {
      console.error("Fotoğraf güncelleme hatası:", err);

      if (newUrl?.startsWith("blob:")) {
        revokeImageObjectUrl(newUrl);
      }

      error(
        err.response?.data?.message ||
        err.message ||
        "Profil fotoğrafı görüntülenemedi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <img
          src={preview || imageUrl || DEFAULT_IMAGE}
          alt="Profil fotoğrafı"
          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
          onError={(event) => {
            event.currentTarget.src = DEFAULT_IMAGE;
          }}
        />

        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-gray-800">
            Profil fotoğrafını değiştir
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            JPG, PNG veya WEBP - Maksimum 5 MB
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label className="cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-gray-50">
              Fotoğraf seç
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>

            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || loading}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" animation="border" />
                  Yükleniyor...
                </span>
              ) : (
                "Fotoğrafı kaydet"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileImage;