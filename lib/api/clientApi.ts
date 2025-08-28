import { Note, NoteTags } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

interface UserInfo {
  isAuth: boolean;
  user?: User;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("auth/login", { email, password });
  return data;
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("auth/register", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  await api.post("auth/logout", {}, { withCredentials: true });
}

export async function checkSession(): Promise<UserInfo> {
  const { data } = await api.get<UserInfo>("/auth/session");
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateUserProfile(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTags;
}): Promise<Note> => {
  const { data } = await api.post<Note>("", note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete<Note>(`/${id}`);
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/${id}`);
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, search, tag } = params;

  const queryParams: Record<string, string | number> = {
    page,
  };

  if (search?.trim()) {
    queryParams.search = search;
  }

  if (tag && tag !== "All") {
    queryParams.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>("", {
    params: queryParams,
  });
  return data;
};
