import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yourjobrisk.be";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Your Job Risk · Belgium — AI exposure across 11 provinces",
    template: "%s · Your Job Risk · Belgium",
  },
  description:
    "How AI exposure is reshaping work across Belgium's 11 provinces — 5 million workers, 10 ISCO occupation families, two years of restructuring, one uneven transition. Independent, non-commercial, fully sourced.",
  keywords: [
    "AI jobs Belgium",
    "AI exposure Belgium",
    "AI banen België",
    "AI emplois Belgique",
    "ISCO Belgium",
    "AIOE Felten Raj Rock",
    "Belgian labour market",
    "Statbel LFS",
    "Belgian layoffs",
    "future of work Belgium",
    "Brussels AI jobs",
    "Antwerp AI jobs",
    "Wallonia AI jobs",
    "Flanders AI jobs",
  ],
  authors: [{ name: "Your Job Risk · Belgium" }],
  creator: "Your Job Risk · Belgium",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Your Job Risk · Belgium",
    locale: "en_BE",
    url: SITE_URL,
    title: "Your Job Risk · Belgium — AI exposure across 11 provinces",
    description:
      "5 million Belgian workers, mapped against AI exposure by province and occupation. Province scores, occupation rankings, layoff classifications, and a Jevons counter-view.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Job Risk · Belgium",
    description:
      "AI exposure across Belgium's 11 provinces and 10 ISCO occupation families.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Economics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
