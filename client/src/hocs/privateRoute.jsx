import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log("El estado de autenticación es " + isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
