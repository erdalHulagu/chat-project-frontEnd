
import React, { useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiPlus,
  FiGlobe,
  FiMessageCircle,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiLayers,
  FiSearch,
  FiX,
} from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { getAllUsersChats } from "../../../../redux/store/slices/chat/chat-thunks/get-all-users-chats";
import { useNavigate } from "react-router-dom";

import CreateGroupCard from "./create-group/create-group-card";
import CreateComminityGroup from "./comminity-group/create-comminity-group";
import AddExsistingComminity from "./create-existing-group/add-existing-comminity";

import {
  createCommunity,
  getAllCommunities,
  addGroupToCommunity,
  getCommunityGroups,
  removeGroupFromCommunity,
  updateCommunity,
  deleteCommunity,
} from "../../../../api/service/community_service";

import { uploadImage } from "../../../../api/service/image-service";

const Group = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allChatsState = useAppSelector(
    (state) => state.allUsersChat?.allChats
  );

  const allChats = allChatsState?.data;

  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityGroups, setCommunityGroups] = useState([]);

  const [activeSection, setActiveSection] = useState("groups");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editingCommunity, setEditingCommunity] = useState(null);
  const [editCommunityName, setEditCommunityName] = useState("");
  const [editCommunityDescription, setEditCommunityDescription] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Grup sohbetlerini getir
  useEffect(() => {
    dispatch(getAllUsersChats());
  }, [dispatch]);

  // Yalnızca grup sohbetlerini al
  const groups = useMemo(() => {
    if (!Array.isArray(allChats)) return [];

    return allChats.filter((chat) => chat?.isGroup === true);
  }, [allChats]);

  // Community listesini getir
  const loadCommunities = async () => {
    try {
      const response = await getAllCommunities();
      setCommunities(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("Community listesi alınamadı:", error);
      setErrorMessage("Community listesi yüklenemedi.");
    }
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  // Community oluştur
  const handleCreateCommunity = async (communityData) => {
    try {
      setLoading(true);
      setErrorMessage("");

      let imageId = null;

      if (communityData.image) {
        const imageResponse = await uploadImage(communityData.image);
        imageId = imageResponse.data?.imageId;
      }

      const payload = {
        communityName: communityData.communityName,
        description: communityData.description,
        image: imageId,
      };

      await createCommunity(payload);

      await loadCommunities();

      setActiveSection("communities");
    } catch (error) {
      console.error("Community oluşturulamadı:", error);

      throw new Error(
        error?.response?.data?.message ||
        "Community oluşturulurken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Community düzenleme ekranını aç
  const handleStartEditCommunity = (community) => {
    setEditingCommunity(community);
    setEditCommunityName(community.communityName || "");
    setEditCommunityDescription(community.description || "");
    setErrorMessage("");
  };

  // Community güncelle
  const handleUpdateCommunity = async (event) => {
    event.preventDefault();

    if (!editingCommunity?.id || !editCommunityName.trim()) {
      setErrorMessage("Community adı boş olamaz.");
      return;
    }

    try {
      setEditLoading(true);
      setErrorMessage("");

      await updateCommunity(editingCommunity.id, {
        communityName: editCommunityName.trim(),
        description: editCommunityDescription.trim(),
        image: editingCommunity.image || null,
      });

      await loadCommunities();

      if (selectedCommunity?.id === editingCommunity.id) {
        setSelectedCommunity((previous) => ({
          ...previous,
          communityName: editCommunityName.trim(),
          description: editCommunityDescription.trim(),
        }));
      }

      setEditingCommunity(null);
    } catch (error) {
      console.error("Community güncellenemedi:", error);

      setErrorMessage(
        error?.response?.data?.message ||
        "Community güncellenirken hata oluştu."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // Community sil
  const handleDeleteCommunity = async (community) => {
    const confirmed = window.confirm(
      `"${community.communityName}" Community'sini silmek istediğine emin misin?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setErrorMessage("");

      await deleteCommunity(community.id);

      setCommunities((previous) =>
        previous.filter((item) => item.id !== community.id)
      );

      if (selectedCommunity?.id === community.id) {
        setSelectedCommunity(null);
        setCommunityGroups([]);
        setActiveSection("communities");
      }
    } catch (error) {
      console.error("Community silinemedi:", error);

      setErrorMessage(
        error?.response?.data?.message ||
        "Community silinirken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Community seç ve gruplarını getir
  const handleSelectCommunity = async (community) => {
    try {
      setLoading(true);
      setErrorMessage("");

      setSelectedCommunity(community);

      const response = await getCommunityGroups(community.id);

      setCommunityGroups(
        Array.isArray(response.data) ? response.data : []
      );

      setActiveSection("communityGroups");
    } catch (error) {
      console.error("Community grupları alınamadı:", error);

      setErrorMessage(
        "Community grupları yüklenirken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Seçilen grupları Community'ye ekle
  const handleAddGroups = async (selectedGroups) => {
    if (!selectedCommunity?.id) {
      throw new Error("Önce bir Community seçmelisin.");
    }

    try {
      setLoading(true);

      for (const group of selectedGroups) {
        await addGroupToCommunity(
          group.id,
          selectedCommunity.id
        );
      }

      const response = await getCommunityGroups(
        selectedCommunity.id
      );

      setCommunityGroups(response.data || []);
      setActiveSection("communityGroups");
    } catch (error) {
      console.error("Gruplar eklenemedi:", error);

      throw new Error(
        error?.response?.data?.message ||
        "Gruplar Community'ye eklenirken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Grubu Community'den çıkar
  const handleRemoveGroup = async (chatId) => {
    if (!selectedCommunity?.id) return;

    const confirmed = window.confirm(
      "Bu grubu Community'den çıkarmak istediğine emin misin?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setErrorMessage("");

      await removeGroupFromCommunity(chatId);

      const response = await getCommunityGroups(
        selectedCommunity.id
      );

      setCommunityGroups(response.data || []);
    } catch (error) {
      console.error("Grup çıkarılamadı:", error);

      setErrorMessage(
        error?.response?.data?.message ||
        "Grup Community'den çıkarılırken hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Grup sohbetini aç
  const handleOpenGroup = (group) => {
    navigate(`/userHome?chatId=${group.id}`);
  };

  // Ana ekrana dön
  const handleBack = () => {
    setErrorMessage("");
    setActiveSection("groups");
  };

  const filteredGroups = groups.filter((group) =>
    (group.chatName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-background px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-text sm:text-3xl">
              Groups & Communities
            </h1>

            <p className="mt-2 text-sm text-text-muted">
              Manage your group chats and communities.
            </p>
          </div>

          {activeSection !== "groups" && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 self-start rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-background"
            >
              <FiArrowLeft />
              Geri
            </button>
          )}
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            <span>{errorMessage}</span>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
              aria-label="Hata mesajını kapat"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* MAIN MENU */}
        {activeSection === "groups" && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <button
                type="button"
                onClick={() => setActiveSection("createGroup")}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiUsers size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-text">
                    Create Group
                  </h3>

                  <p className="mt-1 text-xs text-text-muted">
                    Yeni grup sohbeti oluştur.
                  </p>
                </div>

                <FiPlus className="ml-auto text-text-muted transition group-hover:text-primary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("createCommunity")}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiGlobe size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-text">
                    Create Community
                  </h3>

                  <p className="mt-1 text-xs text-text-muted">
                    Yeni bir Community oluştur.
                  </p>
                </div>

                <FiPlus className="ml-auto text-text-muted transition group-hover:text-primary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("communities")}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FiLayers size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-text">
                    My Communities
                  </h3>

                  <p className="mt-1 text-xs text-text-muted">
                    Community listeni görüntüle.
                  </p>
                </div>

                <FiPlus className="ml-auto text-text-muted transition group-hover:text-primary" />
              </button>
            </div>

            {/* GROUP LIST */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-lg font-bold text-text">
                    My Groups
                  </h2>

                  <p className="mt-1 text-xs text-text-muted">
                    {groups.length} grup sohbeti
                  </p>
                </div>

                <div className="relative w-full sm:max-w-xs">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Grup ara..."
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-text outline-none focus:border-primary"
                  />
                </div>
              </div>

              {filteredGroups.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border py-12 text-center">
                  <FiUsers className="mx-auto mb-3 text-text-muted" size={35} />

                  <p className="font-semibold text-text">
                    Grup bulunamadı.
                  </p>

                  <p className="mt-1 text-sm text-text-muted">
                    Henüz grubun yok veya aramana uygun grup bulunamadı.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {filteredGroups.map((group) => (
                    <button
                      type="button"
                      key={group.id}
                      onClick={() => handleOpenGroup(group)}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-left transition hover:border-primary hover:shadow-sm"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <FiMessageCircle size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-text">
                          {group.chatName || "İsimsiz grup"}
                        </h3>

                        <p className="mt-1 text-xs text-text-muted">
                          <FiUsers className="mr-1 inline" />
                          {group.users?.length || 0} üye
                        </p>
                      </div>
                    </button>
                  ))}

                </div>
              )}
            </div>
          </>
        )}

        {/* CREATE GROUP */}
        {activeSection === "createGroup" && (
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text">
                Create Group
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Yeni bir grup sohbeti oluştur.
              </p>
            </div>

            <CreateGroupCard
              onGroupCreated={() => {
                dispatch(getAllUsersChats());
                setActiveSection("groups");
              }}
            />
          </div>
        )}

        {/* CREATE COMMUNITY */}
        {activeSection === "createCommunity" && (
          <div>
            <CreateComminityGroup
              onSave={handleCreateCommunity}
            />
          </div>
        )}

        {/* COMMUNITY LIST */}
        {activeSection === "communities" && (
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text">
                  My Communities
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                  Oluşturduğun Community listesi.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveSection("createCommunity")}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                <FiPlus />
                <span className="hidden sm:inline">
                  Create
                </span>
              </button>
            </div>

            {loading ? (
              <p className="py-8 text-center text-sm text-text-muted">
                Yükleniyor...
              </p>
            ) : communities.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-12 text-center">
                <FiGlobe className="mx-auto mb-3 text-text-muted" size={35} />

                <p className="font-semibold text-text">
                  Henüz Community oluşturmadın.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveSection("createCommunity")}
                  className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Community Oluştur
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {communities.map((community) => (
                  <div
                    key={community.id}
                    className="rounded-xl border border-border bg-background p-5 transition hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <button
                        type="button"
                        onClick={() => handleSelectCommunity(community)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                          <FiGlobe size={22} />
                        </div>

                        <h3 className="font-bold text-text">
                          {community.communityName}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-text-muted">
                          {community.description || "Açıklama bulunmuyor."}
                        </p>

                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          Community'yi Görüntüle
                          <FiArrowLeft className="rotate-180" />
                        </span>
                      </button>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          title="Düzenle"
                          onClick={() => handleStartEditCommunity(community)}
                          className="rounded-lg border border-border p-2 text-text-secondary transition hover:bg-surface hover:text-primary"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          type="button"
                          title="Sil"
                          disabled={loading}
                          onClick={() => handleDeleteCommunity(community)}
                          className="rounded-lg border border-red-200 p-2 text-danger transition hover:bg-red-50 disabled:opacity-50"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        )}

        {/* COMMUNITY DETAIL */}
        {activeSection === "communityGroups" && selectedCommunity && (
          <div className="space-y-6">

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <FiGlobe size={24} />
                  </div>

                  <h2 className="text-2xl font-bold text-text">
                    {selectedCommunity.communityName}
                  </h2>

                  <p className="mt-2 text-sm text-text-secondary">
                    {selectedCommunity.description || "Community açıklaması bulunmuyor."}
                  </p>

                  <p className="mt-3 text-xs text-text-muted">
                    {communityGroups.length} grup
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSection("addGroups")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <FiPlus />
                  Mevcut Grup Ekle
                </button>

              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">

              <h3 className="mb-5 text-lg font-bold text-text">
                Community Grupları
              </h3>

              {loading ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  Gruplar yükleniyor...
                </p>
              ) : communityGroups.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border py-12 text-center">
                  <FiUsers className="mx-auto mb-3 text-text-muted" size={35} />

                  <p className="font-semibold text-text">
                    Bu Community içerisinde henüz grup yok.
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveSection("addGroups")}
                    className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    İlk Grubunu Ekle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {communityGroups.map((group) => (
                    <div
                      key={group.id}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div
                        onClick={() =>
                          setActiveGroupId(
                            activeGroupId === group.id ? null : group.id
                          )
                        }
                        className="flex cursor-pointer items-center justify-between gap-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <FiUsers size={22} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-gray-800">
                              {group.chatName || group.groupName || group.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {group.users?.length || 0} üye
                            </p>
                          </div>
                        </div>

                        <FiArrowLeft
                          className={`shrink-0 rotate-180 text-gray-400 transition-transform ${activeGroupId === group.id ? "rotate-90" : ""
                            }`}
                        />
                      </div>

                      {activeGroupId === group.id && (
                        <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                          <button
                            onClick={() => handleOpenGroup(group)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                          >
                            <FiMessageCircle size={17} />
                            Mesaj
                          </button>

                          <button
                            onClick={() => handleRemoveGroup(group.id)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            title="Community'den çıkar"
                          >
                            <FiTrash2 size={17} />
                            <span>Çıkar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveSection("communities")}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-background"
            >
              <FiArrowLeft />
              Community Listesine Dön
            </button>

          </div>
        )}

        {/* ADD EXISTING GROUPS */}
        {activeSection === "addGroups" && selectedCommunity && (
          <div className="space-y-5">

            <div className="rounded-xl border border-border bg-surface p-4">
              <h2 className="font-bold text-text">
                {selectedCommunity.communityName}
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Bu Community'ye eklemek istediğin grupları seç.
              </p>
            </div>

            <AddExsistingComminity
              groups={groups}
              communityId={selectedCommunity.id}
              onSave={handleAddGroups}
            />

            <button
              type="button"
              onClick={() => setActiveSection("communityGroups")}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary"
            >
              <FiArrowLeft />
              Community'ye Geri Dön
            </button>
          </div>
        )}

      </div>

      {/* EDIT COMMUNITY MODAL */}
      {editingCommunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget && !editLoading) {
              setEditingCommunity(null);
            }
          }}
        >
          <form
            onSubmit={handleUpdateCommunity}
            className="w-full max-w-lg space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text">
                Community Düzenle
              </h3>

              <button
                type="button"
                onClick={() => setEditingCommunity(null)}
                disabled={editLoading}
                className="rounded-lg p-2 text-text-muted hover:bg-background"
              >
                <FiX size={20} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Community Adı
              </label>

              <input
                type="text"
                maxLength={60}
                value={editCommunityName}
                onChange={(event) =>
                  setEditCommunityName(event.target.value)
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Açıklama
              </label>

              <textarea
                maxLength={500}
                rows={4}
                value={editCommunityDescription}
                onChange={(event) =>
                  setEditCommunityDescription(event.target.value)
                }
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingCommunity(null)}
                disabled={editLoading}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary"
              >
                İptal
              </button>

              <button
                type="submit"
                disabled={editLoading || !editCommunityName.trim()}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {editLoading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Group;
