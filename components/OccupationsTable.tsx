"use client";

import { occupations, totalWorkersMillions } from "@/lib/data";
import { useLang, tr } from "@/components/LanguageProvider";
import {
  occupationExamplesI18n,
  occupationNameI18n,
  t,
} from "@/lib/i18n";

export default function OccupationsTable() {
  const lang = useLang();
  const numFmt = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-BE";
  const sorted = [...occupations].sort((a, b) => b.exposure - a.exposure);
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.occEyebrow, lang)}
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          {tr(t.occHeadline, lang)}
        </h2>
        <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
          {tr(t.occIntro, lang)}
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-white/50">
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4 font-normal">{tr(t.occHIsco, lang)}</th>
                <th className="py-3 pr-4 font-normal">{tr(t.occHGroup, lang)}</th>
                <th className="py-3 pr-4 font-normal">{tr(t.occHExamples, lang)}</th>
                <th className="py-3 pr-4 text-right font-normal">{tr(t.occHWorkers, lang)}</th>
                <th className="py-3 pr-4 font-normal">{tr(t.occHExposure, lang)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sorted.map((o) => {
                const workers = Math.round(
                  o.shareOfEmployment * totalWorkersMillions * 1000
                );
                const name = occupationNameI18n[o.isco]
                  ? tr(occupationNameI18n[o.isco], lang)
                  : o.name;
                const examples = occupationExamplesI18n[o.isco]
                  ? tr(occupationExamplesI18n[o.isco], lang)
                  : o.examples;
                return (
                  <tr key={o.isco}>
                    <td className="numeric py-4 pr-4 text-white/40">{o.isco}</td>
                    <td className="py-4 pr-4 font-medium">{name}</td>
                    <td className="py-4 pr-4 text-white/60">{examples}</td>
                    <td className="numeric py-4 pr-4 text-right text-white/80">
                      {workers.toLocaleString(numFmt)}k
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <svg
                          viewBox="0 0 100 8"
                          aria-hidden="true"
                          className="h-2 w-40 overflow-hidden rounded-sm bg-white/10"
                          preserveAspectRatio="none"
                        >
                          <rect
                            width={Math.min(100, o.exposure)}
                            height="8"
                            className="fill-accent"
                          />
                        </svg>
                        <span className="numeric w-8 text-right text-white/80">
                          {o.exposure}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
