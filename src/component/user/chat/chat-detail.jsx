
import React, { useEffect, useState } from "react";

import { HiUserGroup } from "react-icons/hi";
import { HiPhone, HiUsers } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setFriendProfile } from "../../../redux/store/slices/friend/friendsProfileSlices";
import { getImageById } from "../../../api/service/image-service";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const ChatDetail = ({
    selectedUser,
    selectedChat,
    currentUserId,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);

    const users = Array.isArray(selectedChat?.users)
        ? selectedChat.users
        : [];

    const otherUsers = users.filter(
        (item) => String(item.id) !== String(currentUserId)
    );

    const isGroup = Boolean(selectedChat?.isGroup);

    const otherUser = isGroup
        ? otherUsers[0] || {}
        : selectedUser || otherUsers[0] || {};

    const displayName = isGroup
        ? selectedChat?.chatName || "Grup sohbeti"
        : `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim()
            || "Kullanıcı";

    const phone = otherUser.phone || "Telefon numarası bulunamadı";

    const profileImage =
        otherUser.profileImage ||
        otherUser.imageUrl ||
        otherUser.profilePicture;

    // Arkadaş profilini aç
    const handleOpenProfile = () => {
        if (isGroup || !otherUser?.id) return;

        dispatch(
            setFriendProfile({
                id: otherUser.id,
                name: otherUser.firstName || "",
                lastname: otherUser.lastName || "",
                email: otherUser.email || "",
                phone: otherUser.phone || "",
                image: profileImage || null,
            })
        );

        navigate("/friendProfile");
    };

    // Profil fotoğrafını yükle
    useEffect(() => {
        let objectUrl;
        let cancelled = false;

        const loadProfileImage = async () => {
            const imageId = isGroup
                ? selectedChat?.chatProfileImage
                : profileImage;

            if (!imageId) {
                setImageUrl(DEFAULT_IMAGE);
                return;
            }

            // Fotoğraf zaten URL ise doğrudan kullan
            if (
                typeof imageId === "string" &&
                (
                    imageId.startsWith("http://") ||
                    imageId.startsWith("https://") ||
                    imageId.startsWith("data:") ||
                    imageId.startsWith("blob:")
                )
            ) {
                setImageUrl(imageId);
                return;
            }

            try {
                const response = await getImageById(imageId);

                if (cancelled) return;

                const blob = new Blob([response.data], {
                    type:
                        response.headers["content-type"] ||
                        "image/jpeg",
                });

                objectUrl = URL.createObjectURL(blob);
                setImageUrl(objectUrl);
            } catch (error) {
                if (cancelled) return;

                console.error(
                    "Profil fotoğrafı yüklenemedi:",
                    error
                );

                setImageUrl(DEFAULT_IMAGE);
            }
        };

        loadProfileImage();

        return () => {
            cancelled = true;

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [
        profileImage,
        selectedChat?.chatProfileImage,
        isGroup,
    ]);

    if (!selectedUser && !selectedChat) return null;

    return (
        <div className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-primary/10 bg-white px-3 py-3 shadow-sm sm:px-4">

            {/* Profil fotoğrafı ve kullanıcı bilgileri */}
            <button
                type="button"
                onClick={handleOpenProfile}
                disabled={isGroup || !otherUser?.id}
                aria-label={`${displayName} profilini görüntüle`}
                className={`flex min-w-0 flex-1 items-center gap-3 text-left ${
                    !isGroup && otherUser?.id
                        ? "cursor-pointer rounded-lg transition hover:bg-primary-soft/40"
                        : "cursor-default"
                }`}
            >
                <div className="relative shrink-0">
                    <img
                        src={imageUrl}
                        alt={`${displayName} profil fotoğrafı`}
                        className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-primary-soft sm:h-14 sm:w-14"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                    />

                    {isGroup && (
                        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow">
                            <HiUserGroup size={13} />
                        </span>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p
                        title={displayName}
                        className="truncate text-sm font-bold text-text sm:text-base"
                    >
                        {displayName}
                    </p>

                    <div className="flex min-w-0 items-center gap-1.5 text-xs text-text-secondary">
                        {isGroup ? (
                            <>
                                <HiUsers className="shrink-0 text-primary" />
                                <span>{users.length} katılımcı</span>
                            </>
                        ) : (
                            <>
                                <HiPhone className="shrink-0 text-primary" />
                                <span className="truncate" title={phone}>
                                    {phone}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </button>

            {/* Sohbet türü */}
            <div className="hidden shrink-0 sm:block">
                <span className="flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-dark">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {isGroup ? "Grup sohbeti" : "Bireysel sohbet"}
                </span>
            </div>
        </div>
    );
};

export default ChatDetail;
