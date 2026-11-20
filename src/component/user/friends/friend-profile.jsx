
import React, { useEffect, useMemo, useState } from "react";
import {
  BiSolidLeftArrowSquare,
  BiSolidMessageDetail,
} from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FriendsCard from "./friends-card";
import FriendPhotos from "./friend-photos-card";

import users from "../my-photos/friends.json";

import { addUserAsFriend } from "../../../api/service/user-service";
import { getImageById } from "../../../api/service/image-service";
import { setFriendProfile } from "../../../redux/store/slices/friend/friendsProfileSlices";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const FriendProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(
    (state) => state.profile?.friendProfile
  );

  const friendList = useSelector(
    (state) => state.auth?.user?.friends || []
  );

  const [activeTab, setActiveTab] = useState("friends");
  const [searchTerm, setSearchTerm] = useState("");
  const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Profil fotoğrafını yükle
  useEffect(() => {
    let objectUrl;

    const loadProfileImage = async () => {
      const image = profile?.image || profile?.profileImage;

      if (!image) {
        setProfileImage(DEFAULT_IMAGE);
        return;
      }

      if (
        typeof image === "string" &&
        (image.startsWith("http") ||
          image.startsWith("data:") ||
          image.startsWith("blob:"))
      ) {
        setProfileImage(image);
        return;
      }

      try {
        const response = await getImageById(image);

        const imageData =
          response?.data?.data ||
          response?.data ||
          response;

        if (imageData instanceof Blob) {
          objectUrl = URL.createObjectURL(imageData);
          setProfileImage(objectUrl);
        } else if (typeof imageData === "string") {
          setProfileImage(
            imageData.startsWith("data:")
              ? imageData
              : `data:image/jpeg;base64,${imageData}`
          );
        } else {
          setProfileImage(DEFAULT_IMAGE);
        }
      } catch (error) {
        console.error("Profil fotoğrafı yüklenemedi:", error);
        setProfileImage(DEFAULT_IMAGE);
      }
    };

    loadProfileImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profile]);

  // Arkadaş arama
  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLocaleLowerCase("tr");

    return (users || []).filter((user) => {
      const fullName =
        `${user.name || ""} ${user.lastname || ""}`.toLocaleLowerCase("tr");

      return fullName.includes(search);
    });
  }, [searchTerm]);

  // Mevcut arkadaşları kontrol et
  const isAlreadyFriend = (id) => {
    return friendList.some(
      (friend) => String(friend.id) === String(id)
    );
  };

  // Arkadaş ekleme
  const handleAddFriend = async (id) => {
    if (!id || isAlreadyFriend(id) || addedUsers.includes(id)) return;

    try {
      setLoadingUserId(id);

      await addUserAsFriend(id);

      setAddedUsers((previous) => [...previous, id]);

      window.alert("Arkadaş başarıyla eklendi.");
    } catch (error) {
      console.error("Arkadaş eklenemedi:", error);
      window.alert("Arkadaş eklenirken bir hata oluştu.");
    } finally {
      setLoadingUserId(null);
    }
  };

  // Arkadaş profiline geçiş
  const handleViewProfile = (friend) => {
    dispatch(
      setFriendProfile({
        id: friend.id,
        name: friend.name || friend.firstName || "",
        lastname: friend.lastname || friend.lastName || "",
        email: friend.email || "",
        phone: friend.phone || "",
        image: friend.image || friend.profileImage || null,
      })
    );

    setActiveTab("friends");
    setSearchTerm("");
    setIsEnlarged(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  if (!profile) {
    return (
      <div className="flex min-h-full w-full items-center justify-center bg-background p-5">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-lg">
          <HiOutlineUserCircle className="mx-auto text-primary" size={64} />

          <h2 className="mt-4 text-xl font-bold text-text">
            Profil bulunamadı
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Görüntülenecek arkadaş profili bulunamadı.
          </p>

          <button
            type="button"
            onClick={handleNavigate}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <BiSolidLeftArrowSquare size={19} />
            Geri dön
          </button>
        </div>
      </div>
    );
  }

  const fullName =
    `${profile.name || ""} ${profile.lastname || ""}`.trim();

  return (
    <div className="min-h-full w-full overflow-y-auto bg-background p-3 sm:p-5 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Sayfa başlığı */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary">
              FURQAN WORLDWIDE
            </p>

            <h1 className="mt-1 text-2xl font-bold text-text sm:text-3xl">
              Arkadaş Profili
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Arkadaşının profilini ve fotoğraflarını görüntüle.
            </p>
          </div>

          <button
            type="button"
            onClick={handleNavigate}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text shadow-sm transition hover:border-primary hover:text-primary"
          >
            <BiSolidLeftArrowSquare size={20} />
            Geri dön
          </button>
        </div>

        {/* Profil kartı */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="h-28 bg-gradient-to-r from-primary-dark via-primary to-primary-light sm:h-36" />

          <div className="px-5 pb-5 sm:px-7">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
                <img
                  src={profileImage}
                  onError={(event) => {
                    event.currentTarget.src = DEFAULT_IMAGE;
                  }}
                  alt={fullName || "Profil fotoğrafı"}
                  className="h-24 w-24 rounded-2xl border-4 border-surface bg-surface object-cover shadow-lg sm:h-28 sm:w-28"
                />

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-text sm:text-2xl">
                    {fullName || "İsimsiz kullanıcı"}
                  </h2>

                  {profile.email && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {profile.email}
                    </p>
                  )}

                  {profile.phone && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {profile.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                disabled
                title="Mesajlaşma bağlantısı henüz eklenmedi"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white opacity-60 shadow-md"
              >
                <BiSolidMessageDetail size={20} />
                Mesaj gönder
              </button>
            </div>
          </div>
        </section>

        {/* Sekmeler */}
        <div className="flex gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("friends")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "friends"
                ? "bg-primary text-white shadow-md"
                : "text-text-secondary hover:bg-primary-soft hover:text-primary"
            }`}
          >
            <FaUserFriends size={19} />
            Arkadaşlar
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "photos"
                ? "bg-primary text-white shadow-md"
                : "text-text-secondary hover:bg-primary-soft hover:text-primary"
            }`}
          >
            <IoMdPhotos size={19} />
            Fotoğraflar
          </button>
        </div>

        {/* Sekme içerikleri */}
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">

          {activeTab === "friends" && (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-text">
                    Arkadaşlarını keşfet
                  </h3>

                  <p className="mt-1 text-sm text-text-secondary">
                    Yeni arkadaşlar bul ve listene ekle.
                  </p>
                </div>

                <div className="relative w-full sm:max-w-sm">
                  <ImSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
                    size={17}
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="İsim veya soyisim ara..."
                    className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredUsers.map((friend) => (
                  <FriendsCard
                    key={friend.id}
                    id={friend.id}
                    name={friend.name}
                    lastname={friend.lastname}
                    image={friend.image}
                    onAddFriend={handleAddFriend}
                    onViewProfile={() => handleViewProfile(friend)}
                    isAdded={
                      addedUsers.includes(friend.id) ||
                      isAlreadyFriend(friend.id)
                    }
                    loading={loadingUserId === friend.id}
                  />
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-12 text-center">
                  <FaUserFriends
                    size={38}
                    className="mx-auto text-primary"
                  />

                  <h4 className="mt-3 font-bold text-text">
                    Arkadaş bulunamadı
                  </h4>

                  <p className="mt-1 text-sm text-text-secondary">
                    Farklı bir isim veya soyisim deneyebilirsin.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "photos" && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text">
                  Fotoğraflar
                </h3>

                <p className="mt-1 text-sm text-text-secondary">
                  Arkadaşının fotoğraflarını görüntüle.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FriendPhotos
                  isEnlarged={isEnlarged}
                  handleToggleSize={() =>
                    setIsEnlarged((previous) => !previous)
                  }
                />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default FriendProfile;
