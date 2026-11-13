
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsArrowDownSquareFill,
} from "react-icons/bs";
import {
  FiUser,
  FiUsers,
  FiActivity,
  FiLogOut,
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

  return (
    <div className="relative z-30">

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition sm:h-11 sm:w-11 ${
          isOpen
            ? "bg-indigo-100 text-indigo-700"
            : "text-indigo-900 hover:bg-indigo-50 hover:text-indigo-600"
        }`}
      >
        <BsArrowDownSquareFill size={21} />
      </button>

      {isOpen && (
        <>
          {/* Mobilde menünün dışına dokununca kapat */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />

          <div className="absolute right-0 top-14 z-40 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl">

            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-800">
                Account settings
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Manage your account
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("/profile")}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              <FiUser size={18} />
              Profile
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/group")}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              <FiUsers size={18} />
              Groups
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/status")}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              <FiActivity size={18} />
              Status
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <FiLogOut size={18} />
              Log out
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default UserHomeDropDownMenu;
