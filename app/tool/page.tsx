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

export default function ToolPage() {
  // Loaded at build time; passed to the client component as a prop.
  const features = loadBelgiumFeatures();
  return <Tool features={features} />;
}
