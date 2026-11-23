
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getUser,
    getAllUser,
    getMyFriend,
    addUserAsFriend,
    
} from "../../../api/service/user-service";

import { 
    getImageById,
    getMyFriendImages,
    
 } from "../../../api/service/image-service";

import {
    setFriendProfile,
    addFriendToList,
} from "../../../redux/store/slices/friend/friendsProfileSlices";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

// API cevabının gerçek verisini alır.
const getResponseData = (response) =>
    response?.data?.data ?? response?.data ?? response;

// Hem kullanıcı nesnesinden hem de doğrudan ID değerinden ID alır.
const getUserId = (user) => {
    if (user === null || user === undefined) return null;

    if (
        typeof user === "string" ||
        typeof user === "number"
    ) {
        return user;
    }

    return (
        user.id ??
        user.userId ??
        user.user_id ??
        null
    );
};

const getUserName = (user) => {
    if (!user || typeof user !== "object") {
        return "Kullanıcı";
    }

    const fullName =
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    return (
        fullName ||
        user.username ||
        user.email ||
        "Kullanıcı"
    );
};

const getProfileImageId = (user) => {
    if (!user || typeof user !== "object") return null;

    const image =
        user.profileImageId ??
        user.imageId ??
        user.profileImage ??
        user.userImage ??
        user.image ??
        null;

    if (!image) return null;

    if (typeof image === "object") {
        return image.id ?? image.imageId ?? null;
    }

    return image;
};

// API'den gelen fotoğraf ID listesini standart diziye çevirir.
const getImageIds = (data) => {
    if (!data) return [];

    let list = data;

    if (!Array.isArray(list) && list instanceof Set) {
        list = Array.from(list);
    }

    if (!Array.isArray(list) && typeof list === "object") {
        list =
            list.myImages ??
            list.images ??
            list.content ??
            [];
    }

    if (!Array.isArray(list) && list instanceof Set) {
        list = Array.from(list);
    }

    if (!Array.isArray(list)) return [];

    return list
        .map((image) => {
            if (typeof image === "object" && image !== null) {
                return image.id ?? image.imageId ?? null;
            }

            return image;
        })
        .filter(
            (imageId) =>
                imageId !== null &&
                imageId !== undefined &&
                imageId !== ""
        );
};

const getFriendList = (friends) => {
    if (!friends) return [];

    if (Array.isArray(friends)) {
        return friends.filter(
            (friend) =>
                friend !== null && friend !== undefined
        );
    }

    if (friends instanceof Set) {
        return Array.from(friends).filter(Boolean);
    }

    return [];
};

// Görseli ID üzerinden backend'den yükler.
const UserImage = ({
    imageId,
    alt,
    className = "",
}) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;
        let objectUrl = null;

        const loadImage = async () => {
            setImageUrl(null);

            if (!imageId) return;

            try {
                const response = await getImageById(imageId);

                if (cancelled) return;

                const contentType =
                    response.headers?.["content-type"] ||
                    response.headers?.["Content-Type"] ||
                    "image/jpeg";

                const blob =
                    response.data instanceof Blob
                        ? response.data
                        : new Blob([response.data], {
                              type: contentType,
                          });

                if (!blob.size) {
                    throw new Error("Görsel verisi boş geldi.");
                }

                objectUrl = URL.createObjectURL(blob);

                if (!cancelled) {
                    setImageUrl(objectUrl);
                }
            } catch (error) {
                console.error(
                    `Fotoğraf yüklenemedi. Görsel ID: ${imageId}`,
                    error?.response?.data || error
                );

                if (!cancelled) {
                    setImageUrl(null);
                }
            }
        };

        loadImage();

        return () => {
            cancelled = true;

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [imageId]);

    return (
        <img
            src={imageUrl || DEFAULT_IMAGE}
            alt={alt || "Kullanıcı fotoğrafı"}
            className={className}
        />
    );
};

// Arkadaş önerisi kartı.
const UserCard = ({
    user,
    onAddFriend,
    adding,
}) => {
    const userId = getUserId(user);

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm">
            <UserImage
                imageId={getProfileImageId(user)}
                alt={getUserName(user)}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-text">
                    {getUserName(user)}
                </p>

                <p className="truncate text-xs text-text-secondary">
                    {user?.email || user?.username || "Yeni arkadaş"}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onAddFriend(userId)}
                disabled={adding || !userId}
                className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
                {adding ? "Ekleniyor..." : "Ekle"}
            </button>
        </div>
    );
};

const FriendProfile = ({
    friendId: receivedFriendId,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reduxProfile = useSelector(
        (state) => state.profile?.friendProfile
    );

    const reduxFriendList = useSelector(
        (state) => state.profile?.friendList ?? []
    );

    const friendId =
        receivedFriendId ?? getUserId(reduxProfile);

    const [profile, setProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [activeTab, setActiveTab] = useState("friends");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [photosLoading, setPhotosLoading] = useState(false);

    const [addingId, setAddingId] = useState(null);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // ---------------------------------------------------------
    // PROFİLİ VE ARKADAŞ ÖNERİLERİNİ YÜKLE
    // ---------------------------------------------------------

    const loadProfile = useCallback(async () => {
        if (!friendId) {
            setProfile(null);
            setLoading(false);
            setError("Görüntülenecek kullanıcı bulunamadı.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const results = await Promise.allSettled([
                getUser(),
                getAllUser(0, 50, "ASC"),
                getMyFriend(friendId),
            ]);

            const currentResult = results[0];
            const usersResult = results[1];
            const friendResult = results[2];

            if (usersResult.status === "rejected") {
                console.error(
                    "Kullanıcı önerileri yüklenemedi:",
                    usersResult.reason?.response?.data ||
                        usersResult.reason
                );
            }

            if (currentResult.status === "rejected") {
                throw currentResult.reason;
            }

            if (friendResult.status === "rejected") {
                throw friendResult.reason;
            }

            const currentUserData = getResponseData(
                currentResult.value
            );

            const friendData = getResponseData(
                friendResult.value
            );

            const usersData =
                usersResult.status === "fulfilled"
                    ? getResponseData(usersResult.value)
                    : [];

            if (!friendData) {
                throw new Error("Arkadaş profili bulunamadı.");
            }

            const allUsers = Array.isArray(usersData)
                ? usersData
                : usersData?.content ??
                  usersData?.users ??
                  [];

            setCurrentUser(currentUserData);
            setProfile(friendData);

            dispatch(setFriendProfile(friendData));

            const currentUserId = getUserId(currentUserData);
            const viewedFriendId = getUserId(friendData);

            const currentFriends = getFriendList(
                currentUserData?.friends
            );

            const reduxFriends = getFriendList(
                reduxFriendList
            );

            const existingFriendIds = [
                ...currentFriends,
                ...reduxFriends,
            ]
                .map(getUserId)
                .filter(
                    (id) =>
                        id !== null &&
                        id !== undefined
                )
                .map(String);

            const filteredUsers = allUsers.filter((user) => {
                const id = getUserId(user);

                if (id === null || id === undefined) {
                    return false;
                }

                const stringId = String(id);

                return (
                    stringId !== String(currentUserId) &&
                    stringId !== String(viewedFriendId) &&
                    !existingFriendIds.includes(stringId)
                );
            });

            setSuggestions(filteredUsers);
        } catch (err) {
            console.error(
                "Profil yüklenirken hata:",
                err?.response?.data || err
            );

            setProfile(null);

            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Profil bilgileri yüklenirken bir hata oluştu."
            );
        } finally {
            setLoading(false);
        }
    }, [friendId, dispatch, reduxFriendList]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    // ---------------------------------------------------------
    // ARKADAŞIN FOTOĞRAFLARINI YÜKLE
    // ---------------------------------------------------------

    const loadPhotos = useCallback(async () => {
        if (!friendId) {
            setPhotos([]);
            return;
        }

        setPhotosLoading(true);

        try {
            const response = await getMyFriendImages(friendId);
            const data = getResponseData(response);

            setPhotos(getImageIds(data));
        } catch (err) {
            console.error(
                "Arkadaş fotoğrafları yüklenemedi:",
                err?.response?.data || err
            );

            setPhotos([]);
        } finally {
            setPhotosLoading(false);
        }
    }, [friendId]);

    // Fotoğraflar profil açıldığında yüklenir.
    // Böylece fotoğraf sayısı da doğru gösterilir.
    useEffect(() => {
        setPhotos([]);
        loadPhotos();
    }, [loadPhotos]);

    // ---------------------------------------------------------
    // ARKADAŞ EKLE
    // ---------------------------------------------------------

    const handleAddFriend = async (targetId) => {
        if (
            targetId === null ||
            targetId === undefined ||
            addingId !== null
        ) {
            return;
        }

        setAddingId(targetId);
        setError("");
        setSuccessMessage("");

        try {
            await addUserAsFriend(targetId);

            const addedUser = suggestions.find(
                (user) =>
                    String(getUserId(user)) ===
                    String(targetId)
            );

            if (addedUser) {
                dispatch(addFriendToList(addedUser));
            }

            setSuggestions((previous) =>
                previous.filter(
                    (user) =>
                        String(getUserId(user)) !==
                        String(targetId)
                )
            );

            setCurrentUser((previous) => {
                if (!previous) return previous;

                const oldFriends = getFriendList(
                    previous.friends
                );

                const alreadyAdded = oldFriends.some(
                    (friend) =>
                        String(getUserId(friend)) ===
                        String(targetId)
                );

                if (alreadyAdded) return previous;

                return {
                    ...previous,
                    friends: [
                        ...oldFriends,
                        targetId,
                    ],
                };
            });

            setSuccessMessage(
                "Arkadaşlık isteği başarıyla gönderildi."
            );
        } catch (err) {
            console.error(
                "Arkadaş eklenemedi:",
                err?.response?.data || err
            );

            setError(
                err?.response?.data?.message ||
                    "Arkadaş eklenirken bir hata oluştu."
            );
        } finally {
            setAddingId(null);
        }
    };

    // ---------------------------------------------------------
    // ARKADAŞ ÖNERİLERİNİ ARA
    // ---------------------------------------------------------

    const filteredSuggestions = useMemo(() => {
        const value = search
            .trim()
            .toLocaleLowerCase("tr");

        if (!value) return suggestions;

        return suggestions.filter((user) => {
            const name = getUserName(user)
                .toLocaleLowerCase("tr");

            const email = (user.email ?? "")
                .toLocaleLowerCase("tr");

            return (
                name.includes(value) ||
                email.includes(value)
            );
        });
    }, [suggestions, search]);

    // ---------------------------------------------------------
    // YÜKLENİYOR
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />

                    <p className="mt-4 text-sm text-text-secondary">
                        Profil yükleniyor...
                    </p>
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------
    // PROFİL HATASI
    // ---------------------------------------------------------

    if (error && !profile) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 text-center">
                <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
                    <div className="mb-4 text-4xl">
                        😕
                    </div>

                    <h2 className="text-xl font-bold text-text">
                        Profil görüntülenemedi
                    </h2>

                    <p className="mt-2 text-sm text-text-secondary">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={loadProfile}
                        className="mt-6 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white"
                    >
                        Tekrar dene
                    </button>
                </div>
            </div>
        );
    }

    if (!profile) return null;

    const profileImageId = getProfileImageId(profile);

    const profileFriends = getFriendList(
        profile.friends
    );

    const friendCount = profileFriends.length;

    // ---------------------------------------------------------
    // PROFİL EKRANI
    // ---------------------------------------------------------

    return (
        <div className="min-h-screen bg-background px-4 py-8">
            <div className="mx-auto max-w-6xl">

                {/* Profil başlığı */}

                <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
                    <div className="relative h-40 bg-gradient-to-r from-primary-dark via-primary to-primary-light sm:h-52" />

                    <div className="relative px-5 pb-6 sm:px-8">
                        <div className="-mt-16 flex flex-col items-center gap-4 sm:-mt-20 sm:flex-row sm:items-end">
                            <UserImage
                                imageId={profileImageId}
                                alt={getUserName(profile)}
                                className="h-32 w-32 rounded-full border-4 border-surface bg-surface object-cover shadow-lg sm:h-40 sm:w-40"
                            />

                            <div className="min-w-0 flex-1 pb-1 text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-text sm:text-3xl">
                                    {getUserName(profile)}
                                </h1>

                                <p className="mt-1 truncate text-sm text-text-secondary">
                                    {profile.email ||
                                        profile.username ||
                                        ""}
                                </p>

                                {profile.bio && (
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                                        {profile.bio}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:max-w-md">
                            <div className="rounded-2xl bg-background p-4 text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {friendCount}
                                </p>

                                <p className="mt-1 text-xs text-text-secondary">
                                    Arkadaş
                                </p>
                            </div>

                            <div className="rounded-2xl bg-background p-4 text-center">
                                <p className="text-2xl font-bold text-primary">
                                    {photos.length}
                                </p>

                                <p className="mt-1 text-xs text-text-secondary">
                                    Fotoğraf
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Başarı ve hata mesajları */}

                {error && (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {successMessage}
                    </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Ana içerik */}

                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

                            {/* Sekmeler */}

                            <div className="flex border-b border-border">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveTab("friends")
                                    }
                                    className={`flex-1 px-4 py-4 text-sm font-semibold transition ${
                                        activeTab === "friends"
                                            ? "border-b-2 border-primary text-primary"
                                            : "text-text-secondary hover:bg-background"
                                    }`}
                                >
                                    👥 Arkadaşlar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveTab("photos")
                                    }
                                    className={`flex-1 px-4 py-4 text-sm font-semibold transition ${
                                        activeTab === "photos"
                                            ? "border-b-2 border-primary text-primary"
                                            : "text-text-secondary hover:bg-background"
                                    }`}
                                >
                                    📷 Fotoğraflar
                                </button>
                            </div>

                            <div className="p-5 sm:p-6">

                                {/* Arkadaşlar */}

                                {activeTab === "friends" && (
                                    <div>
                                        <div className="mb-5">
                                            <h2 className="text-lg font-bold text-text">
                                                {getUserName(profile)} adlı kullanıcının arkadaşları
                                            </h2>

                                            <p className="mt-1 text-sm text-text-secondary">
                                                Arkadaş listesini görüntüleyebilirsin.
                                            </p>
                                        </div>

                                        {profileFriends.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                {profileFriends.map(
                                                    (friend, index) => {
                                                        const friendObject =
                                                            friend &&
                                                            typeof friend === "object"
                                                                ? friend
                                                                : null;

                                                        const id =
                                                            getUserId(friend);

                                                        return (
                                                            <button
                                                                type="button"
                                                                key={
                                                                    id ??
                                                                    index
                                                                }
                                                                onClick={() => {
                                                                    if (id) {
                                                                        navigate(
                                                                            `/friendProfile/${id}`
                                                                        );
                                                                    }
                                                                }}
                                                                disabled={!id}
                                                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-3 text-left transition hover:border-primary hover:bg-primary/5 disabled:cursor-default"
                                                            >
                                                                <UserImage
                                                                    imageId={getProfileImageId(
                                                                        friendObject
                                                                    )}
                                                                    alt={getUserName(
                                                                        friendObject
                                                                    )}
                                                                    className="h-12 w-12 rounded-full object-cover"
                                                                />

                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate font-semibold text-text">
                                                                        {friendObject
                                                                            ? getUserName(
                                                                                  friendObject
                                                                              )
                                                                            : `Kullanıcı #${id}`}
                                                                    </p>

                                                                    <p className="text-xs text-text-secondary">
                                                                        Arkadaş profiline gitmek için tıkla
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        ) : (
                                            <div className="rounded-2xl bg-background px-5 py-12 text-center">
                                                <div className="text-4xl">
                                                    👥
                                                </div>

                                                <p className="mt-3 font-semibold text-text">
                                                    Henüz arkadaş bulunmuyor
                                                </p>

                                                <p className="mt-1 text-sm text-text-secondary">
                                                    Bu kullanıcının arkadaş listesi boş.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Fotoğraflar */}

                                {activeTab === "photos" && (
                                    <div>
                                        <div className="mb-5">
                                            <h2 className="text-lg font-bold text-text">
                                                Fotoğraf galerisi
                                            </h2>

                                            <p className="mt-1 text-sm text-text-secondary">
                                                {getUserName(profile)} tarafından paylaşılan fotoğraflar.
                                            </p>
                                        </div>

                                        {photosLoading ? (
                                            <div className="py-12 text-center">
                                                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />

                                                <p className="mt-3 text-sm text-text-secondary">
                                                    Fotoğraflar yükleniyor...
                                                </p>
                                            </div>
                                        ) : photos.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                {photos.map(
                                                    (imageId) => (
                                                        <div
                                                            key={imageId}
                                                            className="group aspect-square overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                                                        >
                                                            <UserImage
                                                                imageId={imageId}
                                                                alt="Arkadaş fotoğrafı"
                                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div className="rounded-2xl bg-background px-5 py-12 text-center">
                                                <div className="text-4xl">
                                                    📷
                                                </div>

                                                <p className="mt-3 font-semibold text-text">
                                                    Henüz fotoğraf yok
                                                </p>

                                                <p className="mt-1 text-sm text-text-secondary">
                                                    Bu kullanıcının galerisi henüz boş.
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={loadPhotos}
                                                    className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
                                                >
                                                    Yeniden yükle
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Arkadaş önerileri */}

                    <aside className="space-y-5">
                        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-text">
                                    Arkadaş önerileri
                                </h2>

                                <p className="mt-1 text-xs text-text-secondary">
                                    Tanıyor olabileceğin kişiler.
                                </p>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Kullanıcı ara..."
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none placeholder:text-text-secondary focus:border-primary"
                                />
                            </div>

                            <div className="space-y-3">
                                {filteredSuggestions.length > 0 ? (
                                    filteredSuggestions
                                        .slice(0, 8)
                                        .map((user) => (
                                            <UserCard
                                                key={getUserId(user)}
                                                user={user}
                                                onAddFriend={handleAddFriend}
                                                adding={
                                                    String(addingId) ===
                                                    String(getUserId(user))
                                                }
                                            />
                                        ))
                                ) : (
                                    <div className="rounded-xl bg-background px-4 py-8 text-center">
                                        <div className="text-3xl">
                                            🔎
                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-text">
                                            Kullanıcı bulunamadı
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            Farklı bir isimle aramayı deneyebilirsin.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary-light p-5 text-white shadow-sm">
                            <div className="text-3xl">
                                💬
                            </div>

                            <h3 className="mt-3 font-bold">
                                Sosyalleşmeye devam et!
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-white/80">
                                Yeni arkadaşlar keşfet, bağlantılarını artır ve fotoğraflarını paylaş.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default FriendProfile;
