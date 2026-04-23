import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  sessionExpiresAt: number | null;
  sessionExpiringSoon: boolean;
  theme: "light" | "dark";
  setUser: (user: User | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  setTokens: (accessToken: string, refreshToken: string, expiresAt: number) => void;
  setSessionExpiringSoon: (isExpiringSoon: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  sessionExpiresAt: null,
  sessionExpiringSoon: false,
  theme: "light",
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTheme: (theme) => set({ theme }),
  setTokens: (accessToken, refreshToken, sessionExpiresAt) =>
    set({ accessToken, refreshToken, sessionExpiresAt }),
  setSessionExpiringSoon: (sessionExpiringSoon) => set({ sessionExpiringSoon }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      sessionExpiresAt: null,
      sessionExpiringSoon: false,
    }),
}));

export * from './notificationStore';
