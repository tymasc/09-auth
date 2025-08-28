import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function withAuthHeaders() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieHeader,
    },
  };
}

export async function signUp(payload: { username: string; password: string }) {
  const { data } = await api.post(
    "/auth/register",
    payload,
    await withAuthHeaders()
  );

  return data;
}

export async function signIn(payload: { username: string; password: string }) {
  const { data } = await api.post(
    "/auth/login",
    payload,
    await withAuthHeaders()
  );

  return data;
}

export async function signOut() {
  const { data } = await api.post("/auth/logout", await withAuthHeaders());

  return data;
}

export async function refreshSession(refreshToken: string) {
  const { data } = await api.post("/auth/refresh", { refreshToken });
  return data;
}

export async function checkSession(): Promise<{ isAuth: boolean }> {
  const { data } = await api.get<{ isAuth: boolean }>(
    "/auth/session",
    await withAuthHeaders()
  );
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>("/users/me", await withAuthHeaders());
  return data;
}

export async function updateUserProfile(payload: {
  username: string;
}): Promise<User> {
  const { data } = await api.patch<User>(
    "/users/me",
    payload,
    await withAuthHeaders()
  );
  return data;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`, await withAuthHeaders());
  return response.data;
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

  const response = await api.get<FetchNotesResponse>("/notes", {
    ...(await withAuthHeaders()),
    params: queryParams,
  });
  return response.data;
};

export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const response = await api.post<Note>(
    "/notes",
    data,
    await withAuthHeaders()
  );
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete<{ success: boolean }>(
    `/notes/${id}`,
    await withAuthHeaders()
  );
  return response.data;
}
