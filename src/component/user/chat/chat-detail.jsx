
import React from "react";
import { HiUserGroup } from "react-icons/hi";

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
        : `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() || "User";

    const image = isGroup
        ? selectedChat?.chatProfileImage || DEFAULT_IMAGE
        : otherUser.profileImage || DEFAULT_IMAGE;

    if (!selectedUser && !selectedChat) return null;

    return (
        <div className="flex min-w-0 shrink-0 items-center gap-3 overflow-hidden py-1">
            <div className="relative shrink-0">
                <img
                    src={image}
                    alt={`${displayName} profile`}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-100 sm:h-12 sm:w-12"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                />

                {isGroup && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white">
                        <HiUserGroup size={11} />
                    </span>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-800 sm:text-base">
                    {displayName}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                    {isGroup
                        ? `${users.length} katılımcı`
                        : otherUser.phone || "Bireysel sohbet"}
                </p>
            </div>

            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {isGroup ? "Grup" : "Sohbet"}
            </span>
        </div>
    );
};

export default ChatDetail;
