import Hero from "@/components/Hero";
import BelgiumMap from "@/components/BelgiumMap";
import OccupationsTable from "@/components/OccupationsTable";
import LayoffsStrip from "@/components/LayoffsStrip";
import Narrative from "@/components/Narrative";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI exposure across Belgium's 11 provinces",
  description:
    "An interactive map of AI exposure across Belgium: 5 million workers, 11 provinces, 10 ISCO occupation families, and 24 months of Belgian restructuring announcements classified by AI-driver plausibility.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI exposure across Belgium's 11 provinces",
    description:
      "5 million Belgian workers mapped against AI exposure. Province scores, occupation rankings, layoff classifications.",
    url: "/",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Your Job Risk · Belgium",
      url: "/",
      inLanguage: "en",
      description:
        "AI exposure across Belgium's 11 provinces and 10 ISCO occupation families.",
    },
    {
      "@type": "Dataset",
      name: "Belgian AI exposure by province and occupation (modeled)",
      description:
        "Composite AI Occupational Exposure (AIOE) scores aggregated to ISCO-08 major groups and combined with Statbel LFS 2024 employment shares to produce province-level AI exposure scores for Belgium.",
      keywords: [
        "AI exposure",
        "Belgium",
        "ISCO-08",
        "AIOE",
        "labour market",
      ],
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Organization", name: "Your Job Risk · Belgium" },
    },
  ],
};

export default function Page() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <BelgiumMap />
      <LayoffsStrip />
      <OccupationsTable />
      <Narrative />
      <Footer />
    </main>
  );
}
