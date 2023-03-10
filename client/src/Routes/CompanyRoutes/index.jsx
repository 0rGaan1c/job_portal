import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const index = () => {
  const auth = useAuth();

  return auth.status ? (
    auth.role === "company" ? (
      <Outlet />
    ) : (
      <Navigate to="/candidate/browse" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default index;
