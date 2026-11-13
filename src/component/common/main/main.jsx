
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { IoIosHome } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import { useAppDispatch } from "../../../redux/store/hooks";
import { logout } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { question } from "../../../helper/swal";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleHome = () => {
    navigate("/userHome");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

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

  return (
    <div className="min-h-screen bg-purple-100">
      <header className="relative z-20 flex min-h-24 items-center justify-between bg-blue-950 px-4 py-3 shadow-xl md:px-10">

        <button
          type="button"
          onClick={handleHome}
          className="flex items-center gap-3"
          aria-label="Go to home"
        >
          <img
            className="h-14 w-14 rounded-full object-cover md:h-16 md:w-16"
            src={require("../../../assets/img/logo.png")}
            alt="Application logo"
          />

          <span className="hidden text-lg font-semibold text-white sm:block">
            Furqan Worldwide Connection
          </span>
        </button>

        <nav className="flex items-center gap-2 md:gap-5">

          <button
            type="button"
            onClick={handleHome}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white md:text-base"
          >
            <IoIosHome size={20} />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={handleProfile}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white md:text-base"
          >
            <BiSolidUser size={20} />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700 md:px-4 md:text-base"
          >
            <FiLogOut size={18} />
            <span>Sign Out</span>
          </button>

        </nav>
      </header>

      <main className="relative mx-auto min-h-[calc(100vh-6rem)] w-full max-w-[1600px] overflow-hidden bg-gradient-to-b from-purple-300 via-purple-100 to-white shadow-xl">

        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1327187531/tr/vektör/global-network-connection-world-map-point-and-line-composition-concept-of-global-business.jpg?s=612x612&w=0&k=20&c=vfLYnJcaXytQn-7D4XYJQZcbXrvvUjHrujtJAl6JoeA=')",
          }}
        />

        <div className="relative z-10 min-h-[calc(100vh-6rem)] p-3 md:p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default Main;
