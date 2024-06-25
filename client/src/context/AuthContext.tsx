import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../interface/user";
import { apiClient } from "../services/apiClient";

interface AuthContextType {
  user: User | null;
  apiKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient("/auth/check-session", "GET");
        setUser(response.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiClient("/auth/login", "POST", {
      email,
      password,
    });
    setUser(response.user);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const response = await apiClient("/auth/register", "POST", {
      username,
      email,
      password,
    });

    const { apiKey } = response;

    console.log("REGISTER RESPONSE: ", response);
    setUser(response.data.user);
    setApiKey(apiKey);
  };

  const logout = async () => {
    await apiClient("/auth/logout", "POST");
    setUser(null);
    setApiKey(null);
  };

  const authContextValue: AuthContextType = {
    user,
    apiKey,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
