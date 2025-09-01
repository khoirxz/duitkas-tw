// auth
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProps {
  id: string;
  role: string;
  company: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: UserProps | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: UserProps) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
    }
  )
);
