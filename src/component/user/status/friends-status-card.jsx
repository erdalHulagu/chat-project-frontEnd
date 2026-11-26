import React from "react";
import { FiClock } from "react-icons/fi";

const DEFAULT_IMAGE =
  "https://placehold.co/100x100/E6F2ED/075E45?text=User";

const formatStatusTime = (dateValue) => {
  if (!dateValue) return "Recent update";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recent update";
  }

  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FriendStatusCard = ({
  friend = {},
  onClick,
  active = false,
}) => {
  const name =
    friend.name ||
    [friend.firstName, friend.lastName]
      .filter(Boolean)
      .join(" ") ||
    friend.username ||
    friend.fullName ||
    "Unknown User";

  const image =
    friend.profileImage ||
    friend.image ||
    friend.avatar ||
    DEFAULT_IMAGE;

  const time = formatStatusTime(
    friend.statusTime || friend.createdAt || friend.updatedAt
  );

  const handleClick = () => {
    onClick?.(friend);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
        active
          ? "border-primary bg-primary-soft"
          : "border-transparent bg-surface hover:border-border hover:bg-background"
      }`}
    >
      {/* Profile image */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-[3px] ${
          active
            ? "bg-primary"
            : "bg-gradient-to-tr from-primary to-primary-light"
        }`}
      >
        <img
          src={image}
          alt={name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="h-full w-full rounded-full border-2 border-surface object-cover"
        />
      </div>

      {/* Friend information */}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-semibold text-text">
          {name}
        </span>

        <span className="flex items-center gap-1 text-xs text-text-muted">
          <FiClock size={12} />
          {time}
        </span>
      </span>

      {active && (
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
      )}
    </button>
  );
};

export default FriendStatusCard;