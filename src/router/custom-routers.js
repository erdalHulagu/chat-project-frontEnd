
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import RegisterPage from "../page/common/register-page";
import LoginPage from "../page/common/login-page";

import MainPages from "../page/user/main-page";
import MyProfilePage from "../page/user/my-profile-page";
import FriendProfilePage from "../page/user/friend-profile-page";
import StatusPage from "../page/user/status-page";
import UpdateProfilePage from "../page/user/update-profile-page";
import GroupPage from "../page/user/group-page";
import UserHomePage from "../page/user/user-home-page";

import UnauthorizedPage from "../page/common/unauthorized-page";
import NotFoundPage from "../page/common/not-found-page";

import Main from "../component/common/main/main";
import ProtectedRoute from "./protected-route";
import { useAppSelector } from "../redux/store/hooks";
import DiscoverUsers from "../component/user/discover-users/discover-users";

const GuestRoute = ({ children }) => {
  const isUserLogin = useAppSelector(
    (state) => state.auth.isUserLogin
  );

  if (isUserLogin) {
    return <Navigate to="/userHome" replace />;
  }

  return children;
};

const CustomRouters = () => {
  return (
    <Routes>

      {/* DEFAULT PAGE */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* GUEST PAGES */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      {/* PROTECTED PAGES */}
      <Route element={<ProtectedRoute />}>

        <Route element={<Main />}>

          <Route path="/main" element={<MainPages />} />

          <Route path="/userHome" element={<UserHomePage />} />

          <Route path="/profile" element={<MyProfilePage />} />

          <Route
            path="/updateProfile"
            element={<UpdateProfilePage />}
          />

          <Route
            path="/friendProfile"
            element={<FriendProfilePage />}
          />
          <Route path="/discover-users" element={<DiscoverUsers />} />

          <Route path="/status" element={<StatusPage />} />

          <Route path="/group" element={<GroupPage />} />

        </Route>

      </Route>

      {/* OTHER PAGES */}
      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
};

export default CustomRouters;
