import { loadBelgiumFeatures } from "@/lib/geoData";
import BelgiumMapClient from "@/components/BelgiumMapClient";

export default function BelgiumMap() {
  const features = loadBelgiumFeatures();
  return <BelgiumMapClient features={features} />;
}
