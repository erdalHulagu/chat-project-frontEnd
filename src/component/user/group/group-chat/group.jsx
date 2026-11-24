
import React, { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiUsers,
  FiPlus,
  FiGlobe,
  FiUserPlus,
  FiLayers,
  FiMessageCircle,
  FiX,
  FiSearch,
  FiImage,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import GroupDropdownMenu from "../group-dropdown-menu";
import CreateGroupCard from "./create-group/create-group-card";
import CreateComminityGroup from "./comminity-group/create-comminity-group";
import AddExsistingComminity from "./create-existing-group/add-existing-comminity";
import defaultImage from "../../../../assets/img/logo.png";
import { getImageObjectUrl } from "../../../../api/service/image-service";
import { getAllUsersChats } from "../../../../redux/store/slices/chat/chat-thunks/get-all-users-chats";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const [activeView, setActiveView] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupImages, setGroupImages] = useState({});


  const dispatch = useAppDispatch();
  const allChatsState = useAppSelector(
    (state) => state.allUsersChat?.allChats
  );
  const allChats = allChatsState?.data;
  const groupChatState = useAppSelector(
    (state) => state.usersGroupChats?.groupChat
  );
const navigate = useNavigate();
  const createdGroup = groupChatState?.data;

  const handleCreateGroup = () => setActiveView("createGroup");
  const handleCreateCominityGroup = () => setActiveView("createCommunity");
  const handleAddExistingComminity = () => setActiveView("addCommunity");

  const handleShowAllGroups = () => {
    setSearchTerm("");
    setActiveView("existingGroups");
  };

  const handleCloseView = () => {
    setActiveView(null);
    setSearchTerm("");
  };

  // Grup oluşturulduğunda Existing Groups ekranını aç.
  const handleGroupCreated = () => {
    setSearchTerm("");
    setActiveView("existingGroups");
  };

  const viewDetails = {
    createGroup: {
      title: "Create New Group",
      description: "Create a group and invite your friends.",
    },
    createCommunity: {
      title: "Create Community",
      description: "Build your own community.",
    },
    addCommunity: {
      title: "Add Existing Community",
      description: "Join an existing community.",
    },
    existingGroups: {
      title: "Existing Groups",
      description: "View and manage your group conversations.",
    },
  };

  const quickActions = [
    {
      title: "Create Group",
      description: "Start a group conversation with your friends.",
      icon: FiUsers,
      color: "bg-primary-soft text-primary",
      action: handleCreateGroup,
    },
    {
      title: "Create Community",
      description: "Create a space for people with shared interests.",
      icon: FiGlobe,
      color: "bg-blue-100 text-blue-600",
      action: handleCreateCominityGroup,
    },
    {
      title: "Add Existing Community",
      description: "Connect with an existing community.",
      icon: FiUserPlus,
      color: "bg-purple-100 text-purple-600",
      action: handleAddExistingComminity,
    },
    {
      title: "Existing Groups",
      description: "See your existing group conversations.",
      icon: FiLayers,
      color: "bg-orange-100 text-orange-600",
      action: handleShowAllGroups,
    },
  ];

  const groups = useMemo(() => {
    if (!Array.isArray(allChats)) return [];

    return allChats.filter((chat) => chat?.isGroup === true);
  }, [allChats]);
  useEffect(() => {
    dispatch(getAllUsersChats());
  }, [dispatch]);

  useEffect(() => {
    let cancelled = false;
    const createdUrls = [];

    const loadImages = async () => {
      const entries = await Promise.all(
        groups.map(async (group) => {
          const imageId = group?.chatProfileImage;

          if (!imageId) {
            return [group.id, defaultImage];
          }

          try {
            const imageUrl = await getImageObjectUrl(imageId);

            if (imageUrl) {
              createdUrls.push(imageUrl);
              return [group.id, imageUrl];
            }

            return [group.id, defaultImage];
          } catch (error) {
            console.error("Group image could not be loaded:", error);
            return [group.id, defaultImage];
          }
        })
      );

      if (!cancelled) {
        setGroupImages((previous) => ({
          ...previous,
          ...Object.fromEntries(entries),
        }));
      } else {
        createdUrls.forEach((url) => URL.revokeObjectURL(url));
      }
    };

    loadImages();

    return () => {
      cancelled = true;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [groups]);

  const filteredGroups = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return groups;

    return groups.filter((group) =>
      (group?.chatName || "").toLowerCase().includes(search)
    );
  }, [groups, searchTerm]);

  const getMemberCount = (group) => group?.users?.length ?? 0;

  

const handleOpenGroup = (group) => {
    if (!group?.id) return;

    navigate(`/userHome?chatId=${group.id}`);
};

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex h-[calc(100vh-24px)] min-h-0 w-full max-w-7xl flex-col gap-4 overflow-hidden lg:h-[calc(100vh-48px)] lg:max-h-[950px] lg:flex-row">

        {/* LEFT SIDEBAR */}
        <aside className="w-full shrink-0 overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-sm lg:flex lg:w-80 lg:flex-col">
          <div className="mb-8 flex shrink-0 items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Workspace
              </p>
              <h2 className="mt-1 text-xl font-bold text-text-primary">
                Groups
              </h2>
            </div>

            <GroupDropdownMenu
              handleShowAllGroups={handleShowAllGroups}
              handleCreateGroup={handleCreateGroup}
              handleCreateCominityGroup={handleCreateCominityGroup}
              handleAddExistingComminity={handleAddExistingComminity}
            />
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleCloseView}
              className="flex w-full items-center gap-3 rounded-xl bg-primary-soft px-4 py-3 text-left text-sm font-semibold text-primary-dark"
            >
              <FiLayers size={18} />
              All Groups
            </button>

            <button
              type="button"
              onClick={handleShowAllGroups}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark"
            >
              <FiUsers size={18} />
              Existing Groups
              <span className="ml-auto rounded-full bg-background px-2 py-1 text-xs">
                {groups.length}
              </span>
            </button>
          </div>

          <div className="mt-6 shrink-0 border-t border-border pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">
                Quick Actions
              </h3>
              <FiPlus className="text-text-muted" />
            </div>

            <div className="space-y-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={item.action}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-background"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-muted">
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto shrink-0 rounded-2xl bg-primary-soft p-4">
            <div className="mb-2 flex items-center gap-2 text-primary-dark">
              <FiMessageCircle size={18} />
              <span className="text-sm font-bold">Stay Connected</span>
            </div>
            <p className="text-xs leading-5 text-text-secondary">
              Create groups and communities to stay connected with people.
            </p>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">

          {activeView ? (
            <>
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={handleCloseView}
                    className="mb-3 flex items-center gap-2 text-sm font-medium text-text-muted transition hover:text-primary"
                  >
                    <FiArrowLeft size={16} />
                    Back
                  </button>

                  <h1 className="text-2xl font-bold text-text-primary">
                    {viewDetails[activeView]?.title}
                  </h1>

                  <p className="mt-1 text-sm text-text-muted">
                    {viewDetails[activeView]?.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseView}
                  aria-label="Close view"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-text-secondary transition hover:bg-primary-soft hover:text-primary"
                >
                  <FiX size={20} />
                </button>
              </div>

              {activeView === "createGroup" && (
                <CreateGroupCard onGroupCreated={handleGroupCreated} />
              )}

              {activeView === "createCommunity" && (
                <CreateComminityGroup />
              )}

              {activeView === "addCommunity" && (
                <AddExsistingComminity />
              )}

              {activeView === "existingGroups" && (
                <section>
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1">
                      <FiSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                        size={18}
                      />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) =>
                          setSearchTerm(event.target.value)
                        }
                        placeholder="Search groups..."
                        className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-text-primary outline-none transition focus:border-primary"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateGroup}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <FiPlus size={17} />
                      Create Group
                    </button>
                  </div>

                  {filteredGroups.length > 0 ? (
                    <div className="space-y-3">
                      {filteredGroups.map((group) => (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => handleOpenGroup(group)}
                          className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left transition hover:border-primary/30 hover:bg-primary-soft/30 hover:shadow-sm"
                        >
                          <img
                            src={groupImages[group.id] || defaultImage}
                            alt={group.chatName || "Group"}
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                            onError={(event) => {
                              event.currentTarget.src = defaultImage;
                            }}
                          />

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-bold text-text-primary transition group-hover:text-primary">
                              {group.chatName || "Unnamed Group"}
                            </h3>
                            <p className="mt-1 text-xs text-text-muted">
                              {getMemberCount(group)} members
                            </p>
                          </div>

                          <FiUsers
                            size={18}
                            className="shrink-0 text-text-muted transition group-hover:text-primary"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                        <FiUsers size={30} />
                      </div>

                      <h3 className="text-lg font-bold text-text-primary">
                        No Groups Found
                      </h3>

                      <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
                        {searchTerm
                          ? "No groups match your search."
                          : "You haven't created any groups yet. Create your first group to get started."}
                      </p>

                      {!searchTerm && (
                        <button
                          type="button"
                          onClick={handleCreateGroup}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          <FiPlus size={17} />
                          Create Group
                        </button>
                      )}
                    </div>
                  )}
                </section>
              )}
            </>
          ) : (
            <>
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-dark">
                  <FiUsers size={14} />
                  Group Workspace
                </span>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  Manage Your Groups
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
                  Create groups, build communities and manage your
                  conversations in one place.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">
                      Existing Groups
                    </span>
                    <FiUsers className="text-primary" size={21} />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-text-primary">
                    {groups.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">
                      Group Management
                    </span>
                    <FiLayers className="text-primary" size={21} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-text-primary">
                    All in one place
                  </p>
                </div>
              </div>

              <h2 className="mb-5 text-lg font-bold text-text-primary">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickActions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={item.action}
                      className="group rounded-2xl border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
                      >
                        <Icon size={23} />
                      </span>

                      <h3 className="mt-5 text-base font-bold text-text-primary transition group-hover:text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-text-muted">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiImage size={22} />
                </div>

                <h3 className="font-bold text-text-primary">
                  Your Group Space
                </h3>

                <p className="mt-2 text-sm text-text-muted">
                  Your group conversations will be available here.
                </p>

                <button
                  type="button"
                  onClick={handleShowAllGroups}
                  className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Existing Groups
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Group;
