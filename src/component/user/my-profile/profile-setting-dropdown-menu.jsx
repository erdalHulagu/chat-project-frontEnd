
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSettings,
  FiUser,
  FiHome,
  FiLogOut,
} from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { logout } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";

const ProfileSettingDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
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

  const menuItemClass =
    "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-primary-soft hover:text-primary-dark";

  return (
    <div ref={menuRef} className="relative z-50">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Ayarlar menüsünü aç"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          isOpen
            ? "border-primary/20 bg-primary-soft text-primary-dark shadow-inner"
            : "border-border bg-surface text-primary-dark shadow-sm hover:border-primary hover:bg-primary hover:text-white"
        }`}
      >
        <FiSettings size={18} />
        <span>Ayarlar</span>
      </button>

      {isOpen && (
        <>
          {/* Dropdown menu */}
          <div
            className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-slate-900/10"
            role="menu"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                  <FiSettings size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Hesap ayarları
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    Profilini ve hesabını yönet
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation items */}
            <div className="space-y-1 p-2">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleNavigate("/updateProfile")}
                className={menuItemClass}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <FiUser size={18} />
                </span>

                <span>Profili düzenle</span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => handleNavigate("/")}
                className={menuItemClass}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <FiHome size={18} />
                </span>

                <span>Ana sayfa</span>
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-border bg-background/70 p-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-danger transition-all duration-200 hover:bg-red-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-danger transition-colors group-hover:bg-danger group-hover:text-white">
                  <FiLogOut size={18} />
                </span>

                <span>Çıkış yap</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettingDropdownMenu;
