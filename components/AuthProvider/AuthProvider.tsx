"use client";

import {
  checkServerSession,
  getProfile,
  logout,
} from "../../lib/api/clientApi";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionUser = await checkServerSession();

        if (sessionUser) {
          const profile: User = await getProfile();
          setUser(profile);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <>{children}</>
  );
};

export default AuthProvider;
