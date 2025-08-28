import { api } from "../api/api";
import { User } from "@/types/user";

export const checkServerSession = async (
  cookieHeader?: string
): Promise<User | null> => {
  try {
    const { data } = await api.get("/auth/session", {
      headers: { Cookie: cookieHeader || "" },
      withCredentials: true,
    });

    return data || null;
  } catch {
    return null;
  }
};
