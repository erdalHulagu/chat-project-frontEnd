import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

import { setFriendProfile } from "../../../redux/store/slices/friend/friendsProfileSlices";

import {
    FaUserFriends,
    FaImages,
    FaCamera,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
} from "react-icons/fa";

import { MdPhotoLibrary } from "react-icons/md";

import FriendsCard from "../friends/friends-card";
import MyPhotos from "../my-photos/my-photos-card";
import friends from "../my-photos/friends.json";
import ProfileSettingDropdownMenu from "./profile-setting-dropdown-menu";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const MyProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isUserLogin, user, imageUrl } = useAppSelector(
        (state) => state.auth
    );

    const [activeTab, setActiveTab] = useState("photos");
    const [searchFriends, setSearchFriends] = useState("");
    const [isEnlarged, setIsEnlarged] = useState(false);

    // Kullanıcı oturum kontrolü
    if (!isUserLogin || !user) {
        return (
            <div className="flex h-full min-h-0 items-center justify-center bg-slate-50 p-6">
                <p className="text-slate-500">
                    Please log in to view your profile.
                </p>
            </div>
        );
    }

    // Profil fotoğrafı: Önce Redux imageUrl, sonra user.profileImage.
    const profileImage =
        imageUrl ||
        user?.profileImage ||
        DEFAULT_IMAGE;

    // Kullanıcı fotoğrafları
    const myImages = Array.isArray(user?.myImages)
        ? user.myImages
        : [];

    // Arkadaş arama
    const filteredFriends = friends.filter((friend) => {
        const name = `${friend.firstName || ""} ${friend.lastName || ""}`;
        return name.toLowerCase().includes(searchFriends.toLowerCase());
    });

    // Arkadaş profiline git
    const handleFriendProfile = (friend) => {
        dispatch(setFriendProfile(friend));
        navigate("/friendProfile");
    };

    // Fotoğraf büyütme
    const handleToggleSize = () => {
        setIsEnlarged((previous) => !previous);
    };

    // Büyük fotoğraf görünümü
    if (isEnlarged) {
        return (
            <div className="h-full min-h-0 w-full overflow-y-auto bg-slate-950 p-3 sm:p-5">
                <MyPhotos
                    myImages={myImages}
                    isEnlarged={isEnlarged}
                    handleToggleSize={handleToggleSize}
                />
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-xl">

            {/* Header */}
            <header className="flex shrink-0 items-center justify-between gap-3 bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 px-4 py-4 text-white sm:px-6">
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-bold sm:text-2xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-xs text-indigo-200 sm:text-sm">
                        Manage your personal information
                    </p>
                </div>

                <ProfileSettingDropdownMenu />
            </header>

            {/* Main content */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">

                {/* Profile information */}
                <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:w-[340px] lg:overflow-y-auto lg:border-b-0 lg:border-r xl:w-[380px]">

                    {/* Profile photo */}
                    <div className="flex flex-col items-center bg-gradient-to-b from-indigo-50 to-white px-5 py-8">

                        <div className="relative">
                            <img
                                src={profileImage}
                                alt="Profil fotoğrafı"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = DEFAULT_IMAGE;
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => navigate("/updateProfile")}
                                title="Change profile"
                                aria-label="Change profile photo"
                                className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md transition hover:bg-emerald-700"
                            >
                                <FaCamera />
                            </button>
                        </div>

                        <h2 className="mt-4 text-xl font-bold text-slate-800">
                            {user.firstName} {user.lastName}
                        </h2>

                        <p className="mt-1 break-all text-center text-sm text-slate-500">
                            {user.email}
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/updateProfile")}
                            className="mt-5 rounded-xl bg-indigo-950 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-800"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Personal information */}
                    <div className="space-y-1 px-5 pb-6">
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">
                            Personal Information
                        </h3>

                        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                            <FaUserFriends className="shrink-0 text-indigo-600" />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    First name / Last name
                                </p>

                                <p className="break-words text-sm font-medium text-slate-700">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                            <FaEnvelope className="shrink-0 text-indigo-600" />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Email
                                </p>

                                <p className="break-all text-sm font-medium text-slate-700">
                                    {user.email || "Not provided"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                            <FaPhone className="shrink-0 text-indigo-600" />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Phone
                                </p>

                                <p className="break-words text-sm font-medium text-slate-700">
                                    {user.phone || "Not provided"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                            <FaMapMarkerAlt className="shrink-0 text-indigo-600" />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Address
                                </p>

                                <p className="break-words text-sm font-medium text-slate-700">
                                    {user.address || "Not provided"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50">
                            <FaIdCard className="shrink-0 text-indigo-600" />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Post code
                                </p>

                                <p className="text-sm font-medium text-slate-700">
                                    {user.postCode || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Photos and friends */}
                <section className="flex min-h-[420px] min-w-0 flex-1 flex-col bg-slate-50 lg:min-h-0 lg:overflow-hidden">

                    {/* Tabs */}
                    <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">

                        <button
                            type="button"
                            onClick={() => setActiveTab("photos")}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "photos"
                                ? "bg-indigo-950 text-white shadow"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <MdPhotoLibrary size={19} />
                            Photos
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("friends")}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "friends"
                                ? "bg-indigo-950 text-white shadow"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <FaUserFriends size={17} />
                            Friends
                        </button>
                    </div>

                    {/* Friend search */}
                    {activeTab === "friends" && (
                        <div className="shrink-0 border-b border-slate-200 bg-white p-4">
                            <input
                                type="search"
                                value={searchFriends}
                                onChange={(event) =>
                                    setSearchFriends(event.target.value)
                                }
                                placeholder="Search friends..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    )}

                    {/* Tab content */}
                    <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">

                        {activeTab === "photos" ? (
                            myImages.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {myImages.map((photo, index) => (
                                        <div key={photo.id || photo.imageId || index}>
                                            <MyPhotos
                                                myImages={[photo]}
                                                isEnlarged={isEnlarged}
                                                handleToggleSize={handleToggleSize}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                                    <FaImages className="mb-4 text-5xl text-slate-300" />

                                    <h3 className="font-semibold text-slate-700">
                                        No photos yet
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Your photos will appear here.
                                    </p>
                                </div>
                            )
                        ) : filteredFriends.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredFriends.map((friend, index) => (
                                    <FriendsCard
                                        key={friend.id || index}
                                        {...friend}
                                        handleFriendProfile={() =>
                                            handleFriendProfile(friend)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">
                                No friends found.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfile;
