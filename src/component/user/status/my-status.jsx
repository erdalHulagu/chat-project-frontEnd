
import React, { useRef, useState } from "react";
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
import { stories } from "./dummy-story";

const demoFriends = [
  {
    id: "1",
    name: "Erdal Hulagu",
    profileImage:
      "https://cdn.pixabay.com/photo/2017/05/28/10/23/swan-2350668_1280.jpg",
    statusTime: "10 minutes ago",
    stories,
  },
  {
    id: "2",
    name: "John Smith",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
    statusTime: "30 minutes ago",
    stories,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    profileImage:
      "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
    statusTime: "1 hour ago",
    stories,
  },
];

const MyStatus = ({ friends = [] }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [myStatus, setMyStatus] = useState(null);
  const [showMyStatus, setShowMyStatus] = useState(false);

  const friendList = friends.length > 0 ? friends : demoFriends;

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleSelectStatus = (friend) => {
    setShowMyStatus(false);
    setSelectedStatus(friend);
  };

  const handleCloseStatus = () => {
    setSelectedStatus(null);
    setShowMyStatus(false);
  };

  // Fotoğraf seç
  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  // Seçilen fotoğrafı önizle
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen geçerli bir resim dosyası seçin.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Fotoğraf boyutu 5 MB'dan küçük olmalıdır.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setMyStatus({
      file,
      preview: previewUrl,
    });

    setSelectedStatus(null);
    setShowMyStatus(true);
    event.target.value = "";
  };

  // Kendi durumunu görüntüle
  const handleOpenMyStatus = () => {
    if (myStatus) {
      setSelectedStatus(null);
      setShowMyStatus(true);
    } else {
      handleChooseImage();
    }
  };

  // Kendi durumunu sil
  const handleRemoveMyStatus = () => {
    if (myStatus?.preview) {
      URL.revokeObjectURL(myStatus.preview);
    }

    setMyStatus(null);
    setShowMyStatus(false);
  };

  return (
    <main className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-background p-2 sm:p-4">
      <div className="flex h-full min-h-0 w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">

        {/* SIDEBAR */}
        <aside
          className={`flex w-full min-h-0 flex-col border-r border-border bg-surface md:w-[340px] md:shrink-0 ${
            selectedStatus || showMyStatus
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
                    myStatus?.preview ||
                    "https://placehold.co/100x100/E6F2ED/075E45?text=Me"
                  }
                  alt="My profile"
                  className={`h-14 w-14 rounded-full border-2 object-cover ${
                    myStatus
                      ? "border-primary"
                      : "border-border"
                  }`}
                />

                {!myStatus && (
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
                  {myStatus
                    ? "View your selected photo"
                    : "Tap to add a status update"}
                </p>
              </button>

              {!myStatus ? (
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
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Recent updates */}
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
            {friendList.length > 0 ? (
              <div className="space-y-2">
                {friendList.map((friend, index) => (
                  <FriendStatusCard
                    key={
                      friend.id ||
                      friend._id ||
                      friend.userId ||
                      index
                    }
                    friend={friend}
                    onClick={handleSelectStatus}
                    active={selectedStatus === friend}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <FiUsers size={30} className="text-primary" />
                <p className="mt-3 text-sm font-semibold text-text">
                  No recent updates
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* CONTENT */}
        <section
          className={`relative min-w-0 flex-1 bg-background ${
            selectedStatus || showMyStatus
              ? "flex"
              : "hidden md:flex"
          }`}
        >
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
                key={
                  selectedStatus.id ||
                  selectedStatus._id ||
                  selectedStatus.userId
                }
                stories={
                  selectedStatus.stories?.length
                    ? selectedStatus.stories
                    : stories
                }
                user={selectedStatus}
                onClose={handleCloseStatus}
              />
            </>
          ) : showMyStatus && myStatus ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-slate-950 p-4">
              <button
                type="button"
                onClick={handleCloseStatus}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close"
              >
                <FiX size={22} />
              </button>

              <img
                src={myStatus.preview}
                alt="My status preview"
                className="max-h-[75%] max-w-full rounded-xl object-contain"
              />

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleChooseImage}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  <FiImage size={17} />
                  Change photo
                </button>

                <button
                  type="button"
                  onClick={handleRemoveMyStatus}
                  className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500/40"
                >
                  <FiTrash2 size={17} />
                  Remove
                </button>

                <button
                  type="button"
                  disabled
                  title="Connect your status upload API to enable publishing"
                  className="flex cursor-not-allowed items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white opacity-60"
                >
                  <FiUpload size={17} />
                  Publish
                </button>
              </div>
            </div>
          ) : (
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
