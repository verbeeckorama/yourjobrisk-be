"use client";

import { useMemo } from "react";
import { provinces } from "@/lib/data";
import {
  bboxOf,
  colorForExposure as colorFor,
  featureCentroid,
  featurePath,
  makeProjector,
  type FeatureCollection,
} from "@/lib/geo";
import { useLang, tr } from "@/components/LanguageProvider";
import { provinceNameI18n, provinceNoteI18n, t } from "@/lib/i18n";

type Props = { features: FeatureCollection };

export default function BelgiumMap({ features }: Props) {
  const lang = useLang();
  const numFmt = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-BE";

  const W = 720;
  const H = 520;
  const { bbox, proj } = useMemo(() => {
    const bb = bboxOf(features.features);
    return { bbox: bb, proj: makeProjector(bb, W, H, 12) };
  }, [features]);

  const byNuts = new Map(provinces.map((p) => [p.nuts, p]));
  const sorted = [...provinces].sort((a, b) => b.exposure - a.exposure);

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.geoEyebrow, lang)}
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          {tr(t.geoHeadline, lang)}
        </h2>
        <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
          {tr(t.geoIntro, lang)}
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)] md:gap-12">
          <div>
            <div className="rounded-sm border border-white/10 bg-black/40 p-3">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label={tr(t.geoMapAria, lang)}
                className="h-auto w-full"
              >
                {features.features.map((f) => {
                  const p = byNuts.get(f.properties.id);
                  const fill = p ? colorFor(p.exposure) : "#222";
                  const name = p
                    ? provinceNameI18n[p.nuts]
                      ? tr(provinceNameI18n[p.nuts], lang)
                      : p.name
                    : f.properties.na;
                  return (
                    <path
                      key={f.properties.id}
                      d={featurePath(f, proj)}
                      fill={fill}
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth={0.6}
                      strokeLinejoin="round"
                    >
                      <title>
                        {p
                          ? `${name} — ${tr(t.occHExposure, lang)} ${p.exposure}/100, ${p.workers}k`
                          : name}
                      </title>
                    </path>
                  );
                })}
                {features.features.map((f) => {
                  const p = byNuts.get(f.properties.id);
                  if (!p) return null;
                  const [lng, lat] = featureCentroid(f);
                  const [x, y] = proj(lng, lat);
                  const dy = p.code === "BRU" ? -6 : 0;
                  return (
                    <g
                      key={`lbl-${p.code}`}
                      transform={`translate(${x}, ${y + dy})`}
                    >
                      <text
                        textAnchor="middle"
                        className="fill-white"
                        fontSize={10}
                        fontWeight={600}
                        style={{ paintOrder: "stroke" }}
                        stroke="rgba(0,0,0,0.6)"
                        strokeWidth={2}
                      >
                        {p.shortLabel}
                      </text>
                      <text
                        textAnchor="middle"
                        y={11}
                        className="numeric fill-white/90"
                        fontSize={10}
                      >
                        {p.exposure}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
              <span>{tr(t.geoLower, lang)}</span>
              <div
                className="h-2 flex-1 rounded-sm"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(42,42,40), rgb(255,65,51))",
                }}
              />
              <span>{tr(t.geoHigher, lang)}</span>
            </div>
            <p className="mt-2 text-xs text-white/40">
              {tr(t.geoBoundaries, lang)}
            </p>
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {sorted.map((p, i) => {
              const name = provinceNameI18n[p.nuts]
                ? tr(provinceNameI18n[p.nuts], lang)
                : p.name;
              const note = provinceNoteI18n[p.nuts]
                ? tr(provinceNoteI18n[p.nuts], lang)
                : p.note;
              return (
                <li
                  key={p.code}
                  className="flex items-center gap-4 py-3 text-sm"
                >
                  <span className="numeric w-6 text-white/40">{i + 1}</span>
                  <span className="w-40 font-medium md:w-48">{name}</span>
                  <span className="hidden flex-1 text-white/50 md:block">
                    {note}
                  </span>
                  <span className="numeric w-14 text-right text-white/70">
                    {p.workers.toLocaleString(numFmt)}k
                  </span>
                  <span
                    className="numeric w-12 rounded-sm px-2 py-0.5 text-right text-sm font-semibold text-white"
                    style={{ background: colorFor(p.exposure) }}
                  >
                    {p.exposure}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
