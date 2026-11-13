
import React, { useEffect, useState } from "react";
import {
  HiUserGroup,
} from "react-icons/hi";
import { SiInstatus } from "react-icons/si";
import { ImSearch } from "react-icons/im";
import {
  PiUserListFill,
  PiPlusCircleFill,
} from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiEmojiStickerFill } from "react-icons/ri";
import {
  BsFillChatLeftDotsFill,
} from "react-icons/bs";
import {
  IoArrowBack,
  IoClose,
} from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import MessageCard from "../chat/message-card";
import ChatCard from "../chat/chat-card";
import ChatDetail from "../chat/chat-detail";
import UserHomeDropDownMenu from "./user-home-dropdown-menu";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/hooks";

import {
  getAllUsersChats,
} from "../../../redux/store/slices/chat/chat-thunks/get-all-users-chats";

import {
  singleUserChat,
} from "../../../redux/store/slices/chat/chat-thunks/single-user-chat";

import {
  searchUsers,
} from "../../../redux/store/slices/user/user/serachUser/user-search-action";

const UserHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isUserLogin, user, imageUrl } = useAppSelector(
    (state) => state.auth
  );

  const searchResults = useAppSelector(
    (state) => state.userSearch.searchResults
  );

  const [search, setSearch] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Kullanıcının sohbetlerini girişte bir kez yükle.
  useEffect(() => {
    if (isUserLogin) {
      dispatch(getAllUsersChats());
    }
  }, [isUserLogin, dispatch]);

  // Arama işlemini kısa bir gecikmeyle gerçekleştir.
  useEffect(() => {
    if (!isUserLogin || !search.trim()) return;

    const timer = setTimeout(() => {
      dispatch(searchUsers({ firstName: search.trim() }));
    }, 350);

    return () => clearTimeout(timer);
  }, [search, isUserLogin, dispatch]);

  const handleCreateChat = (selected) => {
    if (!selected?.id) return;

    dispatch(singleUserChat(selected.id));

    setSelectedUser(selected);
    setIsChatOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setShowUserList(false);
  };

  const handleShowChatList = () => {
    setSearch("");
    setShowUserList((previous) => !previous);
  };

  const handleBackToChats = () => {
    setIsChatOpen(false);
  };

  const handleProfile = () => navigate("/profile");
  const handleGroup = () => navigate("/group");
  const handleStatus = () => navigate("/status");

  const displayedUsers = search.trim() || showUserList
    ? (Array.isArray(searchResults) ? searchResults : [])
    : [];

  return (
    <section className="flex h-[calc(100dvh-8rem)] min-h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

      {/* TOP BAR */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:px-5">

        <button
          type="button"
          onClick={handleProfile}
          className="flex min-w-0 items-center gap-3 rounded-xl p-1 text-left transition hover:bg-slate-100"
          aria-label="Open profile"
        >
          <img
            src={imageUrl || require("../../../assets/img/user.webp")}
            alt="Profile"
            className="h-11 w-11 shrink-0 rounded-full border-2 border-indigo-100 object-cover sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 sm:text-base">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-emerald-600">
              Welcome back
            </p>
          </div>
        </button>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">

          <button
            type="button"
            onClick={handleGroup}
            title="Groups"
            aria-label="Groups"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-indigo-900 transition hover:bg-indigo-50 hover:text-indigo-600 sm:h-11 sm:w-11"
          >
            <HiUserGroup size={22} />
          </button>

          <button
            type="button"
            onClick={handleStatus}
            title="Status"
            aria-label="Status"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-indigo-900 transition hover:bg-indigo-50 hover:text-indigo-600 sm:h-11 sm:w-11"
          >
            <SiInstatus size={20} />
          </button>

          <button
            type="button"
            onClick={() => setIsChatOpen(false)}
            title="Chats"
            aria-label="Chats"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-indigo-900 transition hover:bg-indigo-50 hover:text-indigo-600 sm:h-11 sm:w-11"
          >
            <BsFillChatLeftDotsFill size={20} />
          </button>

          <UserHomeDropDownMenu />

        </nav>
      </header>

      {/* CHAT BODY */}
      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* CHAT SIDEBAR */}
        <aside
          className={`
            flex w-full shrink-0 flex-col border-r border-slate-200 bg-slate-50
            md:w-[320px] lg:w-[360px] xl:w-[390px]
            ${isChatOpen ? "hidden md:flex" : "flex"}
          `}
        >

          {/* SEARCH */}
          <div className="shrink-0 border-b border-slate-200 bg-white p-3 sm:p-4">

            <div className="relative">
              <ImSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />

              <input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search people..."
                aria-label="Search people"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <IoClose size={18} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleShowChatList}
              className={`mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                showUserList
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <PiUserListFill size={20} />
              <span>Chat list</span>
            </button>

          </div>

          {/* CONTACT LIST */}
          <div className="min-h-0 flex-1 overflow-y-auto">

            {search.trim() || showUserList ? (
              displayedUsers.length > 0 ? (
                displayedUsers.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleCreateChat(item)}
                    className="w-full border-b border-slate-100 text-left transition hover:bg-indigo-50"
                  >
                    <ChatCard item={item} />
                  </button>
                ))
              ) : (
                <div className="px-5 py-12 text-center">
                  <ImSearch className="mx-auto mb-3 text-3xl text-slate-300" />
                  <p className="text-sm font-medium text-slate-600">
                    No users found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try another search.
                  </p>
                </div>
              )
            ) : (
              <div className="px-5 py-12 text-center">
                <BsFillChatLeftDotsFill className="mx-auto mb-3 text-3xl text-slate-300" />
                <p className="text-sm font-medium text-slate-600">
                  Your conversations
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Search for a person to start a conversation.
                </p>
              </div>
            )}

          </div>
        </aside>

        {/* CHAT CONTENT */}
        <main
          className={`
            min-w-0 flex-1 flex-col bg-slate-100
            ${isChatOpen ? "flex" : "hidden md:flex"}
          `}
        >

          {selectedUser ? (
            <>
              {/* CHAT HEADER */}
              <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 py-3 sm:px-5">

                <button
                  type="button"
                  onClick={handleBackToChats}
                  aria-label="Back to chat list"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 md:hidden"
                >
                  <IoArrowBack size={21} />
                </button>

                <div className="min-w-0 flex-1">
                  <ChatDetail selectedUser={selectedUser} />
                </div>

              </div>

              {/* MESSAGES */}
              <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6">

                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                  {[...Array(15)].map((_, index) => (
                    <MessageCard
                      key={index}
                      isRegUserMessage={index % 2 === 0}
                      content="message"
                    />
                  ))}
                </div>

              </div>

              {/* MESSAGE COMPOSER */}
              <div className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-white px-2 py-3 sm:gap-3 sm:px-4">

                <button
                  type="button"
                  aria-label="Emoji"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-800 transition hover:bg-indigo-50"
                >
                  <RiEmojiStickerFill size={21} />
                </button>

                <button
                  type="button"
                  aria-label="Add attachment"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-800 transition hover:bg-indigo-50"
                >
                  <PiPlusCircleFill size={23} />
                </button>

                <input
                  type="text"
                  placeholder="Type a message..."
                  aria-label="Type a message"
                  className="h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  aria-label="Voice message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-800 transition hover:bg-indigo-50"
                >
                  <FaMicrophoneAlt size={19} />
                </button>

              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 px-5 text-center">

              <div className="max-w-md">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur">
                  <BsFillChatLeftDotsFill size={34} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Connect to the world
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                  Choose a person from your list or search for someone
                  to start a conversation.
                </p>
              </div>

            </div>
          )}

        </main>

      </div>
    </section>
  );
};

export default UserHome;
