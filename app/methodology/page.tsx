import type { Metadata } from "next";
import MethodologyContent from "@/components/MethodologyContent";

export const metadata: Metadata = {
  title: "Methodology — how the Belgian AI Exposure scores are built",
  description:
    "Province exposure scores, occupation rankings (ISCO-08) and layoff classifications for Belgium, fully sourced. AIOE (Felten, Raj & Rock 2021) cross-checked with Eloundou et al. 2023, ILO 2025, OECD Employment Outlook 2025, the Anthropic Economic Index, and Gimbel et al. 2025 on junior-worker effects. Belgian employment from Statbel LFS 2024.",
  keywords: [
    "AIOE",
    "Felten Raj Rock",
    "ISCO-08",
    "Statbel LFS 2024",
    "AI exposure methodology",
    "OECD Employment Outlook 2025",
    "ILO Generative AI",
    "Anthropic Economic Index",
    "junior workers AI",
    "Belgian labour market",
  ],
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology — Your Job Risk Belgium",
    description:
      "How province scores, occupation rankings and layoff classifications are built, with every source.",
    url: "/methodology",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Methodology — how the Belgian AI Exposure scores are built",
      description:
        "How province scores, occupation rankings and layoff classifications are built for Your Job Risk Belgium, with sources and caveats.",
      inLanguage: ["en", "nl", "fr"],
      isPartOf: { "@type": "WebSite", name: "Your Job Risk · Belgium" },
      about: [
        "Artificial intelligence",
        "Labour market",
        "Belgium",
        "AI Occupational Exposure",
        "ISCO-08",
      ],
      mainEntityOfPage: "/methodology",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI exposure", item: "/" },
        { "@type": "ListItem", position: 2, name: "Methodology", item: "/methodology" },
      ],
    },
  ],
};

export default function MethodologyPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MethodologyContent />
    </main>
  );
}
