
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { IoIosHome } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { logout } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { question } from "../../../helper/swal";
import HomePages from "../../../page/user/main-page";

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleHome = () => navigate("/userHome");
    const handleProfile = () => navigate("/profile");

    const handleSignOut = async () => {
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

    const isActive = (path) => location.pathname === path;

    const navClass = (path) =>
        `flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-4 ${
            isActive(path)
                ? "bg-white/20 text-white shadow-inner"
                : "text-indigo-100 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <div className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-white">

            {/* HEADER */}
            <header className="relative z-20 shrink-0 border-b border-white/10 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 shadow-xl">
                <div className="flex min-h-20 w-full items-center justify-between gap-3 px-3 py-3 sm:px-5 md:min-h-24 md:px-8 lg:px-10">

                    {/* LOGO */}
                    <button
                        type="button"
                        onClick={handleHome}
                        className="flex min-w-0 items-center gap-2.5 text-left sm:gap-3"
                        aria-label="Go to home"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 shadow-lg sm:h-14 sm:w-14">
                            <img
                                className="h-full w-full rounded-full object-cover"
                                src={require("../../../assets/img/logo.png")}
                                alt="Furqan logo"
                            />
                        </div>

                        <div className="min-w-0">
                            <span className="block truncate text-sm font-bold tracking-wide text-white sm:text-base md:text-lg">
                                Furqan Worldwide
                            </span>

                            <span className="hidden text-xs tracking-[0.18em] text-indigo-200 sm:block">
                                CONNECTION
                            </span>
                        </div>
                    </button>

                    {/* NAVIGATION */}
                    <nav
                        className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3"
                        aria-label="Main navigation"
                    >
                        <button
                            type="button"
                            onClick={handleHome}
                            className={navClass("/userHome")}
                            aria-label="Home"
                            title="Home"
                        >
                            <IoIosHome size={20} />
                            <span className="hidden sm:inline">Home</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleProfile}
                            className={navClass("/profile")}
                            aria-label="Profile"
                            title="Profile"
                        >
                            <BiSolidUser size={20} />
                            <span className="hidden sm:inline">Profile</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-600/90 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg sm:px-4"
                            aria-label="Sign out"
                            title="Sign out"
                        >
                            <FiLogOut size={19} />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* PAGE CONTENT */}
            <main className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white">

               <div className="relative z-10 flex h-0 min-h-0 w-full flex-1 flex-col overflow-hidden p-2 sm:p-3 md:p-4 lg:p-5">
                 <Outlet/>
                
                </div>

            </main>
        </div>
    );
};

export default Main;
