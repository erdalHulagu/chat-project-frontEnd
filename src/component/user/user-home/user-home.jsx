
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

import { HiUserGroup } from "react-icons/hi";
import { SiInstatus } from "react-icons/si";
import { ImSearch } from "react-icons/im";
import { PiUserListFill } from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiEmojiStickerFill } from "react-icons/ri";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import {
  IoArrowBack,
  IoClose,
} from "react-icons/io5";
import {
  FiUserPlus,
  FiMessageCircle,
} from "react-icons/fi";

import MessageCard from "../chat/message-card";
import ChatCard from "../chat/chat-card";
import ChatDetail from "../chat/chat-detail";
import UserHomeDropDownMenu from "./user-home-dropdown-menu";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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
  createNewMessage,
} from "../../../redux/store/slices/message/message-slice";

import {
  connectWebSocket,
  disconnectWebSocket,
} from "../../../api/service/websocket-service";

import {
  clearSearchResults,
} from "../../../redux/store/slices/user/user/serachUser/user-search-slice";


const DEFAULT_IMAGE = require("../../../assets/img/user.webp");


const getLatestChatTime = (chat) => {
  const messages = Array.isArray(chat?.messages)
    ? chat.messages
    : [];

  const messageTimes = messages
    .map((message) => {
      const date =
        message?.createAt ||
        message?.createdAt ||
        message?.timestamp;

      return date ? new Date(date).getTime() : 0;
    })
    .filter((time) => Number.isFinite(time));

  if (messageTimes.length > 0) {
    return Math.max(...messageTimes);
  }

  const chatDate =
    chat?.lastMessageAt ||
    chat?.updatedAt ||
    chat?.createAt ||
    chat?.createdAt;

  return chatDate
    ? new Date(chatDate).getTime() || 0
    : 0;
};


const UserHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // URL üzerinden gelen grup/sohbet ID
  const [searchParams] = useSearchParams();
  const requestedChatId = searchParams.get("chatId");

  // Aynı sohbetin tekrar tekrar otomatik açılmasını önler
  const autoOpenedChatIdRef = useRef(null);

  // Redux
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

  // Sohbet listesini güvenli şekilde al
  const allChats = useMemo(() => {
    return Array.isArray(allChatsState?.data)
      ? allChatsState.data
      : [];
  }, [allChatsState?.data]);

  // Sohbetleri son mesaja göre sırala
  const sortedChats = useMemo(() => {
    return [...allChats].sort(
      (chatA, chatB) =>
        getLatestChatTime(chatB) - getLatestChatTime(chatA)
    );
  }, [allChats]);

  // Local states
  const [search, setSearch] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [activeChatId, setActiveChatId] = useState(null);
  const activeChatIdRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);


  // Sohbetleri yükle
  useEffect(() => {
    if (isUserLogin) {
      dispatch(getAllUsersChats());
    }
  }, [isUserLogin, dispatch]);


  // Aktif sohbet ID
  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);


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


  // Mesajları yükle
  const loadChatMessages = useCallback(async (chatId) => {
    if (!chatId) return;

    try {
      setLoadingMessages(true);
      dispatch(clearMessages());

      await dispatch(getAllMessage(chatId)).unwrap();
    } catch (err) {
      console.error("Messages could not be loaded:", err);
    } finally {
      setLoadingMessages(false);
    }
  }, [dispatch]);


  // WebSocket
  useEffect(() => {
    if (!isUserLogin) {
      disconnectWebSocket();
      return;
    }

    connectWebSocket((receivedMessage) => {
      const currentChatId = activeChatIdRef.current;

      if (
        currentChatId &&
        String(receivedMessage.chatId) === String(currentChatId)
      ) {
        dispatch(createNewMessage(receivedMessage));
      }

      dispatch(getAllUsersChats());
    });

    return () => {
      disconnectWebSocket();
    };
  }, [isUserLogin, dispatch]);


  // Yeni bireysel sohbet aç
  const handleCreateChat = async (selected) => {
    if (!selected?.id) return;

    if (String(selected.id) === String(user?.id)) {
      return;
    }

    try {
      console.log("SEÇİLEN KULLANICI:", selected);

      setSelectedUser(selected);
      setSelectedChat(null);
      setActiveChatId(null);

      setIsChatOpen(true);
      setMessageText("");

      dispatch(clearMessages());

      const chat = await dispatch(
        singleUserChat(selected.id)
      ).unwrap();

      console.log("OLUŞAN SOHBET:", chat);

      const currentChatId = chat?.id ?? chat?.chatId;

      if (!currentChatId) {
        console.error("Chat ID not found:", chat);
        return;
      }

      setSelectedChat(chat);
      setActiveChatId(currentChatId);

      await loadChatMessages(currentChatId);

      dispatch(getAllUsersChats());
    } catch (err) {
      console.error("Could not create/open chat:", err);
    }
  };


  // Var olan sohbeti aç
  // Hem bireysel hem grup sohbetleri için kullanılır.
  const handleOpenExistingChat = useCallback(async (chat) => {
    console.log(
      "SOHBETİN TAM VERİSİ:",
      JSON.stringify(chat, null, 2)
    );

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
  }, [user?.id, loadChatMessages]);


  // URL üzerinden gelen sohbeti otomatik aç
  useEffect(() => {
    if (!requestedChatId) {
      autoOpenedChatIdRef.current = null;
      return;
    }

    // Sohbet listesi henüz yükleniyorsa bekle
    if (allChatsState?.loading) {
      return;
    }

    // Aynı sohbet zaten otomatik açıldıysa tekrar açma
    if (autoOpenedChatIdRef.current === requestedChatId) {
      return;
    }

    // URL'deki ID'ye sahip sohbeti bul
    const requestedChat = allChats.find(
      (chat) => String(chat.id) === String(requestedChatId)
    );

    if (!requestedChat) {
      console.warn(
        "URL üzerinden istenen sohbet bulunamadı:",
        requestedChatId
      );
      return;
    }

    // ID kaydedilir ve mevcut sohbet açma fonksiyonu çağrılır
    autoOpenedChatIdRef.current = requestedChatId;

    handleOpenExistingChat(requestedChat);

  }, [
    requestedChatId,
    allChats,
    allChatsState?.loading,
    handleOpenExistingChat,
  ]);


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
      ).unwrap();

      setMessageText("");
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


  const handleClearSearch = () => {
    setSearch("");
    dispatch(clearSearchResults());
  };


  // Kişi arama listesini göster
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
  const handleDiscoverUsers = () => navigate("/discover-users");


  // Arama sonuçları
  const displayedUsers = (
    Array.isArray(searchResults) ? searchResults : []
  ).filter(
    (item) => String(item.id) !== String(user?.id)
  );

  const isSearching = Boolean(search.trim());
  const hasActiveChat = Boolean(selectedChat || selectedUser);

  const safeMessages = Array.isArray(messages)
    ? messages
    : [];


  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 items-center justify-center overflow-hidden bg-background p-2 sm:p-4 lg:p-5">

      {/* ORTALANMIŞ ANA SOHBET KARTI */}
      <section className="mx-auto flex h-full min-h-0 w-full max-w-[1500px] min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-slate-200/50">

        {/* TOP BAR */}
        <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 py-3 sm:px-5">

          <button
            type="button"
            onClick={handleProfile}
            className="flex min-w-0 items-center gap-3 rounded-xl p-1.5 text-left transition hover:bg-primary-soft"
            aria-label="Open profile"
          >
            <div className="relative shrink-0">
              <img
                src={imageUrl || DEFAULT_IMAGE}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-primary-soft object-cover sm:h-11 sm:w-11"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-text sm:text-base">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs font-medium text-primary">
                Welcome back
              </p>
            </div>
          </button>

          <nav className="flex shrink-0 items-center gap-1 sm:gap-2">

            <button
              type="button"
              onClick={handleDiscoverUsers}
              title="Find friends"
              aria-label="Find friends"
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary-soft px-3 text-primary transition hover:bg-primary hover:text-white"
            >
              <FiUserPlus size={19} />
              <span className="hidden text-xs font-semibold sm:inline">
                Find friends
              </span>
            </button>

            <button
              type="button"
              onClick={handleGroup}
              title="Groups"
              aria-label="Groups"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary"
            >
              <HiUserGroup size={21} />
            </button>

            <button
              type="button"
              onClick={handleStatus}
              title="Status"
              aria-label="Status"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary"
            >
              <SiInstatus size={19} />
            </button>

            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              title="Chats"
              aria-label="Chats"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition hover:bg-primary hover:text-white"
            >
              <BsFillChatLeftDotsFill size={19} />
            </button>

            <div className="ml-1 border-l border-border pl-2">
              <UserHomeDropDownMenu />
            </div>
          </nav>
        </header>


        {/* CHAT BODY */}
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">

          {/* SOL PANEL */}
          <aside
            className={`
              flex min-h-0 w-full shrink-0 flex-col overflow-hidden bg-surface
              md:w-[290px] lg:w-[330px] xl:w-[360px]
              ${isChatOpen ? "hidden md:flex" : "flex"}
            `}
          >

            {/* SIDEBAR HEADER */}
            <div className="shrink-0 border-b border-border px-4 pb-4 pt-5">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-text">
                    Messages
                  </h2>
                  <p className="mt-1 text-xs text-text-secondary">
                    Stay connected with your people
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <BsFillChatLeftDotsFill size={18} />
                </div>
              </div>


              {/* SEARCH */}
              <div className="relative">
                <ImSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  size={16}
                />

                <input
                  type="search"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search people..."
                  aria-label="Search people"
                  className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-10 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
                  >
                    <IoClose size={19} />
                  </button>
                )}
              </div>


              {/* CHAT PEOPLE SEARCH */}
              <button
                type="button"
                onClick={handleShowChatList}
                className={`
                  mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition
                  ${showUserList
                    ? "bg-primary text-white shadow-md shadow-primary/15"
                    : "bg-primary-soft text-primary hover:bg-primary hover:text-white"
                  }
                `}
              >
                <PiUserListFill size={19} />
                <span>Find people to chat</span>
              </button>


              {/* DISCOVER FRIENDS */}
              <button
                type="button"
                onClick={handleDiscoverUsers}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-semibold text-text-secondary transition hover:border-primary hover:bg-primary-soft hover:text-primary"
              >
                <FiUserPlus size={18} />
                <span>Discover new friends</span>
              </button>
            </div>


            {/* LİSTE ALANI */}
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain custom-scrollbar">

              <div className="px-3 py-4">

                <div className="mb-3 flex items-center justify-between px-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                    {isSearching || showUserList
                      ? "People"
                      : "Recent conversations"}
                  </p>

                  <span className="rounded-full bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">
                    {isSearching || showUserList
                      ? displayedUsers.length
                      : sortedChats.length}
                  </span>
                </div>


                {isSearching || showUserList ? (

                  searchLoading ? (

                    <div className="px-5 py-12 text-center">
                      <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                      <p className="text-sm font-medium text-primary">
                        Searching people...
                      </p>
                    </div>

                  ) : searchError ? (

                    <div className="px-5 py-12 text-center">
                      <p className="text-sm font-medium text-danger">
                        Could not load users.
                      </p>
                    </div>

                  ) : displayedUsers.length > 0 ? (

                    <div className="space-y-1">
                      {displayedUsers.map((item) => (
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
                      ))}
                    </div>

                  ) : (

                    <div className="px-5 py-12 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                        <ImSearch size={21} />
                      </div>

                      <p className="text-sm font-semibold text-text">
                        No people found
                      </p>

                      <p className="mt-1 text-xs text-text-secondary">
                        Try another name.
                      </p>
                    </div>

                  )

                ) : (

                  allChatsState?.loading ? (

                    <div className="px-5 py-12 text-center">
                      <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                      <p className="text-sm text-text-secondary">
                        Loading conversations...
                      </p>
                    </div>

                  ) : sortedChats.length > 0 ? (

                    <div className="space-y-1">
                      {sortedChats.map((chat) => (
                        <ChatCard
                          key={chat.id}
                          item={chat}
                          currentUserId={user?.id}
                          onClick={handleOpenExistingChat}
                          active={selectedChat?.id === chat.id}
                        />
                      ))}
                    </div>

                  ) : (

                    <div className="px-5 py-12 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                        <BsFillChatLeftDotsFill size={23} />
                      </div>

                      <p className="text-sm font-semibold text-text">
                        No conversations yet
                      </p>

                      <p className="mt-1 text-xs leading-5 text-text-secondary">
                        Search for someone and start your first message.
                      </p>

                      <button
                        type="button"
                        onClick={handleDiscoverUsers}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
                      >
                        <FiUserPlus size={15} />
                        Find friends
                      </button>
                    </div>

                  )
                )}
              </div>
            </div>
          </aside>


          {/* SAĞ SOHBET PANELİ */}
          <main
            className={`
              flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-border bg-background
              ${isChatOpen ? "" : "hidden md:flex"}
            `}
          >

            {hasActiveChat ? (

              <>

                {/* CHAT HEADER */}
                <div className="relative z-10 flex shrink-0 items-center gap-3 border-b border-border bg-surface px-3 py-3 sm:px-5">

                  <button
                    type="button"
                    onClick={handleBackToChats}
                    aria-label="Back to chat list"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary md:hidden"
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


                {/* MESAJLAR */}
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar px-3 py-5 sm:px-6">

                  <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4">

                    {/* GRUPLARA GERİ DÖN */}
                    {selectedChat?.isGroup && (
                      <div className="mb-2 flex justify-start">
                        <button
                          type="button"
                          onClick={() => navigate("/group")}
                          className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                        >
                          <span>←</span>
                          Gruplara Geri Dön
                        </button>
                      </div>
                    )}


                    {loadingMessages || chatState?.loading ? (

                      <div className="py-12 text-center">
                        <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                        <p className="text-sm font-medium text-primary">
                          Loading messages...
                        </p>
                      </div>

                    ) : safeMessages.length > 0 ? (

                      safeMessages.map((message) => (
                        <MessageCard
                          key={message.id}
                          isRegUserMessage={
                            String(message.userId) !== String(user?.id)
                          }
                          content={message.content}
                          createdAt={message.createAt}
                        />
                      ))

                    ) : (

                      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-soft text-primary">
                          <FiMessageCircle size={27} />
                        </div>

                        <p className="text-base font-bold text-text">
                          Start the conversation
                        </p>

                        <p className="mt-2 text-sm text-text-secondary">
                          Send your first message.
                        </p>
                      </div>

                    )}
                  </div>
                </div>


                {/* MESSAGE COMPOSER */}
                <form
                  onSubmit={handleSendMessage}
                  className="relative z-10 flex shrink-0 items-center gap-2 border-t border-border bg-surface px-3 py-3 sm:gap-3 sm:px-5"
                >

                  <button
                    type="button"
                    aria-label="Emoji"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary"
                  >
                    <RiEmojiStickerFill size={21} />
                  </button>

                  <input
                    type="text"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    placeholder="Write a message..."
                    aria-label="Type a message"
                    maxLength={5000}
                    className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                  />

                  <button
                    type="submit"
                    disabled={
                      !messageText.trim() ||
                      !activeChatId ||
                      sending
                    }
                    className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-md shadow-primary/15 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>

                  <button
                    type="button"
                    aria-label="Voice message"
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-secondary transition hover:bg-primary-soft hover:text-primary sm:flex"
                  >
                    <FaMicrophoneAlt size={19} />
                  </button>
                </form>
              </>

            ) : (

              /* BOŞ SOHBET EKRANI */
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light px-5 py-8 text-center">

                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />

                <div className="relative z-10 max-w-md">

                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur">
                    <BsFillChatLeftDotsFill size={38} />
                  </div>

                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
                    Furqan Worldwide Connection
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Your conversations,
                    <span className="block text-emerald-200">
                      all in one place.
                    </span>
                  </h2>

                  <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-emerald-50/80">
                    Choose someone from your conversations or search for a new
                    person to start connecting.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <button
                      type="button"
                      onClick={handleShowChatList}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-dark shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"
                    >
                      <PiUserListFill size={19} />
                      Find people
                    </button>

                    <button
                      type="button"
                      onClick={handleDiscoverUsers}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
                    >
                      <FiUserPlus size={18} />
                      Find friends
                    </button>

                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
