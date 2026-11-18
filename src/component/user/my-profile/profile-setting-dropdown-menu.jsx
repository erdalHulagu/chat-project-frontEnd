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
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#075E45] shadow-sm transition hover:border-[#075E45] hover:bg-[#075E45] hover:text-white"
            >
                <span className="mr-2">⚙</span>
                Ayarlar
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 min-w-[200px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <Dropdown.Item
                    onClick={handleEditProfile}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-[#075E45]"
                >
                    Profili düzenle
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={handleHome}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-[#075E45]"
                >
                    Ana sayfa
                </Dropdown.Item>

                <Dropdown.Divider className="border-slate-200" />

                <Dropdown.Item
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
                >
                    Çıkış yap
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileSettingDropdownMenu;