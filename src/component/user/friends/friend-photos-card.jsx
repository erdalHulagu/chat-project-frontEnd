
import React from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";

const FriendPhotos = ({
  isEnlarged,
  handleToggleSize,
  image = "https://cdn.pixabay.com/photo/2012/10/14/11/20/koalas-61189_1280.jpg",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-surface shadow-md ${
        isEnlarged ? "fixed inset-4 z-50 flex items-center justify-center bg-black/90" : ""
      }`}
    >
      <img
        onClick={handleToggleSize}
        className={`cursor-pointer object-cover transition hover:opacity-90 ${
          isEnlarged
            ? "max-h-full max-w-full"
            : "h-56 w-full"
        }`}
        src={image}
        alt="Arkadaş fotoğrafı"
      />

      {isEnlarged && (
        <button
          type="button"
          onClick={handleToggleSize}
          className="absolute left-3 top-3 rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
          aria-label="Fotoğrafı küçült"
        >
          <BiSolidLeftArrowSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default FriendPhotos;
