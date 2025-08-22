import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note",
  openGraph: {
    title: "Create Note",
    description: "Create a new note",
    url: "https://notehub.com/notes/action/create",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

const CreateNote = () => {
  return (
    <div>
      <h1>Create note</h1>
      <NoteForm />
    </div>
  );
};

export default CreateNote;
