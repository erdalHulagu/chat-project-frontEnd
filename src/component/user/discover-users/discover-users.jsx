
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiSearch,
  FiX,
  FiUserPlus,
  FiUser,
  FiCheck,
  FiLoader,
} from "react-icons/fi";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/hooks";

import {
  searchUsers,
} from "../../../redux/store/slices/user/user/serachUser/user-search-action";

import {
  clearSearchResults,
} from "../../../redux/store/slices/user/user/serachUser/user-search-slice";

import {
  getUser,
  addUserAsFriend,
} from "../../../api/service/user-service";

import {
  loginSuccess,
} from "../../../redux/store/slices/user/auth/auth-slice";

const DEFAULT_IMAGE = require("../../../assets/img/user.webp");

const DiscoverUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const searchResults = useAppSelector(
    (state) => state.userSearch.searchResults
  );

  const loading = useAppSelector(
    (state) => state.userSearch.loading
  );

  const searchError = useAppSelector(
    (state) => state.userSearch.error
  );

  const [search, setSearch] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [addedIds, setAddedIds] = useState([]);

  // ID değerlerini tek tip string olarak karşılaştır
  const getPersonId = (person) =>
    String(
      person?.id ||
      person?._id ||
      person?.userId ||
      ""
    );

  // Mevcut arkadaşların ID'leri
  const existingFriendIds = (user?.friends || []).map((friend) =>
    String(
      friend.id ||
      friend._id ||
      friend.userId ||
      friend.friendId ||
      ""
    )
  );

  // Kullanıcı arama
  useEffect(() => {
    const value = search.trim();

    if (!value) {
      dispatch(clearSearchResults());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchUsers({ firstName: value }));
    }, 350);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  // Kendimizi arama sonuçlarından çıkar
  const displayedUsers = (
    Array.isArray(searchResults) ? searchResults : []
  ).filter((person) => {
    return getPersonId(person) !== getPersonId(user);
  });

  // Aramayı temizle
  const handleClearSearch = () => {
    setSearch("");
    dispatch(clearSearchResults());
  };

  // Profil görüntüleme
  const handleViewProfile = (person) => {
    const normalizedPerson = {
      ...person,
      id: person.id || person._id || person.userId,
      name:
        person.firstName ||
        person.name ||
        person.username ||
        "Kullanıcı",
      lastname:
        person.lastName ||
        person.lastname ||
        "",
      image:
        person.image ||
        person.profileImage ||
        person.profilePicture ||
        person.imageUrl ||
        DEFAULT_IMAGE,
    };

    navigate("/friendProfile", {
      state: {
        friend: normalizedPerson,
      },
    });
  };

  // Arkadaş ekleme
//   const handleAddFriend = async (person) => {
//     const personId = getPersonId(person);

//     if (!personId || addingId) return;

//     // Zaten arkadaşsa tekrar istek gönderme
//     if (
//       existingFriendIds.includes(personId) ||
//       addedIds.includes(personId)
//     ) {
//       return;
//     }

//     try {
//       setAddingId(personId);

//       // 1. Arkadaş ekleme API isteği
//       await addUserAsFriend(personId);

//       // 2. Güncel kullanıcı profilini getir
//       const response = await getUser();

//       // 3. API'den gelen kullanıcı verisini al
//       const updatedUser = response.data;

//       if (!updatedUser || typeof updatedUser !== "object") {
//         throw new Error("Güncel kullanıcı bilgileri alınamadı.");
//       }

//       // 4. Redux kullanıcı bilgisini güncelle
//       dispatch(loginSuccess(updatedUser));

//       // 5. Buton durumunu güncelle
//       setAddedIds((previous) =>
//         previous.includes(personId)
//           ? previous
//           : [...previous, personId]
//       );

//     } catch (error) {
//       console.error(
//         "Arkadaş eklenirken hata oluştu:",
//         error.response?.data || error
//       );
//     } finally {
//       setAddingId(null);
//     }
//   };

const handleAddFriend = async (person) => {
  const personId = person.id || person._id || person.userId;

  if (!personId || addingId) return;

  try {
    setAddingId(String(personId));

    console.log("Arkadaş eklenecek kullanıcı ID:", personId);

    // Arkadaş ekleme isteği
    const addResponse = await addUserAsFriend(personId);

    console.log("Arkadaş ekleme API cevabı:", addResponse.data);

    // Güncel kullanıcı bilgisi
    const userResponse = await getUser();

    console.log("Güncel profil API cevabı:", userResponse.data);

    const updatedUser = userResponse.data;

    console.log("Gelen arkadaş listesi:", updatedUser.friends);

    // Redux güncelle
    dispatch(loginSuccess(updatedUser));

    // Buton güncelle
    setAddedIds((prev) => [
      ...prev,
      String(personId),
    ]);

  } catch (error) {
    console.error("ARKADAŞ EKLEME HATASI:", error);
    console.error("API HATA CEVABI:", error.response?.data);
  } finally {
    setAddingId(null);
  }
};
  // Arkadaşlık kontrolü
  const isFriend = (person) => {
    const personId = getPersonId(person);

    return (
      existingFriendIds.includes(personId) ||
      addedIds.includes(personId)
    );
  };

  return (
    <main className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-background p-3 sm:p-5">

      <section className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-slate-200/50">

        {/* HEADER */}
        <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-4 sm:px-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition hover:bg-primary hover:text-white"
            aria-label="Geri dön"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-text sm:text-xl">
              Arkadaş Bul
            </h1>

            <p className="mt-1 text-xs text-text-secondary">
              Yeni insanları keşfet ve arkadaşlarına ekle.
            </p>
          </div>

          <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary sm:flex">
            <FiUserPlus size={22} />
          </div>
        </header>

        {/* SEARCH */}
        <div className="shrink-0 border-b border-border bg-surface px-4 py-4 sm:px-6">

          <div className="relative">
            <FiSearch
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="İsim veya kullanıcı adı ara..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-11 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-text-muted hover:bg-primary-soft hover:text-primary"
                aria-label="Aramayı temizle"
              >
                <FiX size={19} />
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-text-secondary">
              {search.trim()
                ? "Arama sonuçları"
                : "Kullanıcı aramaya başla"}
            </p>

            {search.trim() && !loading && (
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                {displayedUsers.length} kullanıcı
              </span>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 custom-scrollbar sm:p-5">

          {!search.trim() ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <FiSearch size={28} />
              </div>

              <h2 className="font-bold text-text">
                Yeni arkadaşlar keşfet
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                Arkadaş olarak eklemek veya profillerini incelemek istediğin
                kişiyi arama alanından bulabilirsin.
              </p>
            </div>

          ) : loading ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center">
              <FiLoader className="animate-spin text-primary" size={30} />

              <p className="mt-3 text-sm text-text-secondary">
                Kullanıcılar aranıyor...
              </p>
            </div>

          ) : searchError ? (
            <div className="py-12 text-center">
              <p className="font-semibold text-danger">
                Kullanıcılar yüklenemedi.
              </p>

              <p className="mt-2 text-sm text-text-secondary">
                Lütfen tekrar deneyin.
              </p>
            </div>

          ) : displayedUsers.length === 0 ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
              <FiUser size={30} className="text-text-muted" />

              <p className="mt-3 font-semibold text-text">
                Kullanıcı bulunamadı
              </p>

              <p className="mt-1 text-sm text-text-secondary">
                Başka bir isimle arama yapmayı dene.
              </p>
            </div>

          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

              {displayedUsers.map((person) => {
                const personId = getPersonId(person);

                const friendAdded = isFriend(person);
                const isAdding = addingId === personId;

                const personName =
                  person.firstName ||
                  person.name ||
                  person.username ||
                  "Kullanıcı";

                const personLastName =
                  person.lastName ||
                  person.lastname ||
                  "";

                const personImage =
                  person.image ||
                  person.profileImage ||
                  person.profilePicture ||
                  person.imageUrl ||
                  DEFAULT_IMAGE;

                return (
                  <article
                    key={personId}
                    className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center"
                  >

                    {/* USER INFO */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">

                      <img
                        src={personImage}
                        alt={personName}
                        onError={(event) => {
                          event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                        className="h-14 w-14 shrink-0 rounded-2xl border border-border object-cover"
                      />

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-text">
                          {personName} {personLastName}
                        </h3>

                        <p className="mt-1 truncate text-xs text-text-secondary">
                          {person.email || person.username || "Kullanıcı"}
                        </p>

                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-1 text-[10px] font-semibold text-primary">
                          <FiUser size={11} />
                          Kullanıcı
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex shrink-0 gap-2 sm:flex-col">

                      <button
                        type="button"
                        onClick={() => handleViewProfile(person)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-text-secondary transition hover:border-primary hover:bg-primary-soft hover:text-primary sm:flex-none"
                      >
                        <FiUser size={15} />
                        Profili Görüntüle
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddFriend(person)}
                        disabled={
                          friendAdded ||
                          isAdding ||
                          Boolean(addingId)
                        }
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:flex-none ${
                          friendAdded
                            ? "cursor-default bg-primary-soft text-primary"
                            : "bg-primary text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                        }`}
                      >
                        {isAdding ? (
                          <FiLoader
                            className="animate-spin"
                            size={15}
                          />
                        ) : friendAdded ? (
                          <FiCheck size={15} />
                        ) : (
                          <FiUserPlus size={15} />
                        )}

                        {isAdding
                          ? "Ekleniyor..."
                          : friendAdded
                          ? "Arkadaş Eklendi"
                          : "Arkadaş Ekle"}
                      </button>

                    </div>
                  </article>
                );
              })}

            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DiscoverUsers;
