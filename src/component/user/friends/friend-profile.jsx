
import React, { useMemo, useState } from "react";
import {
  BiSolidLeftArrowSquare,
  BiSolidMessageDetail,
  BiSolidVideo,
} from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FriendsCard from "../friends/friends-card";
import FriendPhotos from "./friend-photos-card";
import users from "../my-photos/friends.json";

// Bu import yollarını kendi dosya konumlarına göre düzenle.
import { addUserAsFriend } from "API_DOSYANIN_YOLU";
import {
  addFriendToList,
  setFriendProfile,
} from "PROFILE_SLICE_DOSYANIN_YOLU";

const FriendProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile.friendProfile);
  const friendList = useSelector((state) => state.profile.friendList);

  const [friendsCard, setFriendsCard] = useState(true);
  const [searchFriends, setSearchFriends] = useState("");
  const [friendPhotos, setFriendPhotos] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [addingFriendId, setAddingFriendId] = useState(null);

  const filteredUsers = useMemo(() => {
    const search = searchFriends.toLowerCase().trim();

    return users.filter((friend) =>
      `${friend.name || ""} ${friend.lastname || ""}`
        .toLowerCase()
        .includes(search)
    );
  }, [searchFriends]);

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleAddFriend = async (friend) => {
    if (!friend?.id || addingFriendId) return;

    const alreadyAdded = friendList.some(
      (item) => String(item.id) === String(friend.id)
    );

    if (alreadyAdded) return;

    try {
      setAddingFriendId(friend.id);

      await addUserAsFriend(friend.id);

      dispatch(addFriendToList(friend));

      alert(`${friend.name} arkadaş listene eklendi.`);
    } catch (err) {
      console.error("Arkadaş ekleme hatası:", err);

      alert(
        err.response?.data?.message ||
        "Arkadaş eklenirken bir hata oluştu."
      );
    } finally {
      setAddingFriendId(null);
    }
  };

  const handleViewProfile = (friend) => {
    dispatch(setFriendProfile(friend));
  };

  const handleFriendPhotos = () => {
    setFriendPhotos(true);
    setFriendsCard(false);
  };

  const handleFriendsCard = () => {
    setFriendsCard(true);
    setFriendPhotos(false);
  };

  const handleToggleSize = () => {
    setIsEnlarged((previous) => !previous);
  };

  if (!profile) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center bg-background p-6">
        <div className="text-center">
          <p className="mb-4 text-text-secondary">
            Görüntülenecek arkadaş profili bulunamadı.
          </p>
          <button
            onClick={handleNavigate}
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
          >
            Geri dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      {/* Üst başlık */}
      <header className="flex h-16 shrink-0 items-center gap-4 bg-primary px-4 text-white shadow-md">
        <button
          type="button"
          onClick={handleNavigate}
          className="rounded-full p-2 transition hover:bg-white/15"
          aria-label="Geri dön"
        >
          <BiSolidLeftArrowSquare size={28} />
        </button>

        <h2 className="truncate text-lg font-semibold">
          {profile.name} {profile.lastname} - Profile
        </h2>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Sol profil alanı */}
        <aside className="w-full shrink-0 border-b border-border bg-surface p-5 md:w-[300px] md:border-b-0 md:border-r">
          <div className="flex flex-col items-center">
            <img
              src={profile.image}
              alt={`${profile.name} ${profile.lastname}`}
              className="h-32 w-32 rounded-full border-4 border-primary-soft object-cover shadow-md"
            />

            <h3 className="mt-3 text-lg font-bold text-text">
              {profile.name} {profile.lastname}
            </h3>

            <div className="mt-5 flex gap-5">
              <button
                type="button"
                className="rounded-full p-3 text-primary transition hover:bg-primary-soft"
                aria-label="Video görüşmesi"
              >
                <BiSolidVideo size={24} />
              </button>

              <button
                type="button"
                className="rounded-full p-3 text-primary transition hover:bg-primary-soft"
                aria-label="Mesaj gönder"
              >
                <BiSolidMessageDetail size={24} />
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="border-b border-border pb-2">
              <p className="text-sm text-text-secondary">Name</p>
              <p className="font-medium text-text">{profile.name}</p>
            </div>

            <div className="border-b border-border pb-2">
              <p className="text-sm text-text-secondary">Last name</p>
              <p className="font-medium text-text">{profile.lastname}</p>
            </div>

            <div className="border-b border-border pb-2">
              <p className="text-sm text-text-secondary">Email address</p>
              <p className="break-all font-medium text-text">
                {profile.email || "Belirtilmemiş"}
              </p>
            </div>
          </div>
        </aside>

        {/* Sağ içerik alanı */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 bg-primary px-4 text-white">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button
                type="button"
                onClick={handleFriendsCard}
                className={`flex shrink-0 items-center gap-2 rounded-lg p-2 hover:bg-white/15 ${
                  friendsCard ? "bg-white/15" : ""
                }`}
              >
                <FaUserFriends size={20} />
                <span className="hidden sm:inline">Friends</span>
              </button>

              {friendsCard && (
                <div className="relative min-w-0 flex-1">
                  <ImSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    value={searchFriends}
                    onChange={(e) => setSearchFriends(e.target.value)}
                    placeholder="Search friends..."
                    className="w-full rounded-lg border-0 bg-white py-2 pl-9 pr-3 text-sm text-text outline-none focus:ring-2 focus:ring-primary-light"
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleFriendPhotos}
              className={`flex shrink-0 items-center gap-2 rounded-lg p-2 hover:bg-white/15 ${
                friendPhotos ? "bg-white/15" : ""
              }`}
            >
              <IoMdPhotos size={22} />
              <span className="hidden sm:inline">Photos</span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
            {friendsCard && (
              <Row className="g-3">
                {filteredUsers.map((friend) => {
                  const isAdded = friendList.some(
                    (item) => String(item.id) === String(friend.id)
                  );

                  return (
                    <Col
                      key={friend.id}
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}
                    >
                      <FriendsCard
                        {...friend}
                        isAdded={isAdded}
                        loading={addingFriendId === friend.id}
                        onAddFriend={handleAddFriend}
                        onViewProfile={() => handleViewProfile(friend)}
                      />
                    </Col>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <Col xs={12}>
                    <p className="py-10 text-center text-text-secondary">
                      Arama kriterine uygun kullanıcı bulunamadı.
                    </p>
                  </Col>
                )}
              </Row>
            )}

            {friendPhotos && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FriendPhotos
                  isEnlarged={isEnlarged}
                  handleToggleSize={handleToggleSize}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FriendProfile;
