
import React from "react";
import { IoClose } from "react-icons/io5";
import { FaExpandAlt } from "react-icons/fa";

const FriendPhotos = ({
  isEnlarged,
  handleToggleSize,
  image = "https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg",
}) => {
  return (
    <>
      {/* Fotoğraf kartı */}
      <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        <button
          type="button"
          onClick={handleToggleSize}
          className="relative block h-56 w-full overflow-hidden bg-background"
          aria-label="Fotoğrafı büyüt"
        >
          <img
            src={image}
            alt="Arkadaş fotoğrafı"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
            <FaExpandAlt size={26} />
          </span>
        </button>

        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h3 className="font-semibold text-text">
              Fotoğraf
            </h3>
            <p className="mt-1 text-xs text-text-secondary">
              Görüntülemek için tıkla
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleSize}
            aria-label="Fotoğrafı büyüt"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-all hover:bg-primary hover:text-white"
          >
            <FaExpandAlt size={17} />
          </button>
        </div>
      </article>

      {/* Büyük fotoğraf */}
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
            aria-label="Fotoğrafı kapat"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
          >
            <IoClose size={28} />
          </button>

          <img
            src={image}
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
