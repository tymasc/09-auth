"use client";
import { Note } from "@/types/note";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";

type Props = {
  notes: Note[];
  totalPages: number;
  tag?: string;
};

export default function Notes({ notes, totalPages, tag }: Props) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => {
      const options: { page: number; search?: string; tag?: string } = { page };

      if (debouncedSearch) options.search = debouncedSearch;
      if (tag) options.tag = tag;

      return fetchNotes(options);
    },
    initialData: { notes, totalPages },
    placeholderData: (prev) => prev,
  });

  return (
    <div>
      <div>
        <Link href="/notes/action/create">
          <button>Add Note</button>
        </Link>
      </div>

      <SearchBox
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : data.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
      {data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
