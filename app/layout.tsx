import type { Metadata } from "next";
import "./globals.css";
import { AuthModalProvider } from "@/components/auth/AuthModalContext";
import { AuthModal } from "@/components/auth/AuthModal";

export const metadata: Metadata = {
  title: "Tutoreem | 1:1 Online Tutoring & Education Platform",
  description:
    "A little guidance. A brighter future. Expert 1:1 tutoring tailored to match and nurture your child's pace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FBFBFA] text-[#1E293B] antialiased">
        <AuthModalProvider>
          {children}
          <AuthModal />
        </AuthModalProvider>
      </body>
    </html>
  );
}
