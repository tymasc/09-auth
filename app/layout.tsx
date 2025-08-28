import "./globals.css";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Roboto } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const robotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
  weight: ["500"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "App",
  description: "App Notes Next-JS",
  openGraph: {
    title: "App",
    description: "New Product App! Next-JS",
    url: "https://notehub.com/notes/",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
