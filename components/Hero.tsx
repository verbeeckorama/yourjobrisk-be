import Link from "next/link";
import {
  totalWorkersMillions,
  elevatedWorkersMillions,
  layoffs,
} from "@/lib/data";

export default function Hero() {
  const totalLayoffs = layoffs.reduce((s, l) => s + l.roles, 0);
  return (
    <section className="relative border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Your Job Risk · Belgium edition
          </p>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.25em] text-white/50">
            <Link href="/tool" className="hover:text-accent">
              Tool →
            </Link>
            <Link href="/methodology" className="hover:text-accent">
              Methodology →
            </Link>
          </div>
        </div>
        <h1 className="numeric text-5xl font-semibold leading-[0.95] md:text-7xl">
          {totalLayoffs.toLocaleString("en-BE")} jobs.{" "}
          <span className="text-white/60">{layoffs.length} employers.</span>{" "}
          <span className="text-accent">2 years.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
          AI-era restructuring isn&apos;t a future event in Belgium. It is
          showing up in corporate plans, call-centre floors and back-office
          teams — province by province, role by role.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/tool"
            className="inline-flex items-center rounded-sm border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-ink"
          >
            Enter the tool →
          </Link>
          <Link
            href="/tool#my-risk"
            className="inline-flex items-center rounded-sm border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-white/40 hover:text-white"
          >
            Check my risk →
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          <Stat value={`${totalWorkersMillions.toFixed(1)}M`} label="Belgian workers" />
          <Stat value="11" label="Provinces" />
          <Stat
            value={`${elevatedWorkersMillions.toFixed(1)}M`}
            label="At elevated AI exposure"
            accent
          />
          <Stat value="ISCO-08" label="Occupation framework" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`numeric text-3xl font-semibold md:text-4xl ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}
