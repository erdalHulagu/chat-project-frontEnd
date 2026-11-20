
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
    setFriendProfile,
} from "../../../redux/store/slices/profile/profile-slice";

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

    const { isUserLogin, user, imageUrl } = useAppSelector(
        (state) => state.auth
    );

    const [activeTab, setActiveTab] = useState("photos");
    const [searchFriends, setSearchFriends] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [galleryUrls, setGalleryUrls] = useState([]);

    // Arkadaşları filtrele
    const friends = useMemo(() => {
        const list = Array.isArray(user?.friends) ? user.friends : [];

        return list.filter((friend) => {
            const fullName = [
                friend.firstName || friend.name || friend.username || "",
                friend.lastName || friend.lastname || "",
            ].join(" ");

            return fullName
                .toLowerCase()
                .includes(searchFriends.toLowerCase().trim());
        });
    }, [user?.friends, searchFriends]);

    // Galeri fotoğrafları
    const photos = useMemo(() => {
        return Array.isArray(user?.myImages) ? user.myImages : [];
    }, [user?.myImages]);

    // Arkadaş profiline git
    const handleOpenFriendProfile = (friend) => {
        const selectedFriend = {
            ...friend,
            id: friend.id || friend._id,
            name:
                friend.firstName ||
                friend.name ||
                friend.username ||
                "Kullanıcı",
            lastname: friend.lastName || friend.lastname || "",
            image:
                friend.image ||
                friend.profileImage ||
                DEFAULT_IMAGE,
        };

        dispatch(setFriendProfile(selectedFriend));
        navigate("/friendProfile");
    };

    // Profil fotoğrafını yükle
    useEffect(() => {
        let cancelled = false;
        let createdUrl = null;

        const loadProfileImage = async () => {
            if (imageUrl) return;

            const imageId = getImageId(user?.profileImage);
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
                console.error("Profil fotoğrafı yüklenemedi:", err);
            }
        };

        loadProfileImage();

        return () => {
            cancelled = true;
        };
    }, [user?.profileImage, imageUrl, dispatch]);

    // Galeri fotoğraflarını yükle
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
                            return { id: photo, url: photo };
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

                        return { id: imageId, url };
                    } catch (err) {
                        console.error(
                            `Galeri fotoğrafı yüklenemedi: ${imageId}`,
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

    // Giriş kontrolü
    if (!isUserLogin || !user || (!user.id && !user._id)) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-slate-100 px-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Profil bilgileri bulunamadı
                    </h2>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-4 rounded-xl bg-[#075E45] px-5 py-2.5 font-semibold text-white transition hover:bg-[#043D30]"
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
    ]
        .filter(Boolean)
        .join(" ");

    const profileImage = imageUrl || DEFAULT_IMAGE;

    const tabs = [
        { id: "photos", label: "Fotoğraflar" },
        { id: "friends", label: "Arkadaşlar" },
    ];

    return (
        <main className="min-h-screen bg-[#F1F5F9] px-3 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Profil kartı */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">

                    <div className="h-36 bg-gradient-to-r from-[#043D30] via-[#075E45] to-[#0B7657] sm:h-52" />

                    <div className="px-5 pb-6 sm:px-8">
                        <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                                <img
                                    src={profileImage}
                                    alt="Profil fotoğrafı"
                                    className="h-28 w-28 rounded-full border-4 border-white bg-slate-100 object-cover shadow-xl sm:h-36 sm:w-36"
                                    onError={(event) => {
                                        event.currentTarget.src = DEFAULT_IMAGE;
                                    }}
                                />

                                <div className="pb-1 text-center sm:text-left">
                                    <h1 className="text-2xl font-bold text-[#043D30]">
                                        {displayName || "Kullanıcı"}
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {user.email || ""}
                                    </p>

                                    {user.address && (
                                        <p className="mt-1 text-sm text-slate-500">
                                            {user.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 sm:pb-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/updateProfile")}
                                    className="rounded-xl bg-[#075E45] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#075E45]/20 transition hover:bg-[#043D30] hover:shadow-lg"
                                >
                                    Profili düzenle
                                </button>

                                <ProfileSettingDropdownMenu />
                            </div>
                        </div>

                        {/* İstatistikler */}
                        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 sm:max-w-md">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:border-emerald-200 hover:bg-emerald-50">
                                <p className="text-2xl font-bold text-[#075E45]">
                                    {photos.length}
                                </p>
                                <p className="mt-1 text-xs font-medium text-slate-500">
                                    Fotoğraf
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:border-emerald-200 hover:bg-emerald-50">
                                <p className="text-2xl font-bold text-[#075E45]">
                                    {Array.isArray(user.friends)
                                        ? user.friends.length
                                        : 0}
                                </p>
                                <p className="mt-1 text-xs font-medium text-slate-500">
                                    Arkadaş
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sekmeler */}
                <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">

                    <div className="flex border-b border-slate-200 px-4 sm:px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`border-b-[3px] px-5 py-4 text-sm font-semibold transition ${
                                    activeTab === tab.id
                                        ? "border-[#075E45] text-[#075E45]"
                                        : "border-transparent text-slate-500 hover:text-[#075E45]"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 sm:p-6">

                        {/* Fotoğraflar */}
                        {activeTab === "photos" && (
                            <>
                                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-[#043D30]">
                                            Fotoğraflarım
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Profilinize eklediğiniz fotoğraflar.
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-[#075E45]">
                                        {galleryUrls.length} fotoğraf
                                    </span>
                                </div>

                                {galleryUrls.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
                                        <p className="font-semibold text-slate-700">
                                            Henüz fotoğrafınız bulunmuyor.
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
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
                                                className="group aspect-square overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 transition hover:border-[#075E45] hover:shadow-lg"
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

                        {/* Arkadaşlar */}
                        {activeTab === "friends" && (
                            <>
                                <div className="mb-5">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-[#043D30]">
                                                Arkadaşlarım
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Arkadaşlarınızı görüntüleyebilir ve profillerini ziyaret edebilirsiniz.
                                            </p>
                                        </div>

                                        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-[#075E45]">
                                            {friends.length} arkadaş
                                        </span>
                                    </div>

                                    <input
                                        type="search"
                                        value={searchFriends}
                                        onChange={(event) =>
                                            setSearchFriends(event.target.value)
                                        }
                                        placeholder="Arkadaş ara..."
                                        className="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#075E45] focus:bg-white focus:ring-2 focus:ring-emerald-100 sm:max-w-sm"
                                    />
                                </div>

                                {friends.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
                                        <p className="font-semibold text-slate-700">
                                            {searchFriends
                                                ? "Aramanızla eşleşen arkadaş bulunamadı."
                                                : "Henüz arkadaşınız bulunmuyor."}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {friends.map((friend, index) => {
                                            const friendImage =
                                                friend.image ||
                                                friend.profileImage ||
                                                DEFAULT_IMAGE;

                                            const friendName =
                                                friend.firstName ||
                                                friend.name ||
                                                friend.username ||
                                                "Kullanıcı";

                                            const friendLastname =
                                                friend.lastName ||
                                                friend.lastname ||
                                                "";

                                            return (
                                                <button
                                                    key={friend.id || friend._id || index}
                                                    type="button"
                                                    onClick={() => handleOpenFriendProfile(friend)}
                                                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md"
                                                >
                                                    <img
                                                        src={friendImage}
                                                        alt={friendName}
                                                        onError={(event) => {
                                                            event.currentTarget.src = DEFAULT_IMAGE;
                                                        }}
                                                        className="h-14 w-14 shrink-0 rounded-full border-2 border-emerald-100 bg-slate-100 object-cover"
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate font-semibold text-[#043D30]">
                                                            {friendName} {friendLastname}
                                                        </p>

                                                        <p className="truncate text-xs text-slate-500">
                                                            {friend.email || ""}
                                                        </p>

                                                        <span className="mt-1 inline-block text-xs font-semibold text-[#075E45]">
                                                            Profili görüntüle →
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>

            {/* Büyük fotoğraf görüntüleme */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#021F18]/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute right-5 top-5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:bg-white hover:text-[#043D30]"
                    >
                        Kapat
                    </button>

                    <img
                        src={selectedPhoto}
                        alt="Büyük fotoğraf"
                        className="max-h-[85vh] max-w-full rounded-xl border-4 border-white object-contain shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            )}
        </main>
    );
};

export default MyProfile;
