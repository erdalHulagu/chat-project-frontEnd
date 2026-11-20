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

import {
  FiCamera,
  FiUploadCloud,
  FiCheckCircle,
  FiImage,
} from "react-icons/fi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const UpdateProfileImage = forwardRef(({ onFileChange }, ref) => {
  const dispatch = useAppDispatch();

  const { imageUrl } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) revokeImageObjectUrl(preview);
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      error("Lütfen JPG, PNG veya WEBP formatında bir görsel seçin.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      error("Fotoğraf boyutu en fazla 5 MB olabilir.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    onFileChange?.(true);
  };

  const uploadSelectedImage = async () => {
    if (!file) return;

    setLoading(true);
    let newUrl = null;

    try {
      const uploadResponse = await uploadImage(file);

      const imageId =
        uploadResponse.data?.imageId ||
        uploadResponse.data?.id;

      if (!imageId) {
        throw new Error("Yüklenen fotoğrafın ID bilgisi alınamadı.");
      }

      await updateUserImage(imageId);

      const userResponse = await getUser();
      const updatedUser = userResponse.data;

      if (!updatedUser) {
        throw new Error("Kullanıcı bilgileri alınamadı.");
      }

      const savedImageId =
        typeof updatedUser.profileImage === "string"
          ? updatedUser.profileImage
          : updatedUser.profileImage?.imageId ||
            updatedUser.profileImage?.id ||
            updatedUser.profileImage?._id;

      if (!savedImageId) {
        throw new Error("Kaydedilen profil fotoğrafı bulunamadı.");
      }

      const imageResponse = await getImageById(savedImageId);

      const blob = new Blob([imageResponse.data], {
        type:
          imageResponse.headers?.["content-type"] ||
          file.type ||
          "image/jpeg",
      });

      newUrl = URL.createObjectURL(blob);

      dispatch(loginSuccess(updatedUser));
      dispatch(setImageURL(newUrl));

      newUrl = null;

      if (imageUrl) {
        revokeImageObjectUrl(imageUrl);
      }

      setFile(null);
      setPreview(null);
      onFileChange?.(false);
    } catch (err) {
      if (newUrl) revokeImageObjectUrl(newUrl);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      upload: uploadSelectedImage,
      hasFile: Boolean(file),
    }),
    [file]
  );

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div className="relative">
        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-border bg-background shadow-sm sm:h-40 sm:w-40">
          <img
            src={preview || imageUrl || DEFAULT_IMAGE}
            alt="Profil fotoğrafı önizlemesi"
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-surface bg-primary text-white shadow-sm">
          <FiCamera size={17} />
        </div>

        {preview && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow">
            ÖNİZLEME
          </span>
        )}
      </div>

      <div className="mt-6 text-center">
        <h3 className="font-bold text-text">
          Profil fotoğrafı
        </h3>
        <p className="mt-2 max-w-xs text-xs leading-5 text-text-secondary">
          JPG, PNG veya WEBP formatında, en fazla 5 MB boyutunda bir fotoğraf seçin.
        </p>
      </div>

      {file && (
        <div className="mt-5 flex w-full min-w-0 items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
            <FiImage size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-primary-dark">
              {file.name}
            </p>
            <p className="mt-1 text-[11px] text-text-secondary">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <FiCheckCircle className="shrink-0 text-primary" size={18} />
        </div>
      )}

      <label
        className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <FiUploadCloud size={18} />
        {file ? "Başka fotoğraf seç" : "Fotoğraf seç"}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>

      {loading ? (
        <p className="mt-3 text-xs font-medium text-primary">
          Fotoğraf yükleniyor...
        </p>
      ) : file ? (
        <p className="mt-3 text-center text-xs text-text-secondary">
          Fotoğrafınız ana kaydet butonuna bastığınızda yüklenecek.
        </p>
      ) : (
        <p className="mt-3 text-xs text-text-muted">
          Henüz yeni bir fotoğraf seçmediniz.
        </p>
      )}
    </div>
  );
});

UpdateProfileImage.displayName = "UpdateProfileImage";

export default UpdateProfileImage;