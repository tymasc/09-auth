import { api } from "./api";
import { User } from "@/types/user";

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("auth/login", { email, password });
  return data;
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("auth/register", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  await api.post<User>("auth/logout");
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>("auth/profile");
  return data;
}

export async function updateUserProfile(user: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("auth/profile", user);
  return data;
}
