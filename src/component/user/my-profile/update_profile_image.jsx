
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

import {
  DEFAULT_IMAGE,
  revokeImageObjectUrl,
} from "../../../helper/profile-image-utils";

import { error, toast } from "../../../helper/swal";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const UpdateProfileImage = () => {
  const dispatch = useAppDispatch();

  const { imageUrl } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Önizleme URL'si değiştiğinde veya bileşen kapandığında temizle.
  useEffect(() => {
    return () => {
      revokeImageObjectUrl(preview);
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      error("JPG, PNG veya WEBP formatında bir görsel seçin.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      error("Fotoğraf en fazla 5 MB olabilir.");
      event.target.value = "";
      return;
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
      // 1. Fotoğrafı backend'e yükle.
      const uploadResponse = await uploadImage(file);

      const imageId =
        uploadResponse.data?.imageId ||
        uploadResponse.data?.id;

      if (!imageId) {
        throw new Error("Fotoğraf ID bilgisi alınamadı.");
      }

      // 2. Yüklenen fotoğrafı kullanıcı profiline bağla.
      await updateUserImage(imageId);

      // 3. Güncel kullanıcı bilgilerini getir.
      const userResponse = await getUser();
      const updatedUser = userResponse.data;

      if (!updatedUser) {
        throw new Error("Kullanıcı bilgileri alınamadı.");
      }

      // 4. Kullanıcı üzerindeki güncel profil fotoğrafı ID'sini al.
      const savedImageId =
        typeof updatedUser.profileImage === "string"
          ? updatedUser.profileImage
          : updatedUser.profileImage?.imageId ||
            updatedUser.profileImage?.id ||
            updatedUser.profileImage?._id;

      if (!savedImageId) {
        throw new Error("Güncel profil fotoğrafı ID'si bulunamadı.");
      }

      // 5. Fotoğrafı backend'den indir.
      const imageResponse = await getImageById(savedImageId);

      const blob = new Blob([imageResponse.data], {
        type:
          imageResponse.headers?.["content-type"] ||
          file.type ||
          "image/jpeg",
      });

      newUrl = URL.createObjectURL(blob);

      // 6. Redux kullanıcı bilgilerini ve görüntü URL'sini güncelle.
      dispatch(loginSuccess(updatedUser));
      dispatch(setImageURL(newUrl));

      // Yeni URL Redux'a aktarıldı; artık sahipliği Redux'a geçti.
      newUrl = null;

      // 7. Önceki profil fotoğrafı URL'sini temizle.
      if (imageUrl && imageUrl !== newUrl) {
        revokeImageObjectUrl(imageUrl);
      }

      setFile(null);
      setPreview(null);

      toast("Profil fotoğrafı başarıyla güncellendi.");
    } catch (err) {
      console.error("Fotoğraf güncelleme hatası:", err);

      // Redux'a aktarılmamış yeni URL varsa temizle.
      if (newUrl) {
        revokeImageObjectUrl(newUrl);
      }

      error(
        err.response?.data?.message ||
          err.message ||
          "Profil fotoğrafı güncellenemedi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#043D30] via-[#075E45] to-[#0B7657] px-5 py-4 sm:px-7">
        <h2 className="text-lg font-bold text-white">
          Profil fotoğrafı
        </h2>

        <p className="mt-1 text-sm text-white/80">
          Profilinizde görünecek fotoğrafı buradan değiştirebilirsiniz.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 p-5 sm:flex-row sm:p-7">
        <div className="relative shrink-0">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg ring-2 ring-[#075E45]/15">
            <img
              src={preview || imageUrl || DEFAULT_IMAGE}
              alt="Profil fotoğrafı"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
          </div>

          {preview && (
            <span className="absolute bottom-1 right-1 rounded-full border-2 border-white bg-[#0B7657] px-2 py-1 text-[10px] font-bold text-white">
              ÖNİZLEME
            </span>
          )}
        </div>

        <div className="w-full flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-[#1E293B]">
            Fotoğrafınızı güncelleyin
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            JPG, PNG veya WEBP formatında bir fotoğraf seçebilirsiniz.
            En yüksek dosya boyutu 5 MB olabilir.
          </p>

          {file && (
            <div className="mt-3 rounded-lg border border-[#0B7657]/20 bg-[#0B7657]/5 px-3 py-2 text-left">
              <p className="truncate text-sm font-medium text-[#075E45]">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label
              className={`inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#075E45] px-5 py-3 text-sm font-semibold text-[#075E45] transition hover:bg-[#075E45] hover:text-white ${
                loading ? "pointer-events-none opacity-50" : ""
              }`}
            >
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
              className="inline-flex items-center justify-center rounded-xl bg-[#075E45] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#043D30] disabled:cursor-not-allowed disabled:opacity-50"
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
    </section>
  );
};

export default UpdateProfileImage;
