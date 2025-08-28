import { cookies } from "next/headers";
import { api } from "./api";
import axios from "axios";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const checkServerSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await api.get<User | null>("/auth/session", {
    headers: { cookie: cookieHeader },
  });
  return res.data;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
const API_URL = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${API_URL}`,
  },
});

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateUserProfile(payload: {
  username: string;
}): Promise<User> {
  const { data } = await api.patch<User>("users/me", payload);
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
  const response = await instance.get<Note>(`/${id}`);
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

  const response = await instance.get<FetchNotesResponse>("", {
    params: queryParams,
  });
  return response.data;
};

export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const response = await api.post<Note>("", data);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await instance.delete<{ success: boolean }>(`/${id}`);
  return response.data;
}
