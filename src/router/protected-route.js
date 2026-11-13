
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";

const ProtectedRoute = ({ children, admin = false }) => {
  const { isUserLogin, user } = useAppSelector(
    (state) => state.auth
  );

  if (!isUserLogin) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(user?.roles) ? user.roles : [];

  if (admin && !roles.includes("Administrator")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
