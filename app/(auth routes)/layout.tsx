import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import React from "react";
import { Metadata } from "next";

const robotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
  weight: ["500"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "Login",
  description: "Login in App",
  openGraph: {
    title: "Login",
    description: "Login in App",
    url: "https://notehub.com/sign-in/",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
