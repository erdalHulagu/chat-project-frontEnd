
import React, { useEffect, useState } from "react";

import { HiUserGroup } from "react-icons/hi";
import { SiInstatus } from "react-icons/si";
import { ImSearch } from "react-icons/im";
import { PiUserListFill } from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiEmojiStickerFill } from "react-icons/ri";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { IoArrowBack, IoClose } from "react-icons/io5";

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

import {
    createSingleMessage,
    getAllMessage,
} from "../../../redux/store/slices/message/message-action";

import {
    clearMessages,
} from "../../../redux/store/slices/message/message-slice";
import {
    clearSearchResults,
} from "../../../redux/store/slices/user/user/serachUser/user-search-slice";


const UserHome = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Redux states
    const { isUserLogin, user, imageUrl } = useAppSelector(
        (state) => state.auth
    );

    const searchResults = useAppSelector(
        (state) => state.userSearch.searchResults
    );

    const searchLoading = useAppSelector(
        (state) => state.userSearch.loading
    );

    const searchError = useAppSelector(
        (state) => state.userSearch.error
    );

    const messages = useAppSelector(
        (state) => state.message.messages
    );

    const chatState = useAppSelector(
        (state) => state.usersSingleChat.singleChat
    );

    const allChatsState = useAppSelector(
        (state) => state.allUsersChat.allChats
    );

    const allChats = Array.isArray(allChatsState?.data)
        ? allChatsState.data
        : [];

    // Local states
    const [search, setSearch] = useState("");
    const [showUserList, setShowUserList] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    const [activeChatId, setActiveChatId] = useState(null);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messageText, setMessageText] = useState("");

    const [sending, setSending] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Kullanıcının sohbetlerini yükle
    useEffect(() => {
        if (isUserLogin) {
            dispatch(getAllUsersChats());
        }
    }, [isUserLogin, dispatch]);

    // Kullanıcı arama
    // Kullanıcı arama
    useEffect(() => {
        if (!isUserLogin || !search.trim()) {
            dispatch(clearSearchResults());
            return;
        }

        const timer = setTimeout(() => {
            dispatch(
                searchUsers({
                    firstName: search.trim(),
                })
            );
        }, 350);

        return () => clearTimeout(timer);
    }, [search, isUserLogin, dispatch]);

    // Sohbet mesajlarını yükle
    const loadChatMessages = async (chatId) => {
        if (!chatId) return;

        try {
            setLoadingMessages(true);
            dispatch(clearMessages());

            await dispatch(getAllMessage(chatId));
        } catch (err) {
            console.error("Messages could not be loaded:", err);
        } finally {
            setLoadingMessages(false);
        }
    };

    // Arama sonucundan bireysel sohbet oluştur veya aç
    const handleCreateChat = async (selected) => {
        if (!selected?.id) return;

        // Giriş yapan kullanıcı kendisini seçemesin.
        if (String(selected.id) === String(user?.id)) {
            console.warn("Kendi kendinle sohbet başlatamazsın.");
            return;
        }

        try {
            setSelectedUser(selected);
            setSelectedChat(null);
            setActiveChatId(null);

            setIsChatOpen(true);
            setMessageText("");

            dispatch(clearMessages());

            const chat = await dispatch(
                singleUserChat(selected.id)
            ).unwrap();

            const currentChatId = chat?.id ?? chat?.chatId;

            if (!currentChatId) {
                console.error("Chat ID not found:", chat);
                return;
            }

            setSelectedChat(chat);
            setActiveChatId(currentChatId);

            await loadChatMessages(currentChatId);

            // Sohbet listesini yenile.
            dispatch(getAllUsersChats());

        } catch (err) {
            console.error("Could not create/open chat:", err);
        }
    };
    // Mevcut bireysel veya grup sohbetini aç
    const handleOpenExistingChat = async (chat) => {
        if (!chat?.id) return;

        const users = Array.isArray(chat.users)
            ? chat.users
            : [];

        const otherUsers = users.filter(
            (item) => String(item.id) !== String(user?.id)
        );

        setSelectedChat(chat);
        setSelectedUser(
            chat.isGroup ? null : otherUsers[0] || null
        );

        setActiveChatId(chat.id);
        setIsChatOpen(true);
        setMessageText("");

        await loadChatMessages(chat.id);
    };

    // Mesaj gönder
    const handleSendMessage = async (event) => {
        event.preventDefault();

        const content = messageText.trim();
        const currentChatId = activeChatId;

        if (!content || !currentChatId || sending) return;

        try {
            setSending(true);

            await dispatch(
                createSingleMessage({
                    chatId: currentChatId,
                    content,
                })
            );

            setMessageText("");

            // Son mesajın kartta görünmesi için listeyi yenile.
            dispatch(getAllUsersChats());

        } catch (err) {
            console.error("Message sending failed:", err);
        } finally {
            setSending(false);
        }
    };

    // Arama alanı
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setShowUserList(false);
    };

    // Aramayı temizle
    const handleClearSearch = () => {
        setSearch("");
    };

    // Kullanıcı listesini göster
    const handleShowChatList = () => {
        setSearch("");
        dispatch(clearSearchResults());
        setShowUserList((previous) => !previous);
    };

    // Mobil geri dönüş
    const handleBackToChats = () => {
        setIsChatOpen(false);
    };

    // Navigasyon
    const handleProfile = () => navigate("/profile");
    const handleGroup = () => navigate("/group");
    const handleStatus = () => navigate("/status");

    // Arama sonuçları
    const displayedUsers = (
        search.trim() || showUserList
            ? searchResults
            : []
    ).filter(
        (item) => String(item.id) !== String(user?.id)
    );
    const isSearching = Boolean(search.trim());

    // Aktif sohbet kontrolü
    const hasActiveChat = Boolean(selectedChat || selectedUser);

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
                        src={
                            imageUrl ||
                            require("../../../assets/img/user.webp")
                        }
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
                                    onClick={handleClearSearch}
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
                            className={`
                                mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition
                                ${showUserList
                                    ? "bg-indigo-100 text-indigo-800"
                                    : "text-slate-600 hover:bg-slate-100"
                                }
                            `}
                        >
                            <PiUserListFill size={20} />
                            <span>Chat list</span>
                        </button>

                    </div>

                    {/* CONTACT / CHAT LIST */}
                    <div className="min-h-0 flex-1 overflow-y-auto">

                        {isSearching || showUserList ? (

                            searchLoading ? (

                                <div className="px-5 py-12 text-center">
                                    <p className="text-sm text-indigo-600">
                                        Kullanıcılar aranıyor...
                                    </p>
                                </div>

                            ) : searchError ? (

                                <div className="px-5 py-12 text-center">
                                    <p className="text-sm font-medium text-red-500">
                                        Kullanıcılar yüklenemedi.
                                    </p>
                                </div>

                            ) : displayedUsers.length > 0 ? (

                                displayedUsers.map((item) => (

                                    <ChatCard
                                        key={item.id}
                                        item={{
                                            ...item,
                                            users: [item],
                                            messages: [],
                                            isGroup: false,
                                        }}
                                        currentUserId={user?.id}
                                        onClick={() => handleCreateChat(item)}
                                        active={
                                            selectedUser?.id === item.id &&
                                            !selectedChat
                                        }
                                    />

                                ))

                            ) : (

                                <div className="px-5 py-12 text-center">

                                    <ImSearch className="mx-auto mb-3 text-3xl text-slate-300" />

                                    <p className="text-sm font-medium text-slate-600">
                                        {isSearching
                                            ? "Kullanıcı bulunamadı."
                                            : "Henüz kullanıcı bulunmuyor."}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Farklı bir isim deneyebilirsin.
                                    </p>

                                </div>

                            )

                        ) : (

                            allChatsState?.loading ? (

                                <div className="px-5 py-12 text-center">
                                    <p className="text-sm text-slate-500">
                                        Loading conversations...
                                    </p>
                                </div>

                            ) : allChats.length > 0 ? (

                                allChats.map((chat) => (

                                    <ChatCard
                                        key={chat.id}
                                        item={chat}
                                        currentUserId={user?.id}
                                        onClick={handleOpenExistingChat}
                                        active={selectedChat?.id === chat.id}
                                    />

                                ))

                            ) : (

                                <div className="px-5 py-12 text-center">

                                    <BsFillChatLeftDotsFill className="mx-auto mb-3 text-3xl text-slate-300" />

                                    <p className="text-sm font-medium text-slate-600">
                                        Henüz sohbetin yok
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Yeni bir kullanıcı arayarak sohbet başlatabilirsin.
                                    </p>

                                </div>

                            )

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

                    {hasActiveChat ? (

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

                                    <ChatDetail
                                        selectedUser={selectedUser}
                                        selectedChat={selectedChat}
                                        currentUserId={user?.id}
                                    />

                                </div>
                            </div>

                            {/* MESSAGES */}
                            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6">

                                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">

                                    {loadingMessages || chatState.loading ? (

                                        <p className="py-8 text-center text-sm text-slate-500">
                                            Loading conversation...
                                        </p>

                                    ) : messages.length > 0 ? (

                                        messages.map((message) => (

                                            <MessageCard
                                                key={message.id}
                                                isRegUserMessage={
                                                    String(message.userId) !==
                                                    String(user?.id)
                                                }
                                                content={message.content}
                                                createdAt={message.createAt}
                                            />

                                        ))

                                    ) : (

                                        <div className="py-12 text-center">

                                            <BsFillChatLeftDotsFill className="mx-auto mb-3 text-3xl text-slate-300" />

                                            <p className="text-sm font-medium text-slate-600">
                                                No messages yet
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Send the first message.
                                            </p>

                                        </div>

                                    )}

                                </div>
                            </div>

                            {/* MESSAGE COMPOSER */}
                            <form
                                onSubmit={handleSendMessage}
                                className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-white px-2 py-3 sm:gap-3 sm:px-4"
                            >

                                <button
                                    type="button"
                                    aria-label="Emoji"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-800 transition hover:bg-indigo-50"
                                >
                                    <RiEmojiStickerFill size={21} />
                                </button>

                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(event) =>
                                        setMessageText(event.target.value)
                                    }
                                    placeholder="Type a message..."
                                    aria-label="Type a message"
                                    maxLength={5000}
                                    className="h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />

                                <button
                                    type="submit"
                                    disabled={
                                        !messageText.trim() ||
                                        !activeChatId ||
                                        sending
                                    }
                                    className="flex h-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:px-5"
                                >
                                    {sending ? "Sending..." : "Send"}
                                </button>

                                <button
                                    type="button"
                                    aria-label="Voice message"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-800 transition hover:bg-indigo-50"
                                >
                                    <FaMicrophoneAlt size={19} />
                                </button>

                            </form>

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
