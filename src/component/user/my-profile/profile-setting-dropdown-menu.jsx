import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSettings,
  FiUser,
  FiHome,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { logout } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";

const ProfileSettingDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    encryptedLocalStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const itemClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark";

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Profil ayarları"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
          isOpen
            ? "border-primary/30 bg-primary-soft text-primary-dark"
            : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-primary"
        }`}
      >
        <FiSettings size={17} />
        <span className="hidden sm:inline">Ayarlar</span>
        <FiChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-slate-900/10"
        >
          <div className="rounded-xl bg-primary-soft px-3 py-3">
            <p className="text-sm font-bold text-primary-dark">
              Hesap ayarları
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Hesabınızı yönetin
            </p>
          </div>

          <div className="mt-2 space-y-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleNavigate("/updateProfile")}
              className={itemClass}
            >
              <FiUser size={17} />
              Profili düzenle
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleNavigate("/")}
              className={itemClass}
            >
              <FiHome size={17} />
              Ana sayfa
            </button>
          </div>

          <div className="mt-2 border-t border-border pt-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-danger transition hover:bg-red-50"
            >
              <FiLogOut size={17} />
              Çıkış yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingDropdownMenu;