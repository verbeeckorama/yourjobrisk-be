import type { Metadata } from "next";
import Tool from "@/components/Tool";
import { loadBelgiumFeatures } from "@/lib/geoData";

export const metadata: Metadata = {
  title: "The Tool · Your Job Risk Belgium",
  description:
    "Interactive Belgian AI-exposure explorer: pick a province, pick your occupation, pick an adoption scenario.",
};

export default function ToolPage() {
  // Loaded at build time; passed to the client component as a prop.
  const features = loadBelgiumFeatures();
  return <Tool features={features} />;
}
