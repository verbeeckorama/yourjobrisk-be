"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { useLang, tr } from "@/components/LanguageProvider";
import {
  occupationExamplesI18n,
  occupationNameI18n,
  provinceNameI18n,
  provinceNoteI18n,
  t,
} from "@/lib/i18n";

type Props = { features: FeatureCollection };
type WizardStep = 0 | 1 | 2 | 3;

const W = 720;
const H = 520;

function exposureBadgeClass(score: number) {
  if (score >= 70) return "bg-[#ff4133] text-ink";
  if (score >= 62) return "bg-[#d84a3e] text-white";
  if (score >= 54) return "bg-[#aa453b] text-white";
  if (score >= 46) return "bg-[#7d3f36] text-white";
  return "bg-[#2a2a28] text-white";
}

// AI Exposure model: the AI-era share of a worker's task basket
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

function scoreRange(score: number, margin: number) {
  return {
    low: Math.max(0, Math.round(score - margin)),
    base: Math.round(score),
    high: Math.min(100, Math.round(score + margin)),
  };
}

function rangeText(range: { low: number; base: number; high: number }) {
  return `${range.low} / ${range.base} / ${range.high}`;
}

export default function Tool({ features }: Props) {
  const lang = useLang();
  const numFmt = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-BE";
  const factorLabels: Record<"fast" | "current" | "slow", string> = {
    slow: tr(t.toolScenarioSlow, lang),
    current: tr(t.toolScenarioCurrent, lang),
    fast: tr(t.toolScenarioFast, lang),
  };
  const provName = (nuts: string, fallback: string) =>
    provinceNameI18n[nuts] ? tr(provinceNameI18n[nuts], lang) : fallback;
  const occName = (isco: string, fallback: string) =>
    occupationNameI18n[isco] ? tr(occupationNameI18n[isco], lang) : fallback;
  const occExamples = (isco: string, fallback: string) =>
    occupationExamplesI18n[isco]
      ? tr(occupationExamplesI18n[isco], lang)
      : fallback;

  const [scenario, setScenario] = useState<"slow" | "current" | "fast">(
    "current"
  );
  const [horizon, setHorizon] = useState<number>(10);
  const [selectedNuts, setSelectedNuts] = useState<string | null>(null);
  const [selectedIsco, setSelectedIsco] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState<WizardStep>(0);

  // Always start at the top; ignore any inbound hash like #my-risk.
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const handleSelectProvince = (nuts: string) => {
    setSelectedNuts(nuts);
    setWizardStep(2);
  };

  const handleSelectOccupation = (isco: string) => {
    setSelectedIsco(isco);
    setWizardStep(3);
  };

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

  const selectedProvince: Province | undefined = selectedNuts
    ? byNuts.get(selectedNuts)
    : undefined;
  const selectedOccupation: OccupationGroup | undefined = selectedIsco
    ? byIsco.get(selectedIsco)
    : undefined;
  const bothSelected = Boolean(selectedProvince && selectedOccupation);

  // Combined personal risk: province exposure × occupation exposure × adoption × horizon.
  const personalExposure =
    selectedProvince && selectedOccupation
      ? (selectedProvince.exposure + selectedOccupation.exposure) / 2
      : 0;
  const personalPressure = pressure(personalExposure, adoption, horizon);
  const provinceSensitivity = selectedProvince
    ? scoreRange(selectedProvince.exposure, 6)
    : null;
  const occupationSensitivity = selectedOccupation
    ? scoreRange(selectedOccupation.exposure, 8)
    : null;
  const pressureSensitivity =
    provinceSensitivity && occupationSensitivity
      ? {
          low: Math.round(
            pressure(
              (provinceSensitivity.low + occupationSensitivity.low) / 2,
              adoption,
              horizon
            ) * 100
          ),
          base: Math.round(personalPressure * 100),
          high: Math.round(
            pressure(
              (provinceSensitivity.high + occupationSensitivity.high) / 2,
              adoption,
              horizon
            ) * 100
          ),
        }
      : null;

  const countryAtRiskM = useMemo(() => {
    // Weighted average pressure across occupation groups, times total workforce.
    const avgPressure = occupations.reduce(
      (s, o) =>
        s + pressure(o.exposure, adoption, horizon) * o.shareOfEmployment,
      0
    );
    return +(avgPressure * totalWorkersMillions).toFixed(2);
  }, [adoption, horizon]);

  const wizardSteps = [
    {
      label: tr(t.toolAdoption, lang),
      complete: true,
    },
    {
      label: tr(t.toolProvinceLabel, lang),
      complete: Boolean(selectedProvince),
    },
    {
      label: tr(t.toolOccupationLabel, lang),
      complete: Boolean(selectedOccupation),
    },
    {
      label: tr(t.toolYourEstimate, lang),
      complete: bothSelected,
    },
  ];

  const goToStep = (step: WizardStep) => setWizardStep(step);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16">
      <header className="max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.toolEyebrow, lang)}
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          {tr(t.toolHeadline, lang)}
        </h1>
        <p className="mt-6 text-white/70 md:text-lg">
          {tr(t.toolIntro, lang)}
        </p>
      </header>

      <section
        id="my-risk"
        className="mt-10 rounded-sm border border-white/10 bg-black/40 p-5 md:p-8"
      >
        <WizardProgress steps={wizardSteps} currentStep={wizardStep} />

        {wizardStep === 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr,260px]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-accent">
                {tr(t.toolStepScenarioTitle, lang)}
              </div>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                {tr(t.toolWizardScenarioHeadline, lang)}
              </h2>
              <p className="mt-3 max-w-xl text-white/60">
                {tr(t.toolWizardScenarioHelp, lang)}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {(["slow", "current", "fast"] as const).map((s) => {
                    const active = s === scenario;
                    return (
                      <button
                        key={s}
                        onClick={() => setScenario(s)}
                        className={`rounded-sm border p-4 text-left text-sm transition ${
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

              <div className="mt-8 max-w-md">
                <div className="mb-3 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-white/50">
                  <span>{tr(t.toolHorizon, lang)}</span>
                  <span className="numeric text-white">
                    {horizon} {tr(t.toolYears, lang)}
                  </span>
                </div>
                <input
                  aria-label={`${tr(t.toolHorizon, lang)}: ${horizon} ${tr(t.toolYears, lang)}`}
                  title={tr(t.toolHorizon, lang)}
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={horizon}
                  onChange={(e) => setHorizon(Number(e.target.value))}
                  className="w-full accent-[#ff4133]"
                />
              </div>
            </div>

            <aside className="rounded-sm border border-white/10 bg-white/[0.03] p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">
                {tr(t.toolWizardNationalPreview, lang)}
              </div>
              <div className="numeric mt-3 text-4xl font-semibold text-accent">
                {countryAtRiskM.toFixed(1)}M
              </div>
              <p className="mt-2 text-sm text-white/60">
                {tr(t.toolWorkersUnderPressure, lang)}
              </p>
            </aside>
          </div>
        ) : null}

        {wizardStep === 1 ? (
          <div className="mt-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-accent">
                  {tr(t.toolStepProvinceTitle, lang)}
                </div>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                  {tr(t.toolPickProvinceMap, lang)}
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  {tr(t.toolWizardAutoNext, lang)}
                </p>
              </div>
              <SelectionBadge
                label={tr(t.toolProvinceLabel, lang)}
                value={
                  selectedProvince
                    ? provName(selectedProvince.nuts, selectedProvince.name)
                    : null
                }
                placeholder={tr(t.toolNoneSelected, lang)}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
              <div className="rounded-sm border border-white/10 bg-white/[0.03] p-3">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  role="img"
                  aria-label={tr(t.toolMapAria, lang)}
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
                        onClick={() => handleSelectProvince(f.properties.id)}
                      >
                        <title>
                          {p
                            ? `${provName(p.nuts, p.name)} — ${tr(t.toolClickInspect, lang)}`
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
                  <span>{tr(t.geoLower, lang)}</span>
                  <div className="exposure-gradient h-2 flex-1 rounded-sm" />
                  <span>{tr(t.toolHigher, lang)}</span>
                </div>
              </div>

              <aside
                className={`rounded-sm border bg-white/[0.03] p-6 transition ${
                  selectedProvince
                    ? "border-white/10"
                    : "border-dashed border-white/20"
                }`}
              >
                {selectedProvince ? (
                  <>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                      {tr(t.toolSelectedProvince, lang)}
                    </div>
                    <div className="mt-1 flex items-baseline justify-between gap-3">
                      <h2 className="text-2xl font-semibold">
                        {provName(selectedProvince.nuts, selectedProvince.name)}
                      </h2>
                      <span
                        className={`numeric rounded-sm px-2 py-0.5 text-sm font-semibold ${exposureBadgeClass(
                          selectedProvince.exposure
                        )}`}
                      >
                        {selectedProvince.exposure}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/70">
                      {provinceNoteI18n[selectedProvince.nuts]
                        ? tr(provinceNoteI18n[selectedProvince.nuts], lang)
                        : selectedProvince.note}
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-white/40">
                          {tr(t.toolWorkers, lang)}
                        </dt>
                        <dd className="numeric mt-1 text-lg text-white">
                          {selectedProvince.workers.toLocaleString(numFmt)}k
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-white/40">
                          {tr(t.toolUnderPressure, lang)}
                        </dt>
                        <dd className="numeric mt-1 text-lg text-accent">
                          {Math.round(
                            pressure(
                              selectedProvince.exposure,
                              adoption,
                              horizon
                            ) * selectedProvince.workers
                          ).toLocaleString(numFmt)}
                          k
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-white/40">
                          {tr(t.toolRegion, lang)}
                        </dt>
                        <dd className="mt-1 text-white/80">
                          {selectedProvince.region}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-widest text-white/40">
                          {tr(t.toolNuts, lang)}
                        </dt>
                        <dd className="numeric mt-1 text-white/80">
                          {selectedProvince.nuts}
                        </dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-start justify-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent">
                      2
                    </div>
                    <div className="text-white/80">{tr(t.toolStartHint, lang)}</div>
                    <div className="text-xs text-white/40">
                      {tr(t.toolDarkerRed, lang)}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        ) : null}

        {wizardStep === 2 ? (
          <div className="mt-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-accent">
                  {tr(t.toolStepOccupationTitle, lang)}
                </div>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                  {tr(t.toolPickOccupationHeadline, lang)}
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  {tr(t.toolWizardAutoNext, lang)}
                </p>
              </div>
              <SelectionBadge
                label={tr(t.toolOccupationLabel, lang)}
                value={
                  selectedOccupation
                    ? occName(selectedOccupation.isco, selectedOccupation.name)
                    : null
                }
                placeholder={tr(t.toolNoneSelected, lang)}
              />
            </div>
            <p className="mt-3 max-w-2xl text-white/60">
              {tr(t.toolPickOccupationHelp, lang)}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[...occupations]
                .sort((a, b) => b.exposure - a.exposure)
                .map((o) => {
                  const active = o.isco === selectedIsco;
                  return (
                    <button
                      key={o.isco}
                      onClick={() => handleSelectOccupation(o.isco)}
                      className={`rounded-sm border p-3 text-left transition ${
                        active
                          ? "border-accent bg-accent/10"
                          : "border-white/10 hover:border-white/40"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className={`text-sm font-medium ${
                            active ? "text-accent" : "text-white"
                          }`}
                        >
                          {occName(o.isco, o.name)}
                        </span>
                        <span className="numeric text-sm text-white/60">
                          {o.exposure}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-white/40 line-clamp-1">
                        {occExamples(o.isco, o.examples)}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ) : null}

        {wizardStep === 3 ? (
          <div className="mt-8">
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
              {tr(t.toolYourEstimate, lang)}
            </div>
            {bothSelected ? (
              <>
              <div className="grid gap-6 md:grid-cols-3">
                <ResultStat
                  label={tr(t.toolCompositeExposure, lang)}
                  value={personalExposure.toFixed(0)}
                  hint={tr(t.toolCompositeHint, lang)}
                />
                <ResultStat
                  label={tr(t.toolTaskPressure, lang)}
                  value={`${Math.round(personalPressure * 100)}%`}
                  hint={tr(t.toolTaskPressureHint, lang)}
                  accent
                />
                <ResultStat
                  label={tr(t.toolScenarioLabel, lang)}
                  value={
                    scenario === "slow"
                      ? tr(t.toolScenarioSlowShort, lang)
                      : scenario === "fast"
                        ? tr(t.toolScenarioFastShort, lang)
                        : tr(t.toolScenarioCurrentShort, lang)
                  }
                  hint={tr(t.toolHorizonShort, lang).replace(
                    "{n}",
                    String(horizon)
                  )}
                />
              </div>
              <div className="mt-6 rounded-sm border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
                  {tr(t.toolBreakdownTitle, lang)}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <BreakdownItem
                    label={tr(t.toolBreakdownProvince, lang)}
                    value={`${selectedProvince!.exposure}/100`}
                  />
                  <BreakdownItem
                    label={tr(t.toolBreakdownOccupation, lang)}
                    value={`${selectedOccupation!.exposure}/100`}
                  />
                  <BreakdownItem
                    label={tr(t.toolBreakdownAdoption, lang)}
                    value={`${Math.round(adoption * 100)}%`}
                  />
                  <BreakdownItem
                    label={tr(t.toolBreakdownHorizon, lang)}
                    value={`${Math.round((Math.min(1, horizon / 15)) * 100)}%`}
                  />
                </div>
              </div>
              <div className="mt-4 grid gap-4 rounded-sm border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60 lg:grid-cols-[1fr,1.2fr]">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">
                    {tr(t.toolSensitivityTitle, lang)}
                  </div>
                  <p>{tr(t.toolSensitivityIntro, lang)}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <BreakdownItem
                    label={tr(t.toolSensitivityProvince, lang)}
                    value={rangeText(provinceSensitivity!)}
                    hint={tr(t.toolSensitivityScale, lang)}
                  />
                  <BreakdownItem
                    label={tr(t.toolSensitivityOccupation, lang)}
                    value={rangeText(occupationSensitivity!)}
                    hint={tr(t.toolSensitivityScale, lang)}
                  />
                  <BreakdownItem
                    label={tr(t.toolSensitivityPressure, lang)}
                    value={`${pressureSensitivity!.low}% / ${pressureSensitivity!.base}% / ${pressureSensitivity!.high}%`}
                    hint={tr(t.toolSensitivityLowBaseHigh, lang)}
                  />
                </div>
              </div>
              <div className="mt-4 rounded-sm border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">
                  {tr(t.toolLimitsTitle, lang)}
                </div>
                <p>{tr(t.toolLimitsBody, lang)}</p>
              </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-3 text-sm">
                <StepPrompt done={Boolean(selectedProvince)} n={2}>
                  {tr(t.toolStepSelectProvince, lang)}
                </StepPrompt>
                <StepPrompt done={Boolean(selectedOccupation)} n={3}>
                  {tr(t.toolStepSelectOccupation, lang)}
                </StepPrompt>
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => goToStep(Math.max(0, wizardStep - 1) as WizardStep)}
            disabled={wizardStep === 0}
            className="rounded-sm border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            {tr(t.toolWizardBack, lang)}
          </button>

          <div className="flex flex-wrap gap-2">
            {wizardStep === 3 ? (
              <button
                type="button"
                onClick={() => goToStep(0)}
                className="rounded-sm border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
              >
                {tr(t.toolWizardChangeScenario, lang)}
              </button>
            ) : null}
            {wizardStep === 0 ? (
              <button
                type="button"
                onClick={() =>
                  goToStep(Math.min(3, wizardStep + 1) as WizardStep)
                }
                className="rounded-sm border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/5 disabled:text-white/35"
              >
                {tr(t.toolWizardNext, lang)}
              </button>
            ) : null}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-xs text-white/40">
          {tr(t.toolDisclaimer, lang)}
        </p>
      </section>
    </div>
  );
}

function BreakdownItem({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-white/40">
        {label}
      </div>
      <div className="numeric mt-1 text-base text-white">{value}</div>
      {hint ? <div className="mt-1 text-xs text-white/40">{hint}</div> : null}
    </div>
  );
}

function WizardProgress({
  steps,
  currentStep,
}: {
  steps: { label: string; complete: boolean }[];
  currentStep: number;
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {steps.map((step, index) => {
        const active = index === currentStep;
        const done = step.complete && index < currentStep;
        return (
          <li
            key={`${step.label}-${index}`}
            className={`rounded-sm border px-3 py-2 text-xs transition ${
              active
                ? "border-accent bg-accent/10 text-accent"
                : done
                  ? "border-white/20 bg-white/5 text-white"
                  : "border-white/10 text-white/45"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`numeric inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  active
                    ? "bg-accent text-ink"
                    : done
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-white/50"
                }`}
              >
                {index + 1}
              </span>
              <span className="font-medium">{step.label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SelectionBadge({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string | null;
  placeholder: string;
}) {
  const empty = !value;
  return (
    <div
      className={`rounded-sm border px-3 py-1.5 text-xs ${
        empty
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-white/20 bg-white/5 text-white"
      }`}
    >
      <span className="uppercase tracking-[0.25em] opacity-70">
        {label}:
      </span>{" "}
      <span className="font-medium">{value ?? placeholder}</span>
    </div>
  );
}

function StepPrompt({
  n,
  done,
  children,
}: {
  n: number;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-sm border px-3 py-2 ${
        done
          ? "border-white/15 text-white/50 line-through"
          : "border-accent/60 bg-accent/10 text-accent"
      }`}
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
          done
            ? "bg-white/10 text-white/60"
            : "bg-accent text-ink"
        }`}
      >
        {n}
      </span>
      {children}
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
