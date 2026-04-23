import { layoffs, type AiFactor } from "@/lib/data";

const factorMeta: Record<
  AiFactor,
  { short: string; long: string; dot: string; pill: string }
> = {
  high: {
    short: "AI likely",
    long: "AI a likely factor",
    dot: "bg-accent",
    pill: "border-accent/40 bg-accent/10 text-accent",
  },
  medium: {
    short: "AI plausible",
    long: "AI plausibly a factor",
    dot: "bg-amber-400",
    pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  },
  low: {
    short: "Non-AI",
    long: "Mostly market / geopolitical",
    dot: "bg-white/30",
    pill: "border-white/15 bg-white/5 text-white/50",
  },
};

export default function LayoffsStrip() {
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
          Section 03 · What already happened
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Belgium&apos;s last 24 months of restructuring.
        </h2>
        <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
          Not every announcement below is an AI story — many are driven by
          energy prices, demand shocks, regulation or geopolitics. Each row
          is tagged with how plausibly AI or automation is a driver, so you
          can see the signal inside the noise.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {years.map(([year, total]) => (
            <div
              key={year}
              className="rounded-sm border border-white/10 px-4 py-2"
            >
              <span className="numeric mr-2 text-white">
                {total.toLocaleString("en-BE")}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/50">
                announced in {year}
              </span>
            </div>
          ))}
          <div className="rounded-sm border border-accent/40 bg-accent/10 px-4 py-2">
            <span className="numeric mr-2 text-accent">
              {aiHigh.toLocaleString("en-BE")}
            </span>
            <span className="text-xs uppercase tracking-widest text-accent/80">
              AI likely a factor
            </span>
          </div>
          <div className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-4 py-2">
            <span className="numeric mr-2 text-amber-300">
              {aiMedium.toLocaleString("en-BE")}
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-300/80">
              AI plausibly a factor
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
                  {l.roles.toLocaleString("en-BE")}
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

        <p className="mt-6 text-xs text-white/40">
          Hover a tag for the reasoning. Classifications are editorial
          judgements based on company statements and press coverage — not a
          formal causal attribution.
        </p>
      </div>
    </section>
  );
}
