import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <>{element}</>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default PrivateRoute;
