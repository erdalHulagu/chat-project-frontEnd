
import React, { useEffect, useState } from "react";
import { BiUserPlus, BiCheck } from "react-icons/bi";
import { getImageById } from "../../../api/service/image-service";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const FriendsCard = ({
  id,
  name,
  lastname,
  image,
  onAddFriend,
  onViewProfile,
  isAdded = false,
  loading = false,
}) => {
  const [photo, setPhoto] = useState(DEFAULT_IMAGE);
  const [imageLoading, setImageLoading] = useState(false);

  const fullName = `${name || ""} ${lastname || ""}`.trim();

  useEffect(() => {
    let objectUrl;

    const loadImage = async () => {
      if (!image) {
        setPhoto(DEFAULT_IMAGE);
        return;
      }

      // Resim zaten URL veya data URL ise doğrudan kullan.
      if (
        typeof image === "string" &&
        /^(https?:\/\/|data:image\/|blob:)/i.test(image)
      ) {
        setPhoto(image);
        return;
      }

      setImageLoading(true);

      try {
        const response = await getImageById(image);

        const result =
          response?.data?.data ??
          response?.data ??
          response;

        if (result instanceof Blob) {
          objectUrl = URL.createObjectURL(result);
          setPhoto(objectUrl);
        } else if (typeof result === "string") {
          setPhoto(
            result.startsWith("data:")
              ? result
              : `data:image/jpeg;base64,${result}`
          );
        } else if (result?.image) {
          setPhoto(result.image);
        } else if (result?.base64) {
          setPhoto(`data:image/jpeg;base64,${result.base64}`);
        } else {
          setPhoto(DEFAULT_IMAGE);
        }
      } catch (error) {
        console.error("Arkadaş fotoğrafı yüklenemedi:", error);
        setPhoto(DEFAULT_IMAGE);
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase("tr"))
    .join("");

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      <button
        type="button"
        onClick={onViewProfile}
        className="relative block h-44 w-full overflow-hidden bg-primary-soft sm:h-48"
        aria-label={`${fullName} profilini görüntüle`}
      >
        {imageLoading ? (
          <div className="flex h-full items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : (
          <img
            src={photo}
            alt={fullName || "Arkadaş fotoğrafı"}
            onError={() => setPhoto(DEFAULT_IMAGE)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-left">
          <p className="truncate text-base font-bold text-white">
            {fullName || initials || "Kullanıcı"}
          </p>
        </div>
      </button>

      <div className="p-4">
        <p className="mb-3 text-xs text-text-secondary">
          Arkadaş profili
        </p>

        <button
          type="button"
          onClick={() => onAddFriend?.(id)}
          disabled={isAdded || loading || !id}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
            isAdded
              ? "border border-border bg-background text-text-secondary"
              : "bg-primary text-white shadow-sm hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          }`}
        >
          {isAdded ? (
            <>
              <BiCheck size={21} />
              Eklendi
            </>
          ) : loading ? (
            "Ekleniyor..."
          ) : (
            <>
              <BiUserPlus size={21} />
              Arkadaş Ekle
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default FriendsCard;
