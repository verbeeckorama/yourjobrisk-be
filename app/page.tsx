import Hero from "@/components/Hero";
import BelgiumMap from "@/components/BelgiumMap";
import OccupationsTable from "@/components/OccupationsTable";
import LayoffsStrip from "@/components/LayoffsStrip";
import Narrative from "@/components/Narrative";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <LayoffsStrip />
      <BelgiumMap />
      <OccupationsTable />
      <Narrative />
      <Footer />
    </main>
  );
}
