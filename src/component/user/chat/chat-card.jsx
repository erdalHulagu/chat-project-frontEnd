
import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";

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
        : `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() || "User";

    const image = isGroup
        ? item.chatProfileImage || DEFAULT_IMAGE
        : otherUser.profileImage || DEFAULT_IMAGE;

    const messages = Array.isArray(item.messages) ? item.messages : [];
    const lastMessage = messages.length
        ? messages[messages.length - 1]
        : null;

    const preview = lastMessage?.content || "Henüz mesaj yok";

    return (
        <button
            type="button"
            onClick={() => onClick?.(item)}
            className={`group relative flex w-full items-center gap-3 border-b border-slate-100 px-3 py-3.5 text-left cursor-pointer transition-all duration-200 ${active
                    ? "bg-emerald-100"
                    : "bg-white hover:!bg-emerald-50"
                }`}
        >
            {active && (
                <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-emerald-600" />
            )}

            <div className="relative shrink-0">
                <img
                    src={image}
                    alt={`${displayName} profile`}
                    className={`h-12 w-12 rounded-full object-cover ring-2 sm:h-14 sm:w-14 ${active ? "bg-emerald-100" : "bg-white hover:bg-emerald-50"
                        }`}
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

            <div className="min-w-0 flex-1 ">
                <div className="flex items-center justify-between gap-2  group-hover:text-emerald-600">
                    <p className={`truncate text-sm font-semibold ${active ? "text-emerald-900 " : "text-slate-800"
                        }`}>
                        {displayName}
                    </p>

                    {isGroup && (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            Grup
                        </span>
                    )}
                </div>

                <p className="mt-1 truncate text-xs text-slate-400 transition-colors duration-200 group-hover:text-emerald-600">
                    {isGroup
                        ? `${users.length} katılımcı`
                        : otherUser.phone || "Sohbet"}
                </p>

                <p className={`mt-1 truncate text-xs ${active ? "font-medium text-emerald-700" : "text-slate-500"
                    }`}>
                    {preview}
                </p>
            </div>

            <FiChevronRight
                size={16}
                className={`shrink-0 transition ${active
                    ? "text-emerald-600"
                    : "text-slate-300 opacity-0 group-hover:opacity-100"
                    }`}
            />
        </button>
    );
};

export default ChatCard;
