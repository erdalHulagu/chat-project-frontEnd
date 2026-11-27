
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCamera,
  FiUsers,
  FiSearch,
  FiEdit3,
  FiMapPin,
  FiMail,
  FiImage,
  FiX,
  FiArrowUpRight,
  FiTrash2,
} from "react-icons/fi";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/hooks";

import {
  setImageURL,
} from "../../../redux/store/slices/user/auth/auth-slice";

import {
  setFriendProfile,
} from "../../../redux/store/slices/friend/friendsProfileSlices";

import {
  getImageById,
} from "../../../api/service/image-service";

import {
  DEFAULT_IMAGE,
  getImageId,
  revokeImageObjectUrl,
} from "../../../helper/profile-image-utils";

import {
  deleteUsersImage,
} from "../../../api/service/user-service";

import ProfileSettingDropdownMenu from "./profile-setting-dropdown-menu";

const isDirectImageUrl = (value) =>
  typeof value === "string" &&
  /^(https?:\/\/|blob:|data:)/i.test(value);

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
  const [friendImageUrls, setFriendImageUrls] = useState({});
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  const photos = useMemo(
    () => (Array.isArray(user?.myImages) ? user.myImages : []),
    [user?.myImages]
  );

  const allFriends = useMemo(
    () => (Array.isArray(user?.friends) ? user.friends : []),
    [user?.friends]
  );

  const friends = useMemo(() => {
    const search = searchFriends.toLowerCase().trim();

    if (!search) return allFriends;

    return allFriends.filter((friend) => {
      const name = [
        friend.firstName || friend.name || friend.username || "",
        friend.lastName || friend.lastname || "",
      ]
        .join(" ")
        .toLowerCase();

      const email = (friend.email || "").toLowerCase();

      return name.includes(search) || email.includes(search);
    });
  }, [allFriends, searchFriends]);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Kullanıcı";

  // Profil fotoğrafını yükle.
  useEffect(() => {
    let cancelled = false;
    let createdUrl = null;

    const loadProfileImage = async () => {
      if (imageUrl) return;

      const imageId = getImageId(user?.profileImage);

      if (!imageId || isDirectImageUrl(user?.profileImage)) return;

      try {
        const response = await getImageById(imageId);

        const blob = new Blob([response.data], {
          type: response.headers?.["content-type"] || "image/jpeg",
        });

        createdUrl = URL.createObjectURL(blob);

        if (!cancelled) {
          dispatch(setImageURL(createdUrl));
          createdUrl = null;
        }
      } catch (err) {
        console.error("Profil fotoğrafı yüklenemedi:", err);
      }
    };

    loadProfileImage();

    return () => {
      cancelled = true;

      if (createdUrl) {
        revokeImageObjectUrl(createdUrl);
      }
    };
  }, [user?.profileImage, imageUrl, dispatch]);

  // Galeri fotoğraflarını yükle.
  useEffect(() => {
    let cancelled = false;
    const createdUrls = [];

    const loadGallery = async () => {
      const resolved = await Promise.all(
        photos.map(async (photo, index) => {
          const imageId = getImageId(photo);

          // Fotoğraf doğrudan URL ise.
          if (!imageId) {
            if (isDirectImageUrl(photo)) {
              return {
                id: `${photo}-${index}`,
                imageId: null,
                url: photo,
                isObjectUrl: false,
              };
            }

            return null;
          }

          try {
            const response = await getImageById(imageId);

            const blob = new Blob([response.data], {
              type: response.headers?.["content-type"] || "image/jpeg",
            });

            const url = URL.createObjectURL(blob);
            createdUrls.push(url);

            return {
              id: imageId,
              imageId,
              url,
              isObjectUrl: true,
            };
          } catch (err) {
            console.error(
              "Galeri fotoğrafı yüklenemedi:",
              imageId,
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

  // Fotoğraf silme işlemi.
  const handleDeletePhoto = async (photo) => {
    if (!photo || deletingPhotoId !== null) return;

    if (!photo.imageId) {
      alert(
        "Bu fotoğrafın silinebilmesi için geçerli bir görsel ID'si bulunamadı."
      );
      return;
    }

    const confirmed = window.confirm(
      "Bu fotoğrafı kalıcı olarak silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    setDeletingPhotoId(photo.id);

    try {
      await deleteUsersImage(photo.imageId);

      setGalleryUrls((previous) =>
        previous.filter((item) => item.id !== photo.id)
      );

      if (selectedPhoto === photo.url) {
        setSelectedPhoto(null);
      }

      if (photo.isObjectUrl) {
        revokeImageObjectUrl(photo.url);
      }
    } catch (error) {
      console.error("Fotoğraf silinemedi:", error);

      alert(
        error.response?.data?.message ||
        "Fotoğraf silinirken bir hata oluştu."
      );
    } finally {
      setDeletingPhotoId(null);
    }
  };

  // Arkadaş fotoğraflarını yükle.
  useEffect(() => {
    let cancelled = false;
    const createdUrls = [];

    const loadFriendImages = async () => {
      const entries = await Promise.all(
        allFriends.map(async (friend, index) => {
          const friendId = friend.id || friend._id || index;

          const rawImage =
            friend.image ||
            friend.profileImage ||
            friend.profilePicture ||
            friend.imageUrl;

          if (isDirectImageUrl(rawImage)) {
            return [friendId, rawImage];
          }

          const imageId = getImageId(rawImage);

          if (!imageId) {
            return [friendId, DEFAULT_IMAGE];
          }

          try {
            const response = await getImageById(imageId);

            const blob = new Blob([response.data], {
              type: response.headers?.["content-type"] || "image/jpeg",
            });

            const url = URL.createObjectURL(blob);
            createdUrls.push(url);

            return [friendId, url];
          } catch (err) {
            console.error("Arkadaş fotoğrafı yüklenemedi:", err);

            return [friendId, DEFAULT_IMAGE];
          }
        })
      );

      if (!cancelled) {
        setFriendImageUrls(Object.fromEntries(entries));
      } else {
        createdUrls.forEach(revokeImageObjectUrl);
      }
    };

    setFriendImageUrls({});
    loadFriendImages();

    return () => {
      cancelled = true;
      createdUrls.forEach(revokeImageObjectUrl);
    };
  }, [allFriends]);

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
        friendImageUrls[friend.id || friend._id] ||
        friend.image ||
        friend.profileImage ||
        DEFAULT_IMAGE,
    };

    dispatch(setFriendProfile(selectedFriend));
    navigate("/friendProfile");
  };

  if (!isUserLogin || !user || (!user.id && !user._id)) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background p-5">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <FiUsers size={25} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-text">
            Profil bilgileri bulunamadı
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Profilinizi görüntülemek için giriş yapmanız gerekiyor.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Giriş yap
          </button>
        </div>
      </main>
    );
  }

  const profileImage = imageUrl || DEFAULT_IMAGE;

  const tabs = [
    {
      id: "photos",
      label: "Fotoğraflar",
      icon: FiImage,
      count: galleryUrls.length,
    },
    {
      id: "friends",
      label: "Arkadaşlar",
      icon: FiUsers,
      count: allFriends.length,
    },
  ];

  return (
    <main className="h-full min-h-0 w-full min-w-0 overflow-y-auto bg-background p-3 sm:p-5 lg:overflow-hidden">
      <div className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col lg:h-full lg:min-h-0">

        {/* ÜST BAŞLIK */}
        <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Hesabım
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-text">
              Profilim
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/updateProfile")}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
          >
            <FiEdit3 size={16} />
            <span className="hidden sm:inline">Profili düzenle</span>
            <span className="sm:hidden">Düzenle</span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* SOL: PROFİL KARTI */}
          <aside className="flex min-w-0 flex-col gap-4">
            <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="h-24 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />

              <div className="px-5 pb-5">
                <div className="-mt-12 flex items-end justify-between">
                  <img
                    src={profileImage}
                    alt="Profil fotoğrafı"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                    className="h-24 w-24 rounded-2xl border-4 border-surface bg-background object-cover shadow-md"
                  />

                  <div className="mb-1">
                    <ProfileSettingDropdownMenu />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="break-words text-xl font-bold text-text">
                    {displayName}
                  </h2>

                  {user.username && (
                    <p className="mt-1 text-sm text-text-muted">
                      @{user.username}
                    </p>
                  )}
                </div>

                <div className="mt-5 space-y-3 border-t border-border pt-4">
                  {user.email && (
                    <div className="flex min-w-0 items-center gap-3 text-sm text-text-secondary">
                      <FiMail className="shrink-0 text-primary" />
                      <span className="min-w-0 break-all">
                        {user.email}
                      </span>
                    </div>
                  )}

                  {user.address && (
                    <div className="flex min-w-0 items-start gap-3 text-sm text-text-secondary">
                      <FiMapPin className="mt-0.5 shrink-0 text-primary" />
                      <span className="min-w-0 break-words">
                        {user.address}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/updateProfile")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  <FiEdit3 size={16} />
                  Profil bilgilerini düzenle
                </button>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiCamera size={18} />
                </div>

                <p className="mt-3 text-2xl font-bold tabular-nums text-text">
                  {galleryUrls.length}
                </p>

                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Fotoğraf
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiUsers size={18} />
                </div>

                <p className="mt-3 text-2xl font-bold tabular-nums text-text">
                  {allFriends.length}
                </p>

                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Arkadaş
                </p>
              </div>
            </section>
          </aside>

          {/* SAĞ: FOTOĞRAFLAR VE ARKADAŞLAR */}
          <section className="flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:min-h-0">

            {/* SEKME BAŞLIKLARI */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
              <div className="flex min-w-0 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-3 py-4 text-sm font-semibold transition sm:px-5 ${isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-primary"
                        }`}
                    >
                      <Icon size={17} />

                      <span>{tab.label}</span>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${isActive
                          ? "bg-primary-soft text-primary"
                          : "bg-background text-text-muted"
                          }`}
                      >
                        {tab.count}
                      </span>

                      {isActive && (
                        <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-primary sm:inset-x-5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {activeTab === "photos" && (
                <span className="hidden text-xs text-text-muted sm:inline">
                  Fotoğraf galerisi
                </span>
              )}
            </div>

            {/* İÇERİK */}
            <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-thin-green sm:p-6">

              {/* FOTOĞRAFLAR */}
              {activeTab === "photos" && (
                <div>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-text">
                        Fotoğraflarım
                      </h3>

                      <p className="mt-1 text-xs text-text-secondary">
                        Profilinize eklediğiniz fotoğraflar.
                      </p>
                    </div>

                    <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
                      {galleryUrls.length} fotoğraf
                    </span>
                  </div>

                  {galleryUrls.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/70 px-5 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                        <FiImage size={25} />
                      </div>

                      <h4 className="mt-4 font-semibold text-text">
                        Henüz fotoğraf yok
                      </h4>

                      <p className="mt-1 max-w-xs text-sm text-text-secondary">
                        Profilinize fotoğraf eklediğinizde burada görüntülenecek.
                      </p>

                      <button
                        type="button"
                        onClick={() => navigate("/updateProfile")}
                        className="mt-4 text-sm font-semibold text-primary hover:text-primary-dark"
                      >
                        Profilini düzenle
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {galleryUrls.map((photo) => (
                        <div
                          key={photo.id}
                          className="group relative aspect-square min-w-0 overflow-hidden rounded-xl border border-border bg-background"
                        >
                          {/* FOTOĞRAFI AÇ */}
                          <button
                            type="button"
                            onClick={() => setSelectedPhoto(photo.url)}
                            disabled={deletingPhotoId !== null}
                            aria-label="Fotoğrafı görüntüle"
                            className="absolute inset-0 z-0 h-full w-full"
                          >
                            <img
                              src={photo.url}
                              alt="Galeri fotoğrafı"
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = DEFAULT_IMAGE;
                              }}
                            />

                            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100">
                              <FiArrowUpRight size={22} />
                            </span>
                          </button>

                          {/* FOTOĞRAFI SİL */}
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo)}
                            disabled={deletingPhotoId !== null}
                            title="Fotoğrafı sil"
                            aria-label="Fotoğrafı sil"
                            className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-red-600 disabled:cursor-not-allowed"
                          >
                            {deletingPhotoId === photo.id ? (
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            ) : (
                              <FiTrash2 size={14} />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ARKADAŞLAR */}
              {activeTab === "friends" && (
                <div>
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-text">
                        Arkadaşlarım
                      </h3>

                      <p className="mt-1 text-xs text-text-secondary">
                        Arkadaşlarınızın profillerini görüntüleyin.
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
                      {friends.length} kişi
                    </span>
                  </div>

                  <div className="relative mb-5 max-w-md">
                    <FiSearch
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                      size={17}
                    />

                    <input
                      type="search"
                      value={searchFriends}
                      onChange={(event) => setSearchFriends(event.target.value)}
                      placeholder="Arkadaşlarında ara..."
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  {friends.length === 0 ? (
                    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/70 px-5 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <FiUsers size={22} />
                      </div>

                      <p className="mt-3 font-semibold text-text">
                        {searchFriends
                          ? "Eşleşen arkadaş bulunamadı"
                          : "Henüz arkadaşınız yok"}
                      </p>

                      <p className="mt-1 text-sm text-text-secondary">
                        {searchFriends
                          ? "Farklı bir isim veya arama kelimesi deneyin."
                          : "Yeni arkadaşlar eklediğinizde burada görünecekler."}
                      </p>

                      {!searchFriends && (
                        <button
                          type="button"
                          onClick={() => navigate("/discover-users")}
                          className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                          Arkadaş keşfet
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {friends.map((friend, index) => {
                        const friendId = friend.id || friend._id || index;

                        const friendName =
                          friend.firstName ||
                          friend.name ||
                          friend.username ||
                          "Kullanıcı";

                        const friendLastname =
                          friend.lastName || friend.lastname || "";

                        const photo =
                          friendImageUrls[friendId] ||
                          (isDirectImageUrl(friend.image)
                            ? friend.image
                            : DEFAULT_IMAGE);

                        return (
                          <button
                            key={friendId}
                            type="button"
                            onClick={() => handleOpenFriendProfile(friend)}
                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-surface p-3 text-left transition hover:border-primary/40 hover:bg-primary-soft/40"
                          >
                            <img
                              src={photo}
                              alt={friendName}
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = DEFAULT_IMAGE;
                              }}
                              className="h-12 w-12 shrink-0 rounded-xl border border-border bg-background object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-text group-hover:text-primary">
                                {friendName} {friendLastname}
                              </p>

                              <p className="mt-1 truncate text-xs text-text-secondary">
                                {friend.email || "Arkadaş"}
                              </p>
                            </div>

                            <FiArrowUpRight
                              className="shrink-0 text-text-muted transition group-hover:text-primary"
                              size={17}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* BÜYÜK FOTOĞRAF MODALI */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Fotoğrafı kapat"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <FiX size={22} />
          </button>

          <img
            src={selectedPhoto}
            alt="Büyük fotoğraf"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
};

export default MyProfile;
