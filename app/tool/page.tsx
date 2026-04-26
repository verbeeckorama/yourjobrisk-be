import type { Metadata } from "next";
import Tool from "@/components/Tool";
import { loadBelgiumFeatures } from "@/lib/geoData";

export const metadata: Metadata = {
  title: "Check my AI risk — Belgian AI-exposure tool",
  description:
    "Pick your Belgian province, your ISCO occupation group and an AI-adoption scenario, then see your modelled task-pressure estimate. A scenario explorer for the Belgian labour market — not a forecast.",
  keywords: [
    "AI risk Belgium",
    "AI exposure tool",
    "check my job AI",
    "AI banen risico",
    "AI emploi risque Belgique",
    "ISCO Belgium",
  ],
  alternates: { canonical: "/tool" },
  openGraph: {
    title: "Check my AI risk — Belgium",
    description:
      "Pick a province, pick a role, see the number. Belgian AI-exposure scenario explorer.",
    url: "/tool",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Check my AI risk — Belgium",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "A Belgian AI-exposure scenario explorer that combines province, occupation group, adoption scenario and time horizon into a modelled task-pressure estimate.",
      inLanguage: ["en", "nl", "fr"],
      isPartOf: { "@type": "WebSite", name: "Your Job Risk · Belgium" },
      mainEntityOfPage: "/tool",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI exposure", item: "/" },
        { "@type": "ListItem", position: 2, name: "Risk tool", item: "/tool" },
      ],
    },
  ],
};

export default function ToolPage() {
  // Loaded at build time; passed to the client component as a prop.
  const features = loadBelgiumFeatures();
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Tool features={features} />
    </main>
  );
}
