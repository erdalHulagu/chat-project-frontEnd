
import React, { useState } from "react";
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

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setIsOpen(false);

    try {
      const confirmed = await question();

      if (!confirmed) return;

      encryptedLocalStorage.removeItem("token");
      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
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
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 sm:h-11 sm:w-11 ${
          isOpen
            ? "border-indigo-200 bg-indigo-100 text-indigo-800 shadow-inner"
            : "border-transparent bg-transparent text-indigo-950 hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
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

          <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-950/20">
            {/* Menu header */}
            <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-900 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                  <FiSettings size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Account settings
                  </p>
                  <p className="mt-0.5 text-xs text-indigo-200">
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
                  onClick={() => handleNavigate(item.path)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-800"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 transition group-hover:bg-indigo-100">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-indigo-100 bg-slate-50 p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition group-hover:bg-red-100">
                  <FiLogOut size={18} />
                </span>

                <span>Log out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHomeDropDownMenu;
