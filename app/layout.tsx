import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Job Risk · Belgium",
  description:
    "How AI exposure is reshaping work across Belgium's 11 provinces — 5 million workers, one uneven transition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
