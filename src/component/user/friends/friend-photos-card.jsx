
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaExpandAlt } from "react-icons/fa";
import { getImageById } from "../../../api/service/image-service";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const FriendPhotos = ({
  isEnlarged,
  handleToggleSize,
  image,
}) => {
  const [photo, setPhoto] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    let objectUrl;

    const loadPhoto = async () => {
      if (!image) {
        setPhoto(DEFAULT_IMAGE);
        return;
      }

      if (
        typeof image === "string" &&
        /^(https?:\/\/|data:image\/|blob:)/i.test(image)
      ) {
        setPhoto(image);
        return;
      }

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
        console.error("Fotoğraf yüklenemedi:", error);
        setPhoto(DEFAULT_IMAGE);
      }
    };

    loadPhoto();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        <button
          type="button"
          onClick={handleToggleSize}
          className="relative block h-60 w-full overflow-hidden bg-primary-soft"
          aria-label="Fotoğrafı büyüt"
        >
          <img
            src={photo}
            alt="Arkadaş fotoğrafı"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
            <FaExpandAlt size={26} />
          </span>
        </button>

        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-semibold text-text">Fotoğraf</h3>
            <p className="mt-1 text-xs text-text-secondary">
              Görüntülemek için tıkla
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleSize}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition hover:bg-primary hover:text-white"
            aria-label="Fotoğrafı büyüt"
          >
            <FaExpandAlt size={17} />
          </button>
        </div>
      </article>

      {isEnlarged && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={handleToggleSize}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleToggleSize();
            }}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
            aria-label="Kapat"
          >
            <IoClose size={28} />
          </button>

          <img
            src={photo}
            alt="Büyütülmüş arkadaş fotoğrafı"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default FriendPhotos;
