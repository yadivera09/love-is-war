import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beto vs Yadira — 5 años de batalla",
  description: "Una historia épica de amor, memes y una caca azul.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
