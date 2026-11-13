
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";

const ProtectedRoute = ({ children, admin = false }) => {
    const { isUserLogin, user, authInitialized } = useAppSelector(
        (state) => state.auth
    );

    // Oturum kontrolü henüz tamamlanmadıysa bekle.
    if (!authInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            </div>
        );
    }

    // Kullanıcı giriş yapmamışsa Login sayfasına yönlendir.
    if (!isUserLogin) {
        return <Navigate to="/login" replace />;
    }

    const roles = Array.isArray(user?.roles) ? user.roles : [];

    // Yönetici yetkisi kontrolü.
    if (admin && !roles.includes("Administrator")) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children ?? <Outlet />;
};

export default ProtectedRoute;
