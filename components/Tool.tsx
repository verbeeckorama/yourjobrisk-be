"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  provinces,
  occupations,
  type Province,
  type OccupationGroup,
  totalWorkersMillions,
} from "@/lib/data";
import {
  bboxOf,
  colorForExposure,
  featureCentroid,
  featurePath,
  makeProjector,
  type FeatureCollection,
} from "@/lib/geo";

type Props = { features: FeatureCollection };

const W = 720;
const H = 520;

// "Displacement pressure" model: the AI-era share of a worker's task basket
// that is plausibly substitutable over a given horizon.
//   pressure = exposure/100 × adoption × horizonFactor
// This is deliberately simple — a slider-driven narrative, not a forecast.
function pressure(
  score: number,
  adoption: number, // 0 ... 1
  horizonYears: number
) {
  const horizonFactor = Math.min(1, horizonYears / 15);
  return Math.max(0, Math.min(1, (score / 100) * adoption * horizonFactor));
}

const factorLabels: Record<"fast" | "central" | "slow", string> = {
  slow: "Slow: AI tooling stays in pilots",
  central: "Central: current adoption curve continues",
  fast: "Fast: broad enterprise rollout",
};

export default function Tool({ features }: Props) {
  const [scenario, setScenario] = useState<"slow" | "central" | "fast">(
    "central"
  );
  const [horizon, setHorizon] = useState<number>(10);
  const [selectedNuts, setSelectedNuts] = useState<string>("BE10"); // Brussels
  const [selectedIsco, setSelectedIsco] = useState<string>("2"); // Professionals

  const adoption = scenario === "slow" ? 0.25 : scenario === "fast" ? 0.65 : 0.4;

  const byNuts = useMemo(
    () => new Map(provinces.map((p) => [p.nuts, p])),
    []
  );
  const byIsco = useMemo(
    () => new Map(occupations.map((o) => [o.isco, o])),
    []
  );

  const proj = useMemo(
    () => makeProjector(bboxOf(features.features), W, H, 12),
    [features]
  );

  const selectedProvince: Province | undefined = byNuts.get(selectedNuts);
  const selectedOccupation: OccupationGroup | undefined =
    byIsco.get(selectedIsco);

  // Combined personal risk: province exposure × occupation exposure × adoption × horizon.
  const personalExposure = selectedProvince
    ? (selectedProvince.exposure + (selectedOccupation?.exposure ?? 0)) / 2
    : 0;
  const personalPressure = pressure(personalExposure, adoption, horizon);

  const countryAtRiskM = useMemo(() => {
    // Weighted average pressure across occupation groups, times total workforce.
    const avgPressure = occupations.reduce(
      (s, o) =>
        s + pressure(o.exposure, adoption, horizon) * o.shareOfEmployment,
      0
    );
    return +(avgPressure * totalWorkersMillions).toFixed(2);
  }, [adoption, horizon]);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16">
      <nav className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
        <Link href="/" className="hover:text-white">
          ← Your Job Risk · Belgium
        </Link>
        <Link href="/methodology" className="hover:text-white">
          Methodology →
        </Link>
      </nav>

      <header className="max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          The Tool
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Click your province. Pick your role. See the number.
        </h1>
        <p className="mt-6 text-white/70 md:text-lg">
          This is a scenario explorer, not a prediction. Adjust how fast AI
          gets rolled out across Belgian workplaces and how far forward you
          want to look, then click into your province and occupation to see
          the resulting &quot;task-pressure&quot; estimate.
        </p>
      </header>

      {/* Controls */}
      <div className="mt-10 grid gap-6 rounded-sm border border-white/10 bg-black/40 p-6 md:grid-cols-[1fr,auto]">
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">
            Adoption scenario
          </div>
          <div className="flex flex-wrap gap-2">
            {(["slow", "central", "fast"] as const).map((s) => {
              const active = s === scenario;
              return (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`rounded-sm border px-3 py-1.5 text-sm transition ${
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {factorLabels[s]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:min-w-[240px]">
          <div className="mb-3 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-white/50">
            <span>Horizon</span>
            <span className="numeric text-white">{horizon} years</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
            className="w-full accent-[#ff4133]"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm">
          <div>
            <span className="numeric text-2xl text-accent">
              {countryAtRiskM.toFixed(1)}M
            </span>
            <span className="ml-2 text-white/60">
              Belgian workers under task-pressure at this scenario
            </span>
          </div>
          <div className="text-xs text-white/40">
            = Σ (group exposure × adoption × horizon/15) × employment share
          </div>
        </div>
      </div>

      {/* Map + detail */}
      <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
        <div className="rounded-sm border border-white/10 bg-black/40 p-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Interactive map of Belgian provinces"
            className="h-auto w-full"
          >
            {features.features.map((f) => {
              const p = byNuts.get(f.properties.id);
              const fill = p ? colorForExposure(p.exposure) : "#222";
              const isSelected = f.properties.id === selectedNuts;
              return (
                <path
                  key={f.properties.id}
                  d={featurePath(f, proj)}
                  fill={fill}
                  stroke={
                    isSelected ? "#ffffff" : "rgba(255,255,255,0.35)"
                  }
                  strokeWidth={isSelected ? 2 : 0.6}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-[stroke,filter] hover:brightness-125"
                  onClick={() => setSelectedNuts(f.properties.id)}
                >
                  <title>
                    {p
                      ? `${p.name} — click to inspect`
                      : f.properties.na}
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
                  className="pointer-events-none"
                >
                  <text
                    textAnchor="middle"
                    fill="white"
                    fontSize={10}
                    fontWeight={600}
                    stroke="rgba(0,0,0,0.6)"
                    strokeWidth={2}
                    paintOrder="stroke"
                  >
                    {p.shortLabel}
                  </text>
                  <text
                    textAnchor="middle"
                    y={11}
                    className="numeric"
                    fill="rgba(255,255,255,0.9)"
                    fontSize={10}
                  >
                    {p.exposure}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
            <span>Lower</span>
            <div
              className="h-2 flex-1 rounded-sm"
              style={{
                background:
                  "linear-gradient(90deg, rgb(42,42,40), rgb(255,65,51))",
              }}
            />
            <span>Higher exposure</span>
          </div>
        </div>

        {/* Province detail */}
        <aside className="rounded-sm border border-white/10 bg-black/40 p-6">
          {selectedProvince ? (
            <>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                Selected province
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold">
                  {selectedProvince.name}
                </h2>
                <span
                  className="numeric rounded-sm px-2 py-0.5 text-sm font-semibold"
                  style={{
                    background: colorForExposure(selectedProvince.exposure),
                  }}
                >
                  {selectedProvince.exposure}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">
                {selectedProvince.note}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/40">
                    Workers
                  </dt>
                  <dd className="numeric mt-1 text-lg text-white">
                    {selectedProvince.workers.toLocaleString("en-BE")}k
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/40">
                    Under task-pressure
                  </dt>
                  <dd className="numeric mt-1 text-lg text-accent">
                    {Math.round(
                      pressure(
                        selectedProvince.exposure,
                        adoption,
                        horizon
                      ) * selectedProvince.workers
                    ).toLocaleString("en-BE")}
                    k
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/40">
                    Region
                  </dt>
                  <dd className="mt-1 text-white/80">
                    {selectedProvince.region}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/40">
                    NUTS-2
                  </dt>
                  <dd className="numeric mt-1 text-white/80">
                    {selectedProvince.nuts}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <div className="text-white/60">Click a province on the map.</div>
          )}
        </aside>
      </div>

      {/* Personal risk */}
      <section
        id="my-risk"
        className="mt-14 rounded-sm border border-white/10 bg-black/40 p-6 md:p-10"
      >
        <div className="mb-6 text-xs uppercase tracking-[0.25em] text-white/50">
          My risk profile
        </div>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Where do you fit?
        </h2>
        <p className="mt-3 max-w-2xl text-white/60">
          Pick your occupation family (ISCO-08 major group). The site
          combines its AIOE-derived score with the province score above
          and the current scenario.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[...occupations]
            .sort((a, b) => b.exposure - a.exposure)
            .map((o) => {
              const active = o.isco === selectedIsco;
              return (
                <button
                  key={o.isco}
                  onClick={() => setSelectedIsco(o.isco)}
                  className={`rounded-sm border p-3 text-left transition ${
                    active
                      ? "border-accent bg-accent/10"
                      : "border-white/10 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-sm font-medium ${
                        active ? "text-accent" : "text-white"
                      }`}
                    >
                      {o.name}
                    </span>
                    <span className="numeric text-sm text-white/60">
                      {o.exposure}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/40 line-clamp-1">
                    {o.examples}
                  </div>
                </button>
              );
            })}
        </div>

        {/* Result */}
        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
          <ResultStat
            label="Composite exposure"
            value={personalExposure.toFixed(0)}
            hint="avg. of province + occupation (0–100)"
          />
          <ResultStat
            label="Task-pressure"
            value={`${Math.round(personalPressure * 100)}%`}
            hint="share of your task-basket plausibly substitutable"
            accent
          />
          <ResultStat
            label="Scenario"
            value={
              scenario === "slow"
                ? "Slow"
                : scenario === "fast"
                  ? "Fast"
                  : "Central"
            }
            hint={`${horizon}-year horizon`}
          />
        </div>

        <p className="mt-6 max-w-2xl text-xs text-white/40">
          Task-pressure is not the probability of losing your job. It is
          an indicative measure of how much of what you do today could be
          done, in whole or in part, by current AI systems at the chosen
          adoption level and horizon.
        </p>
      </section>
    </div>
  );
}

function ResultStat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-white/40">
        {label}
      </div>
      <div
        className={`numeric mt-2 text-4xl font-semibold ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs text-white/50">{hint}</div>
    </div>
  );
}
