
import React from "react";
import { FiUsers, FiCheck } from "react-icons/fi";

const ExistingGroupCard = ({
  group = {},
  selected = false,
  onSelect,
}) => {
 const groupName =
    group.chatName || group.groupName || group.name || "İsimsiz grup";

  const memberCount =
    group.users?.length ??
    group.members?.length ??
    group.memberCount ??
    group.membersCount ??
    0;

  const groupImage =
    group.image ||
    group.imageUrl ||
    group.photo ||
    "https://placehold.co/100x100/E6F2ED/075E45?text=Group";

  const handleSelect = () => {
    onSelect?.(group);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200
        ${
          selected
            ? "border-primary bg-primary-soft shadow-sm"
            : "border-border bg-surface hover:border-primary/40 hover:bg-primary-soft/50"
        }`}
    >
      {/* Checkbox */}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors
          ${
            selected
              ? "border-primary bg-primary text-white"
              : "border-slate-300 bg-white"
          }`}
      >
        {selected && <FiCheck size={14} />}
      </span>

      {/* Group image */}
      <img
        src={groupImage}
        alt={groupName}
        onError={(event) => {
          event.currentTarget.src =
            "https://placehold.co/100x100/E6F2ED/075E45?text=Group";
        }}
        className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
      />

      {/* Group information */}
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <span className="truncate text-sm font-semibold text-text">
          {groupName}
        </span>

        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <FiUsers size={13} />
          {memberCount} üye
        </span>
      </span>

      {selected && (
        <span className="shrink-0 text-xs font-semibold text-primary">
          Seçildi
        </span>
      )}
    </button>
  );
};

export default ExistingGroupCard;
