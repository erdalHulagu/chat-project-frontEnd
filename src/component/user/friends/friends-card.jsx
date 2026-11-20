
import React from "react";
import { BiUserPlus } from "react-icons/bi";

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
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={onViewProfile}
        className="block h-52 w-full overflow-hidden bg-primary-soft"
        aria-label={`${name} ${lastname} profilini görüntüle`}
      >
        <img
          src={image}
          alt={`${name} ${lastname}`}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </button>

      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-text">
            {name} {lastname}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAddFriend?.({ id, name, lastname, image })}
          disabled={isAdded || loading || !id}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BiUserPlus size={18} />
          {loading ? "Ekleniyor..." : isAdded ? "Eklendi" : "Ekle"}
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
