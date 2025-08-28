import TagsMenu from "@/components/TagsMenu/TagsMenu";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] ?? "";

  return {
    title: tag,
    description: tag,
    openGraph: {
      title: tag,
      description: tag,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
};

const NotesPage = async ({ params }: NotesPageProps) => {
  const { slug } = await params;

  const tag = slug?.[0] ?? "";

  const fetchOptions = { page: 1, ...(tag && tag !== "All" ? { tag } : {}) };

  const { notes, totalPages } = await fetchNotes(fetchOptions);

  return (
    <div>
      <TagsMenu />
      <Notes notes={notes} totalPages={totalPages} tag={tag} />
    </div>
  );
};

export default NotesPage;
