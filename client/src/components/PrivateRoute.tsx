import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const { user } = useAuth();

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoute;
