
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
import SignOutPage from "../page/common/sign-out-page";

import ProtectedRoute from "./protected-route";

const CustomRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<SignOutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/main" element={<MainPages />} />
                <Route path="/profile" element={<MyProfilePage />} />
                <Route path="/updateProfile" element={<UpdateProfilePage />} />
                <Route path="/friendProfile" element={<FriendProfilePage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/userHome" element={<UserHomePage />} />
            </Route>

            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
                path="/notFound"
                element={<NotFoundPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default CustomRouters;
