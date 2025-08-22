import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Not Found",
  description: "This page is not found",

  openGraph: {
    title: "App Not Found",
    description: "This page is not found",
    images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    url: "https://notehub.com/notes/",
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
