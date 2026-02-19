import { createContext, useContext, useState } from "react";
import authApi, { setAccessToken } from "../apis/auth.api";
import type { LoginResponse } from "../types/auth.types";
import type { CurrentUser } from "../types/auth.types";

interface AuthContextType {
  user: CurrentUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
   
      const res = await authApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      setAccessToken(res.data.accessToken);

      const userRes = await authApi.get<{ user: CurrentUser }>("/auth/me");

      setUser(userRes.data.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authApi.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  return context;
};