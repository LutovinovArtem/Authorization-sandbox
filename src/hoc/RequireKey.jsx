import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const keyToken = localStorage.getItem("token");

  if (!keyToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};
