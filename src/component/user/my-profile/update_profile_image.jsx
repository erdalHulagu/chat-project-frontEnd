
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/hooks";

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

import { error } from "../../../helper/swal";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const UpdateProfileImage = forwardRef(
  ({ onFileChange }, ref) => {
    const dispatch = useAppDispatch();

    const { imageUrl } = useAppSelector(
      (state) => state.auth
    );

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Önizleme URL'sini temizle.
    useEffect(() => {
      return () => {
        revokeImageObjectUrl(preview);
      };
    }, [preview]);

    // Fotoğraf seçimi ve doğrulama.
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

      // Ana bileşene fotoğraf seçildiğini bildir.
      // Böylece kaydet butonu aktif olur.
      onFileChange?.(true);
    };

    // Ana formun kaydet butonundan çağrılır.
    const uploadSelectedImage = async () => {
      if (!file) return;

      setLoading(true);

      let newUrl = null;

      try {
        // Fotoğrafı sunucuya yükle.
        const uploadResponse = await uploadImage(file);

        const imageId =
          uploadResponse.data?.imageId ||
          uploadResponse.data?.id;

        if (!imageId) {
          throw new Error("Fotoğraf ID bilgisi alınamadı.");
        }

        // Kullanıcının profil fotoğrafını güncelle.
        await updateUserImage(imageId);

        // Güncel kullanıcı bilgilerini getir.
        const userResponse = await getUser();
        const updatedUser = userResponse.data;

        if (!updatedUser) {
          throw new Error("Kullanıcı bilgileri alınamadı.");
        }

        // Kaydedilmiş fotoğraf ID'sini bul.
        const savedImageId =
          typeof updatedUser.profileImage === "string"
            ? updatedUser.profileImage
            : updatedUser.profileImage?.imageId ||
              updatedUser.profileImage?.id ||
              updatedUser.profileImage?._id;

        if (!savedImageId) {
          throw new Error(
            "Güncel profil fotoğrafı ID'si bulunamadı."
          );
        }

        // Güncel fotoğrafı getir.
        const imageResponse = await getImageById(savedImageId);

        const blob = new Blob([imageResponse.data], {
          type:
            imageResponse.headers?.["content-type"] ||
            file.type ||
            "image/jpeg",
        });

        newUrl = URL.createObjectURL(blob);

        // Redux kullanıcı bilgilerini güncelle.
        dispatch(loginSuccess(updatedUser));
        dispatch(setImageURL(newUrl));

        // Yeni URL Redux tarafından kullanılacağı için
        // hata durumunda temizlenecek URL olmaktan çıkar.
        newUrl = null;

        // Önceki fotoğraf URL'sini temizle.
        if (imageUrl) {
          revokeImageObjectUrl(imageUrl);
        }

        // Seçilen dosyayı ve önizlemeyi temizle.
        setFile(null);
        setPreview(null);

        // Ana bileşene fotoğrafın kaydedildiğini bildir.
        onFileChange?.(false);

      } catch (err) {
        if (newUrl) {
          revokeImageObjectUrl(newUrl);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    };

    // Ana bileşenin upload() fonksiyonunu çağırabilmesini sağlar.
    useImperativeHandle(
      ref,
      () => ({
        upload: uploadSelectedImage,
        hasFile: Boolean(file),
      }),
      [file]
    );

    return (
      <div className="flex min-w-0 flex-col items-center text-center">

        {/* Profil fotoğrafı */}
        <div className="relative mb-5">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-2 ring-primary/20 sm:h-32 sm:w-32">
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
            <span className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-primary px-2 py-1 text-[9px] font-bold text-white">
              ÖNİZLEME
            </span>
          )}
        </div>

        {/* Açıklama */}
        <h3 className="text-base font-bold text-text">
          Profil fotoğrafınız
        </h3>

        <p className="mt-2 max-w-xs text-xs leading-5 text-text-secondary">
          JPG, PNG veya WEBP formatında, en fazla 5 MB
          boyutunda fotoğraf seçin.
        </p>

        {/* Seçilen dosya bilgisi */}
        {file && (
          <div className="mt-4 w-full min-w-0 rounded-lg border border-primary/20 bg-primary-soft px-3 py-2">
            <p className="truncate text-xs font-semibold text-primary">
              {file.name}
            </p>

            <p className="mt-1 text-[11px] text-text-secondary">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Fotoğraf seçme */}
        <label
          className={`mt-5 inline-flex w-full max-w-xs cursor-pointer items-center justify-center rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white ${
            loading
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          <span>
            {file ? "Başka fotoğraf seç" : "Fotoğraf seç"}
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>

        {file && (
          <p className="mt-3 text-xs font-medium text-primary">
            Fotoğraf ana kaydet butonuyla kaydedilecek.
          </p>
        )}

        {loading && (
          <p className="mt-3 text-xs text-text-secondary">
            Fotoğraf yükleniyor...
          </p>
        )}

      </div>
    );
  }
);

UpdateProfileImage.displayName = "UpdateProfileImage";

export default UpdateProfileImage;
