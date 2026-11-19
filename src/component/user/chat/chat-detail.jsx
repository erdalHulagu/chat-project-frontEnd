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
        <div className="flex w-full min-w-0 max-w-full shrink-0 items-center gap-2 overflow-hidden py-1 sm:gap-3">

            {/* PROFILE IMAGE */}
            <div className="relative shrink-0">
                <img
                    src={image}
                    alt={`${displayName} profile`}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm ring-2 ring-primary-soft sm:h-12 sm:w-12"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                />

                {isGroup && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm">
                        <HiUserGroup size={11} />
                    </span>
                )}
            </div>

            {/* USER INFORMATION */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <p
                    title={displayName}
                    className="truncate text-sm font-bold leading-5 text-text sm:text-base"
                >
                    {displayName}
                </p>

                <p
                    title={
                        isGroup
                            ? `${users.length} katılımcı`
                            : otherUser.phone || "Bireysel sohbet"
                    }
                    className="mt-1 truncate text-xs text-text-secondary"
                >
                    {isGroup
                        ? `${users.length} katılımcı`
                        : otherUser.phone || "Bireysel sohbet"}
                </p>
            </div>

            {/* CHAT TYPE BADGE */}
            <div className="hidden shrink-0 items-center sm:flex">
                <span className="flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary-soft px-2.5 py-1 text-[10px] font-semibold text-primary-dark sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {isGroup ? "Grup" : "Sohbet"}
                </span>
            </div>
        </div>
    );
};

export default ChatDetail;