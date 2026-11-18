import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useAppDispatch,
    useAppSelector,
} from "../../../redux/store/hooks";

import {
    setImageURL,
} from "../../../redux/store/slices/user/auth/auth-slice";

import {
    getImageById,
} from "../../../api/service/image-service";

import {
    DEFAULT_IMAGE,
    getImageId,
    revokeImageObjectUrl,
} from "../../../helper/profile-image-utils";

import ProfileSettingDropdownMenu from "./profile-setting-dropdown-menu";

const MyProfile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        isUserLogin,
        user,
        imageUrl,
    } = useAppSelector((state) => state.auth);

    const [activeTab, setActiveTab] = useState("photos");
    const [searchFriends, setSearchFriends] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [galleryUrls, setGalleryUrls] = useState([]);

    const friends = useMemo(() => {
        const list = Array.isArray(user?.friends)
            ? user.friends
            : [];

        return list.filter((friend) => {
            const fullName = [
                friend.firstName || "",
                friend.lastName || "",
            ].join(" ");

            return fullName
                .toLowerCase()
                .includes(searchFriends.toLowerCase());
        });
    }, [user?.friends, searchFriends]);

    const photos = useMemo(() => {
        return Array.isArray(user?.myImages)
            ? user.myImages
            : [];
    }, [user?.myImages]);

    // Profil fotoğrafı Redux'ta henüz URL değilse backend'den çöz.
    useEffect(() => {
        let cancelled = false;
        let createdUrl = null;

        const loadProfileImage = async () => {
            if (imageUrl || !user?.profileImage) return;

            const imageId = getImageId(user.profileImage);

            if (!imageId) return;

            try {
                const response = await getImageById(imageId);

                const blob = new Blob([response.data], {
                    type:
                        response.headers?.["content-type"] ||
                        "image/jpeg",
                });

                createdUrl = URL.createObjectURL(blob);

                if (!cancelled) {
                    dispatch(setImageURL(createdUrl));
                } else {
                    revokeImageObjectUrl(createdUrl);
                }
            } catch (err) {
                console.error("Profile image loading error:", err);
            }
        };

        loadProfileImage();

        return () => {
            cancelled = true;
        };
    }, [user?.profileImage, imageUrl, dispatch]);

    // Galeri görsellerini ID üzerinden indirip Blob URL oluştur.
    useEffect(() => {
        let cancelled = false;
        const createdUrls = [];

        const loadGallery = async () => {
            const resolved = await Promise.all(
                photos.map(async (photo) => {
                    const imageId = getImageId(photo);

                    if (!imageId) {
                        if (
                            typeof photo === "string" &&
                            (
                                photo.startsWith("http://") ||
                                photo.startsWith("https://") ||
                                photo.startsWith("blob:") ||
                                photo.startsWith("data:")
                            )
                        ) {
                            return {
                                id: photo,
                                url: photo,
                            };
                        }

                        return null;
                    }

                    try {
                        const response = await getImageById(imageId);

                        const blob = new Blob([response.data], {
                            type:
                                response.headers?.["content-type"] ||
                                "image/jpeg",
                        });

                        const url = URL.createObjectURL(blob);
                        createdUrls.push(url);

                        return {
                            id: imageId,
                            url,
                        };
                    } catch (err) {
                        console.error(
                            `Gallery image could not be loaded: ${imageId}`,
                            err
                        );

                        return null;
                    }
                })
            );

            if (!cancelled) {
                setGalleryUrls(resolved.filter(Boolean));
            } else {
                createdUrls.forEach(revokeImageObjectUrl);
            }
        };

        setGalleryUrls([]);
        loadGallery();

        return () => {
            cancelled = true;
            createdUrls.forEach(revokeImageObjectUrl);
        };
    }, [photos]);

    if (!isUserLogin || !user || !user.id && !user._id) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Profil bilgileri bulunamadı
                    </h2>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                    >
                        Giriş yap
                    </button>
                </div>
            </div>
        );
    }

    const displayName = [
        user.firstName,
        user.lastName,
    ].filter(Boolean).join(" ");

    const profileImage =imageUrl || DEFAULT_IMAGE;

    const tabs = [
        { id: "photos", label: "Fotoğraflar" },
        { id: "friends", label: "Arkadaşlar" },
    ];

    return (
        <main className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 sm:h-52" />

                    <div className="px-5 pb-6 sm:px-8">
                        <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                                <img
                                    src={profileImage}
                                    alt="Profil fotoğrafı"
                                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg sm:h-36 sm:w-36"
                                    onError={(event) => {
                                        event.currentTarget.src = DEFAULT_IMAGE;
                                    }}
                                />

                                <div className="pb-1 text-center sm:text-left">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {displayName || "Kullanıcı"}
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {user.email || ""}
                                    </p>

                                    {user.address && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            {user.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 sm:pb-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/updateProfile")}
                                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    Profili düzenle
                                </button>

                                <ProfileSettingDropdownMenu />
                            </div>
                        </div>

                        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 sm:max-w-md">
                            <div className="rounded-xl bg-gray-50 p-4 text-center">
                                <p className="text-2xl font-bold text-gray-900">
                                    {photos.length}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Fotoğraf
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4 text-center">
                                <p className="text-2xl font-bold text-gray-900">
                                    {Array.isArray(user.friends)
                                        ? user.friends.length
                                        : 0}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Arkadaş
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex border-b border-gray-100 px-4 sm:px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${activeTab === tab.id
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 sm:p-6">
                        {activeTab === "photos" && (
                            <>
                                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Fotoğraflarım
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Profilinize eklediğiniz fotoğraflar.
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {galleryUrls.length} fotoğraf
                                    </span>
                                </div>

                                {galleryUrls.length === 0 ? (
                                    <div className="rounded-xl bg-gray-50 px-4 py-12 text-center">
                                        <p className="font-medium text-gray-700">
                                            Henüz fotoğrafınız bulunmuyor.
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Profil düzenleme bölümünden fotoğraf ekleyebilirsiniz.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                        {galleryUrls.map((photo) => (
                                            <button
                                                key={photo.id}
                                                type="button"
                                                onClick={() => setSelectedPhoto(photo.url)}
                                                className="group aspect-square overflow-hidden rounded-xl bg-gray-100"
                                            >
                                                <img
                                                    src={photo.url}
                                                    alt="Profil galerisi fotoğrafı"
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    onError={(event) => {
                                                        event.currentTarget.src = DEFAULT_IMAGE;
                                                    }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "friends" && (
                            <>
                                <div className="mb-5">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Arkadaşlarım
                                    </h2>

                                    <input
                                        type="search"
                                        value={searchFriends}
                                        onChange={(event) =>
                                            setSearchFriends(event.target.value)
                                        }
                                        placeholder="Arkadaş ara..."
                                        className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-sm"
                                    />
                                </div>

                                {friends.length === 0 ? (
                                    <div className="rounded-xl bg-gray-50 px-4 py-12 text-center">
                                        <p className="font-medium text-gray-700">
                                            Arkadaş bulunamadı.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {friends.map((friend, index) => (
                                            <div
                                                key={
                                                    friend.id ||
                                                    friend._id ||
                                                    index
                                                }
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                                            >
                                                <img
                                                    src={DEFAULT_IMAGE}
                                                    alt=""
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />

                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-gray-800">
                                                        {[
                                                            friend.firstName,
                                                            friend.lastName,
                                                        ].filter(Boolean).join(" ") ||
                                                            friend.username ||
                                                            "Kullanıcı"}
                                                    </p>

                                                    <p className="truncate text-xs text-gray-500">
                                                        {friend.email || ""}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>

            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setSelectedPhoto(null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setSelectedPhoto(null);
                        }
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute right-5 top-5 rounded-full bg-white/20 px-4 py-2 text-white hover:bg-white/30"
                    >
                        Kapat
                    </button>

                    <img
                        src={selectedPhoto}
                        alt="Büyük fotoğraf"
                        className="max-h-[85vh] max-w-full rounded-xl object-contain"
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            )}
        </main>
    );
};

export default MyProfile;
