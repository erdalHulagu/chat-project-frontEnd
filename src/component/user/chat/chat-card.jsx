
import React from "react";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const ChatCard = ({
    item,
    onClick,
    active = false,
    currentUserId,
}) => {
    if (!item) return null;

    const users = Array.isArray(item.users) ? item.users : [];

    const otherUsers = users.filter(
        (user) => String(user.id) !== String(currentUserId)
    );

    const isGroup = Boolean(item.isGroup);

    const otherUser = otherUsers[0] || users[0] || {};

    const displayName = isGroup
        ? item.chatName || "Group conversation"
        : `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() ||
          "User";

    const image = isGroup
        ? item.chatProfileImage || DEFAULT_IMAGE
        : otherUser.profileImage || DEFAULT_IMAGE;

    const messages = Array.isArray(item.messages) ? item.messages : [];
    const lastMessage = messages.length
        ? messages[messages.length - 1]
        : null;

    const preview = lastMessage?.content || "Henüz mesaj yok";

    const handleClick = () => {
        if (typeof onClick === "function") {
            onClick(item);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`flex w-full items-center gap-3 border-b border-slate-100 px-3 py-3 text-left transition sm:px-4 ${
                active ? "bg-indigo-50" : "bg-white hover:bg-slate-50"
            }`}
        >
            <img
                src={image}
                alt={`${displayName} profile`}
                className="h-12 w-12 shrink-0 rounded-full border border-slate-200 object-cover sm:h-14 sm:w-14"
                onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = DEFAULT_IMAGE;
                }}
            />

            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">
                        {displayName}
                    </p>

                    {isGroup && (
                        <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
                            Grup
                        </span>
                    )}
                </div>

                <p className="mt-1 truncate text-xs text-slate-500">
                    {isGroup
                        ? `${users.length} katılımcı`
                        : otherUser.phone || "Telefon bilgisi yok"}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                    {preview}
                </p>
            </div>
        </button>
    );
};

export default ChatCard;
