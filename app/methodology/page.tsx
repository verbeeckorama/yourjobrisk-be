import type { Metadata } from "next";
import MethodologyContent from "@/components/MethodologyContent";

export const metadata: Metadata = {
  title: "Methodology — how the Belgian AI-exposure scores are built",
  description:
    "Province exposure scores, occupation rankings (ISCO-08) and layoff classifications for Belgium, fully sourced. AIOE (Felten, Raj & Rock 2021) cross-checked with Eloundou et al. 2023, ILO 2025, OECD Employment Outlook 2025 and the Anthropic Economic Index. Belgian employment from Statbel LFS 2024.",
  keywords: [
    "AIOE",
    "Felten Raj Rock",
    "ISCO-08",
    "Statbel LFS 2024",
    "AI exposure methodology",
    "OECD Employment Outlook 2025",
    "ILO Generative AI",
    "Anthropic Economic Index",
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

export default function MethodologyPage() {
  return <MethodologyContent />;
}
