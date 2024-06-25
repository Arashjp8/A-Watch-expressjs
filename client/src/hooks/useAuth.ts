import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiClient } from "../services/apiClient";

export const useAuth = (typeOfAuth?: "register" | "login") => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const auth = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const json = await apiClient(
        typeOfAuth === "login" ? "/user/login" : "/user/register",
        "POST",
        {
          email,
          password,
        },
      );

      if (!json) {
        setIsLoading(false);
        setError(new Error("An unknown error occurred"));
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err as Error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { auth, logout, isLoading, error };
};
