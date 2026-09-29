import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abbeypress-agency.netlify.app"),
  title: {
    default: "AbbeyPress Agency — Ecommerce Growth Systems",
    template: "%s | AbbeyPress Agency",
  },
  description:
    "AbbeyPress builds, optimizes and scales ecommerce brands across storefronts, conversion, search, paid media, retention and measurement.",
  alternates: {
    canonical: "https://abbeypress-agency.netlify.app",
  },
  openGraph: {
    title: "AbbeyPress Agency — Ecommerce Growth Systems",
    description:
      "Build better. Convert more. Grow faster with connected ecommerce growth systems.",
    url: "https://abbeypress-agency.netlify.app",
    siteName: "AbbeyPress Agency",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
