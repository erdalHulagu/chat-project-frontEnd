import React, { useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ProfileSettingDropdownMenu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="relative z-30">
            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                aria-label="Profile settings"
                aria-expanded={isOpen}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/15"
            >
                <RiUserSettingsFill size={25} />
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-10 cursor-default"
                    />

                    <div className="absolute right-0 top-14 z-20 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => handleNavigate("/updateProfile")}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-800"
                        >
                            Edit Profile
                        </button>

                        <button
                            type="button"
                            onClick={() => handleNavigate("/userHome")}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-800"
                        >
                            Home
                        </button>

                        <button
                            type="button"
                            onClick={() => handleNavigate("/")}
                            className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileSettingDropdownMenu;
