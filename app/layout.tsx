import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AbbeyPress Agency — Ecommerce Growth Systems",
  description:
    "A conversion-focused ecommerce agency helping ambitious brands turn traffic into measurable revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
