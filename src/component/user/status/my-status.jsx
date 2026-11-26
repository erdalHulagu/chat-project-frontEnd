
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiX,
  FiUsers,
  FiPlus,
  FiActivity,
  FiImage,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

import FriendStatusCard from "./friends-status-card";
import StatusDisplayer from "./status-displayer";

// Import yollarını proje klasör yapına göre kontrol et.
import {
  createStatus,
  getMyStatuses,
  getFriendsStatuses,
  deleteStatus,
} from "../../../api/service/status-service";

import {
  uploadImage,
  getImageObjectUrl,
} from "../../../api/service/image-service";

const MyStatus = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [myStatuses, setMyStatuses] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showMyStatus, setShowMyStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  // API yanıtından görsel ID'sini al
  const extractImageId = (response) => {
    const data = response?.data;

    if (typeof data === "string") return data;

    return (
      data?.imageId ||
      data?.id ||
      data?.data?.imageId ||
      data?.data?.id ||
      null
    );
  };

  // Görsel ID'sini tarayıcıda görüntülenebilir URL'ye çevir
  const resolveImage = async (imageId) => {
    if (!imageId) return null;

    try {
      return await getImageObjectUrl(imageId);
    } catch (err) {
      console.error("Image could not be loaded:", err);
      return null;
    }
  };

  // Status verilerini kullanıcı bazında grupla
  const groupStatusesByUser = async (statuses = []) => {
    const groups = new Map();

    // Statusları kullanıcılara göre grupla
    for (const status of statuses) {
      const userId = status.userId;

      if (!groups.has(userId)) {
        groups.set(userId, {
          id: userId,
          userId,
          firstName: status.firstName,
          lastName: status.lastName,
          name: `${status.firstName || ""} ${status.lastName || ""}`.trim(),
          profileImageId: status.profileImage,
          profileImage: null,
          stories: [],
          statusTime: status.createdAt,
          imageType: status.imageType,
        });
      }

      groups.get(userId).stories.push(status);
    }

    // Görselleri paralel olarak yükle
    const result = await Promise.all(
      Array.from(groups.values()).map(async (group) => {
        const [profileImage, stories] = await Promise.all([
          resolveImage(group.profileImageId),

          Promise.all(
            group.stories.map(async (status) => {
              const imageUrl = await resolveImage(status.imageId);

              return {
                id: status.id,
                image: imageUrl,
                imageUrl,
                imageType: status.imageType,
                caption: status.caption,
                createdAt: status.createdAt,
                expiresAt: status.expiresAt,
              };
            })
          ),
        ]);

        return {
          ...group,
          profileImage,
          stories,
          statusTime: stories[0]?.createdAt || group.statusTime,
        };
      })
    );

    return result;
  };

  // Statusları backend'den yükle
  const loadStatuses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [myResponse, friendsResponse] = await Promise.all([
        getMyStatuses(),
        getFriendsStatuses(),
      ]);

      const myData = Array.isArray(myResponse.data)
        ? myResponse.data
        : [];

      const friendsData = Array.isArray(friendsResponse.data)
        ? friendsResponse.data
        : [];

      const myGroups = await groupStatusesByUser(myData);
      const friendGroups = await groupStatusesByUser(friendsData);

      const currentUserGroup = myGroups[0];

      setMyStatuses(currentUserGroup?.stories || []);
      setFriendList(
        friendGroups.filter(
          (friend) => friend.stories.length > 0
        )
      );
    } catch (err) {
      console.error("Status loading error:", err);
      setError(
        err.response?.data?.message ||
        "Statuslar yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatuses();
  }, [loadStatuses]);

  // Kendi son statusum
  const myStatus = myStatuses[0] || null;

  // Fotoğraf seçme
  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  // Seçilen fotoğrafı önizle
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = [
      "video/mp4",
      "video/webm",
    ].includes(file.type);

    if (!isImage && !isVideo) {
      alert("JPG, PNG, WebP, MP4 veya WebM dosyası seçin.");
      event.target.value = "";
      return;
    }

    const maxSize = isVideo
      ? 50 * 1024 * 1024
      : 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        isVideo
          ? "Video boyutu 50 MB'dan küçük olmalıdır."
          : "Fotoğraf boyutu 5 MB'dan küçük olmalıdır."
      );
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(previewUrl);
    setSelectedStatus(null);
    setShowMyStatus(true);

    event.target.value = "";
  };

  // Kendi statusumu aç
  const handleOpenMyStatus = async () => {
    if (selectedFile && preview) {
      setSelectedStatus(null);
      setShowMyStatus(true);
      return;
    }

    if (myStatus) {
      setSelectedStatus(null);
      setShowMyStatus(true);
    } else {
      handleChooseImage();
    }
  };

  // Arkadaş statusunu aç
  const handleSelectStatus = (friend) => {
    setShowMyStatus(false);
    setSelectedStatus(friend);
  };

  // Status görüntüleyiciyi kapat
  const handleCloseStatus = () => {
    setSelectedStatus(null);
    setShowMyStatus(false);
  };

  // Status paylaş
  const handlePublishStatus = async () => {
    if (!selectedFile) {
      alert("Lütfen önce bir fotoğraf veya video seçin.");
      return;
    }

    setPublishing(true);
    setError("");

    try {
      // 1. Fotoğrafı mevcut ImageService ile yükle
      const uploadResponse = await uploadImage(selectedFile);

      const imageId = extractImageId(uploadResponse);

      if (!imageId) {
        throw new Error(
          "Fotoğraf yüklendi ancak görsel ID'si alınamadı. Upload API yanıtını kontrol et."
        );
      }

      // 2. Status kaydını oluştur
      await createStatus(imageId, caption);

      // 3. Önizlemeyi temizle
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setSelectedFile(null);
      setPreview(null);
      setCaption("");
      setShowMyStatus(false);

      // 4. Gerçek statusları tekrar yükle
      await loadStatuses();
    } catch (err) {
      console.error("Status publishing error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Status paylaşılırken bir hata oluştu."
      );
    } finally {
      setPublishing(false);
    }
  };

  // Kendi statusumu sil
  const handleRemoveMyStatus = async () => {
    if (selectedFile && preview) {
      URL.revokeObjectURL(preview);
      setSelectedFile(null);
      setPreview(null);
      setCaption("");
      setShowMyStatus(false);
      return;
    }

    if (!myStatus?.id) return;

    const confirmed = window.confirm(
      "Bu statusu silmek istediğine emin misin?"
    );

    if (!confirmed) return;

    try {
      await deleteStatus(myStatus.id);
      setShowMyStatus(false);
      await loadStatuses();
    } catch (err) {
      console.error("Status deletion error:", err);
      setError(
        err.response?.data?.message ||
        "Status silinirken bir hata oluştu."
      );
    }
  };

  // Sayfa kapanırken geçici önizlemeyi temizle
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <main className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-background p-2 sm:p-4">
      <div className="flex h-full min-h-0 w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">

        {/* SIDEBAR */}
        <aside
          className={`flex w-full min-h-0 flex-col border-r border-border bg-surface md:w-[340px] md:shrink-0 ${selectedStatus || showMyStatus
            ? "hidden md:flex"
            : "flex"
            }`}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-4">
            <button
              type="button"
              onClick={handleNavigate}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary"
            >
              <FiArrowLeft size={21} />
            </button>

            <div className="flex-1">
              <h1 className="text-lg font-bold text-text">
                Status
              </h1>
              <p className="text-xs text-text-muted">
                Recent updates from your contacts
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <FiActivity size={20} />
            </div>
          </div>

          {/* My Status */}
          <div className="shrink-0 border-b border-border p-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenMyStatus}
                className="relative shrink-0 rounded-full"
                aria-label="Open my status"
              >
                <img
                  src={
                    preview ||
                    myStatus?.image ||
                    "https://placehold.co/100x100/E6F2ED/075E45?text=Me"
                  }
                  alt="My status"
                  className={`h-14 w-14 rounded-full border-2 object-cover ${myStatus || preview
                    ? "border-primary"
                    : "border-border"
                    }`}
                />

                {!myStatus && !preview && (
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-primary text-white">
                    <FiPlus size={14} />
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenMyStatus}
                className="min-w-0 flex-1 text-left"
              >
                <h2 className="text-sm font-semibold text-text">
                  My Status
                </h2>
                <p className="mt-1 text-xs text-text-muted">
                  {preview
                    ? "Photo ready to publish"
                    : myStatus
                      ? "View your latest status"
                      : "Tap to add a status update"}
                </p>
              </button>

              {!myStatus && !preview ? (
                <button
                  type="button"
                  onClick={handleChooseImage}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Add status"
                >
                  <FiPlus size={21} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRemoveMyStatus}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-danger transition hover:bg-red-50"
                  aria-label="Remove status"
                >
                  <FiTrash2 size={18} />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Recent Updates */}
          <div className="shrink-0 px-4 pb-2 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Recent Updates
              </h3>

              <span className="text-xs text-text-muted">
                {friendList.length} contacts
              </span>
            </div>
          </div>

          {/* Friends */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
            {loading ? (
              <div className="flex min-h-[220px] items-center justify-center text-sm text-text-muted">
                Loading statuses...
              </div>
            ) : friendList.length > 0 ? (
              <div className="space-y-2">
                {friendList.map((friend) => (
                  <FriendStatusCard
                    key={friend.userId}
                    friend={friend}
                    onClick={handleSelectStatus}
                    active={selectedStatus?.userId === friend.userId}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <FiUsers size={30} className="text-primary" />
                <p className="mt-3 text-sm font-semibold text-text">
                  No recent updates
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Your friends haven't shared a status yet.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* CONTENT */}
        <section
          className={`relative min-w-0 flex-1 bg-background ${selectedStatus || showMyStatus
            ? "flex"
            : "hidden md:flex"
            }`}
        >
          {error && (
            <div className="absolute left-4 right-4 top-4 z-40 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Friend Status */}
          {selectedStatus ? (
            <>
              <button
                type="button"
                onClick={handleCloseStatus}
                className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text md:hidden"
                aria-label="Back"
              >
                <FiArrowLeft size={20} />
              </button>

              <StatusDisplayer
                stories={selectedStatus.stories}
                user={selectedStatus}
                onClose={() => {
                  setShowMyStatus(false);
                  setSelectedStatus(null);
                }}
              />
            </>
          ) : showMyStatus && (preview || myStatus) ? (
            /* My Status Preview / Viewer */
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-slate-950 p-4">
              <button
                type="button"
                onClick={handleCloseStatus}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close"
              >
                <FiX size={22} />
              </button>

              {selectedFile?.type.startsWith("video/") ? (
                <video
                  src={preview}
                  controls
                  autoPlay
                  muted
                  className="max-h-[65%] max-w-full rounded-xl"
                />
              ) : (
                <img
                  src={preview || myStatus?.image}
                  alt="My status"
                  className="max-h-[65%] max-w-full rounded-xl object-contain"
                />
              )}
              {selectedFile && (
                <input
                  type="text"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  maxLength={1000}
                  placeholder="Add a caption..."
                  className="mt-4 w-full max-w-md rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-primary"
                />
              )}

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleChooseImage}
                  disabled={publishing}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 disabled:opacity-50"
                >
                  <FiImage size={17} />
                  Change photo
                </button>

                <button
                  type="button"
                  onClick={handleRemoveMyStatus}
                  disabled={publishing}
                  className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500/40 disabled:opacity-50"
                >
                  <FiTrash2 size={17} />
                  Remove
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handlePublishStatus}
                    disabled={publishing}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiUpload size={17} />
                    {publishing ? "Publishing..." : "Publish"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-soft text-primary">
                <FiActivity size={44} />
              </div>

              <h2 className="text-xl font-bold text-text">
                Stay Connected
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                Select a contact from the list to view their latest status updates.
              </p>

              <button
                type="button"
                onClick={handleChooseImage}
                className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
              >
                <FiPlus size={18} />
                Add My Status
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyStatus;
