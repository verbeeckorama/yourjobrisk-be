import type { Metadata } from "next";
import JevonsContent from "@/components/JevonsContent";

export const metadata: Metadata = {
  title: "An AI Jevons paradox in Belgium? · Your Job Risk",
  description:
    "If AI makes cognitive work radically cheaper, Belgian employment in the exposed jobs may grow, not shrink. Where the early signs of an AI Jevons paradox would show up first — software, translation, legal, marketing, audit, customer support, healthcare — and which Belgian employers and institutions to watch.",
  keywords: [
    "AI Jevons paradox",
    "AI jobs Belgium",
    "AI banen België",
    "AI emplois Belgique",
    "AI exposure Belgium",
    "generative AI labour market",
    "AI productivity",
    "Belgian labour market 2026",
    "AI augmentation",
    "future of work Belgium",
  ],
  alternates: { canonical: "/jevons" },
  openGraph: {
    type: "article",
    title: "An AI Jevons paradox in Belgium?",
    description:
      "Cheaper cognitive work, more total demand, growing employment in the exposed jobs — the case, the early signs, the Belgian sectors to watch.",
    url: "/jevons",
    siteName: "Your Job Risk · Belgium",
    locale: "en_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "An AI Jevons paradox in Belgium?",
    description:
      "If AI makes cognitive work 10× cheaper, do we end up doing more of it — not less? The Belgian read.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "An AI Jevons paradox in Belgium? Where the early signs would show up first",
      description:
        "If AI makes cognitive work radically cheaper, Belgian employment in the exposed jobs may grow, not shrink. The Belgian read on the Jevons paradox.",
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Your Job Risk · Belgium" },
      about: [
        "Artificial intelligence",
        "Labour market",
        "Belgium",
        "Jevons paradox",
      ],
      mainEntityOfPage: "/jevons",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI exposure", item: "/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jevons paradox",
          item: "/jevons",
        },
      ],
    },
  ],
};

export default function JevonsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JevonsContent />
    </>
  );
}
