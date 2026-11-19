import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsArrowDownSquareFill } from "react-icons/bs";
import {
  FiUser,
  FiUsers,
  FiActivity,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { logout } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { question } from "../../../helper/swal";

const UserHomeDropDownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsOpen(false);

    try {
      const confirmed = await question();

      if (!confirmed) return;

      setIsLoggingOut(true);

      encryptedLocalStorage.removeItem("token");
      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      label: "Profile",
      icon: <FiUser size={18} />,
      path: "/profile",
    },
    {
      label: "Groups",
      icon: <FiUsers size={18} />,
      path: "/group",
    },
    {
      label: "Status",
      icon: <FiActivity size={18} />,
      path: "/status",
    },
  ];

  return (
    <div className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 sm:h-11 sm:w-11 ${
          isOpen
            ? "border-primary/20 bg-primary-soft text-primary shadow-inner"
            : "border-transparent bg-transparent text-primary-dark hover:border-primary/10 hover:bg-primary-soft"
        }`}
      >
        <BsArrowDownSquareFill size={21} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-slate-900/10"
            role="menu"
          >
            {/* Menu header */}
            <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                  <FiSettings size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Account settings
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    Manage your account
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation items */}
            <div className="p-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  role="menuitem"
                  onClick={() => handleNavigate(item.path)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-primary-soft hover:text-primary-dark"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-border bg-background/70 p-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-danger transition-all duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-danger transition-colors group-hover:bg-danger group-hover:text-white">
                  <FiLogOut size={18} />
                </span>

                <span>
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHomeDropDownMenu;