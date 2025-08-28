import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";


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
  const response = await api.get<Note>(`/${id}`);
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

  const response = await api.get<FetchNotesResponse>("", {
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
  const response = await api.delete<{ success: boolean }>(`/${id}`);
  return response.data;
}
