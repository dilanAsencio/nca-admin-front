"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/auth-services";
import { User } from "@/types/auth";

interface AuthContextType {
  infoUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [infoUser, setInfoUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario de localStorage/cookie al montar
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setInfoUser({ username } as User);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (username: string, password: string, rememberMe: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(username, password, rememberMe);
      setInfoUser({ username } as User);
      setIsAuthenticated(true);
    } catch (e: any) {
      setError(e.message || "Error de autenticación");
      setIsAuthenticated(false);
      setInfoUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setInfoUser(null);
    setIsAuthenticated(false);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await authService.refreshToken("");
      // Actualizar usuario/token si es necesario
    } catch (e) {
      setError("Sesión expirada");
      logout();
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ infoUser, isAuthenticated, loading, error, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};