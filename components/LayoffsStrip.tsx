"use client";

import { layoffs, type AiFactor } from "@/lib/data";
import { useLang, tr } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function LayoffsStrip() {
  const lang = useLang();
  const numFmt = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-BE";

  const factorMeta: Record<
    AiFactor,
    { short: string; long: string; dot: string; pill: string }
  > = {
    high: {
      short: tr(t.loFactorHighShort, lang),
      long: tr(t.loFactorHighLong, lang),
      dot: "bg-accent",
      pill: "border-accent/40 bg-accent/10 text-accent",
    },
    medium: {
      short: tr(t.loFactorMediumShort, lang),
      long: tr(t.loFactorMediumLong, lang),
      dot: "bg-amber-400",
      pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    },
    low: {
      short: tr(t.loFactorLowShort, lang),
      long: tr(t.loFactorLowLong, lang),
      dot: "bg-white/30",
      pill: "border-white/15 bg-white/5 text-white/50",
    },
  };

  const sorted = [...layoffs].sort(
    (a, b) => b.when.localeCompare(a.when) || b.roles - a.roles
  );
  const byYear = new Map<string, number>();
  for (const l of layoffs) {
    const y = l.when.slice(0, 4);
    byYear.set(y, (byYear.get(y) ?? 0) + l.roles);
  }
  const years = [...byYear.entries()].sort(([a], [b]) => a.localeCompare(b));

  const aiHigh = layoffs
    .filter((l) => l.aiFactor === "high")
    .reduce((s, l) => s + l.roles, 0);
  const aiMedium = layoffs
    .filter((l) => l.aiFactor === "medium")
    .reduce((s, l) => s + l.roles, 0);

  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.loEyebrow, lang)}
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          {tr(t.loHeadline, lang)}
        </h2>
        <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
          {tr(t.loIntro, lang)}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {years.map(([year, total]) => (
            <div
              key={year}
              className="rounded-sm border border-white/10 px-4 py-2"
            >
              <span className="numeric mr-2 text-white">
                {total.toLocaleString(numFmt)}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/50">
                {tr(t.loAnnouncedIn, lang)} {year}
              </span>
            </div>
          ))}
          <div className="rounded-sm border border-accent/40 bg-accent/10 px-4 py-2">
            <span className="numeric mr-2 text-accent">
              {aiHigh.toLocaleString(numFmt)}
            </span>
            <span className="text-xs uppercase tracking-widest text-accent/80">
              {tr(t.loAiLikely, lang)}
            </span>
          </div>
          <div className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-4 py-2">
            <span className="numeric mr-2 text-amber-300">
              {aiMedium.toLocaleString(numFmt)}
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-300/80">
              {tr(t.loAiPlausible, lang)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/60">
          {(["high", "medium", "low"] as AiFactor[]).map((f) => (
            <span key={f} className="inline-flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${factorMeta[f].dot}`}
              />
              {factorMeta[f].long}
            </span>
          ))}
        </div>

        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {sorted.map((l) => {
            const m = factorMeta[l.aiFactor];
            const muted = l.aiFactor === "low";
            return (
              <li
                key={l.company + l.when}
                className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4 text-sm md:text-base ${
                  muted ? "opacity-70" : ""
                }`}
              >
                <span
                  className={`numeric w-24 md:w-28 ${
                    muted ? "text-white/50" : "text-accent"
                  }`}
                >
                  {l.roles.toLocaleString(numFmt)}
                </span>
                <span className="w-44 font-medium md:w-56">{l.company}</span>
                <span className="min-w-0 flex-1 basis-full text-white/60 md:basis-0">
                  {l.note}
                </span>
                <span
                  className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-widest ${m.pill}`}
                  title={l.why}
                >
                  <span
                    className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${m.dot}`}
                  />
                  {m.short}
                </span>
                <span className="numeric rounded-sm border border-white/10 px-2 py-0.5 text-xs text-white/60">
                  {l.when}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-white/40">{tr(t.loHoverHint, lang)}</p>
      </div>
    </section>
  );
}
