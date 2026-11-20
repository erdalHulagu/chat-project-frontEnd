
import React, { useState } from "react";
import { BiUserPlus, BiCheck } from "react-icons/bi";

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
  const [imageError, setImageError] = useState(false);

  const fullName = `${name || ""} ${lastname || ""}`.trim();

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase("tr"))
    .join("");

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      {/* Profil fotoğrafı */}
      <button
        type="button"
        onClick={onViewProfile}
        className="relative block h-40 w-full overflow-hidden bg-primary-soft sm:h-48"
        aria-label={`${fullName} profilini görüntüle`}
      >
        {image && !imageError ? (
          <img
            src={image}
            alt={fullName}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-soft to-background">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/70 bg-primary text-2xl font-bold text-white shadow-lg">
              {initials || "?"}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 text-left">
          <p className="truncate text-base font-bold text-white">
            {fullName || "İsimsiz kullanıcı"}
          </p>
        </div>
      </button>

      {/* Kart içeriği */}
      <div className="p-4">
        <p className="mb-3 text-xs text-text-secondary">
          Arkadaş profili
        </p>

        <button
          type="button"
          onClick={() => onAddFriend?.(id)}
          disabled={isAdded || loading || !id}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
            isAdded
              ? "border border-border bg-background text-text-secondary"
              : "bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          }`}
        >
          {isAdded ? (
            <>
              <BiCheck size={21} />
              Eklendi
            </>
          ) : loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Ekleniyor...
            </>
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
