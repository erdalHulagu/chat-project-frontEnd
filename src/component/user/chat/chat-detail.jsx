
import React from "react";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const ChatDetail = ({
    selectedUser,
    selectedChat,
    currentUserId,
}) => {
    const users = Array.isArray(selectedChat?.users)
        ? selectedChat.users
        : [];

    const otherUsers = users.filter(
        (user) => String(user.id) !== String(currentUserId)
    );

    const isGroup = Boolean(selectedChat?.isGroup);

    const otherUser = selectedUser || otherUsers[0] || {};

    const displayName = isGroup
        ? selectedChat?.chatName || "Group conversation"
        : `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() ||
          "User";

    const image = isGroup
        ? selectedChat?.chatProfileImage || DEFAULT_IMAGE
        : otherUser.profileImage || DEFAULT_IMAGE;

    if (!selectedUser && !selectedChat) return null;

    return (
        <div className="flex min-w-0 items-center gap-3 py-1">
            <img
                src={image}
                alt={`${displayName} profile`}
                className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover sm:h-12 sm:w-12"
                onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = DEFAULT_IMAGE;
                }}
            />

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                    {displayName}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                    {isGroup
                        ? `${users.length} katılımcı`
                        : otherUser.phone || "Telefon bilgisi yok"}
                </p>
            </div>

            <span className="mr-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
        </div>
    );
};

export default ChatDetail;
