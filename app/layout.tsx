import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent IA de cadrage projet",
  description: "POC de cadrage projet IA pour S'investir"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
