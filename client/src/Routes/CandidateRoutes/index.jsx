import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const index = () => {
  const auth = useAuth();

  return auth.status ? (
    auth.role === "user" ? (
      <Outlet />
    ) : (
      <Navigate to="/company/jobs" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default index;
