import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const index = () => {
  const auth = useAuth();

  return auth.status ? (
    auth.role === "user" ? (
      <Navigate to="/candidate/browse" />
    ) : (
      <Navigate to="/company/job" />
    )
  ) : (
    <Outlet />
  );
};

export default index;
