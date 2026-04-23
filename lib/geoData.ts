// Server-only: reads the Belgium provinces GeoJSON once at build time.
// Safe to import from Server Components; do not import from Client Components.
import fs from "node:fs";
import path from "node:path";
import type { FeatureCollection } from "./geo";

export function loadBelgiumFeatures(): FeatureCollection {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "public", "be-provinces.geojson"),
    "utf8"
  );
  return JSON.parse(raw) as FeatureCollection;
}
