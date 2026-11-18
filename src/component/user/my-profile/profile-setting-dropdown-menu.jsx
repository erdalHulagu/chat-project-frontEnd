import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
} from "../../../redux/store/hooks";

import {
  logout,
} from "../../../redux/store/slices/user/auth/auth-slice";

import {
  encryptedLocalStorage,
} from "../../../helper/auth-token/encrypt-storage";

const ProfileSettingDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/updateProfile");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    encryptedLocalStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        id="profile-settings-dropdown"
        className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <span className="mr-2">⚙</span>
        Ayarlar
      </Dropdown.Toggle>

      <Dropdown.Menu className="mt-2 min-w-[190px] rounded-xl border border-gray-100 p-2 shadow-lg">
        <Dropdown.Item
          onClick={handleEditProfile}
          className="rounded-lg px-3 py-2 text-sm"
        >
          Profili düzenle
        </Dropdown.Item>

        <Dropdown.Item
          onClick={handleHome}
          className="rounded-lg px-3 py-2 text-sm"
        >
          Ana sayfa
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          onClick={handleLogout}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600"
        >
          Çıkış yap
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileSettingDropdownMenu;