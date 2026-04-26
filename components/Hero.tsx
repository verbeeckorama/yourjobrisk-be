"use client";

import Link from "next/link";
import {
  totalWorkersMillions,
  elevatedWorkersMillions,
  layoffs,
} from "@/lib/data";
import { useLang, tr } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function Hero() {
  const lang = useLang();
  const totalLayoffs = layoffs.reduce((s, l) => s + l.roles, 0);
  const numFmt = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-BE";
  return (
    <section className="relative border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.heroEyebrow, lang)}
        </p>
        <h1 className="numeric text-5xl font-semibold leading-[0.95] md:text-7xl">
          {totalLayoffs.toLocaleString(numFmt)} {tr(t.heroJobs, lang)}{" "}
          <span className="text-white/60">
            {layoffs.length} {tr(t.heroEmployers, lang)}
          </span>{" "}
          <span className="text-accent">{tr(t.heroYears, lang)}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
          {tr(t.heroSubtitle, lang)}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/tool"
            className="inline-flex items-center rounded-sm border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-ink"
          >
            {tr(t.heroCta, lang)}
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          <Stat value={`${totalWorkersMillions.toFixed(1)}M`} label={tr(t.heroStatWorkers, lang)} />
          <Stat value="11" label={tr(t.heroStatProvinces, lang)} />
          <Stat
            value={`${elevatedWorkersMillions.toFixed(1)}M`}
            label={tr(t.heroStatElevated, lang)}
            accent
          />
          <Stat value="ISCO-08" label={tr(t.heroStatFramework, lang)} />
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
