import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthUser {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
}

export const useAuthStore = create<AuthUser>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      setUser: (user) =>
        set({
          user,
          isAuth: true,
        }),
      clearIsAuth: () =>
        set({
          user: null,
          isAuth: false,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);
