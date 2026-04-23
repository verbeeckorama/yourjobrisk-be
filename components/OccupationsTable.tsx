import { occupations, totalWorkersMillions } from "@/lib/data";

function bar(score: number) {
  return `${Math.min(100, score)}%`;
}

export default function OccupationsTable() {
  const sorted = [...occupations].sort((a, b) => b.exposure - a.exposure);
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          Section 02 · Occupations
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Clerical work is the most exposed job family in Belgium.
        </h2>
        <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
          Using the Felten–Raj–Rock AI Occupational Exposure index mapped onto
          ISCO-08 major groups, clerical roles and professional knowledge work
          score highest. Trades, agriculture and elementary occupations score
          lowest.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-white/50">
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4 font-normal">ISCO</th>
                <th className="py-3 pr-4 font-normal">Occupation group</th>
                <th className="py-3 pr-4 font-normal">Examples</th>
                <th className="py-3 pr-4 text-right font-normal">Workers</th>
                <th className="py-3 pr-4 font-normal">Exposure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sorted.map((o) => {
                const workers = Math.round(
                  o.shareOfEmployment * totalWorkersMillions * 1000
                );
                return (
                  <tr key={o.isco}>
                    <td className="numeric py-4 pr-4 text-white/40">
                      {o.isco}
                    </td>
                    <td className="py-4 pr-4 font-medium">{o.name}</td>
                    <td className="py-4 pr-4 text-white/60">{o.examples}</td>
                    <td className="numeric py-4 pr-4 text-right text-white/80">
                      {workers.toLocaleString("en-BE")}k
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-2 w-40 overflow-hidden rounded-sm bg-white/10">
                          <div
                            className="h-full bg-accent"
                            style={{ width: bar(o.exposure) }}
                          />
                        </div>
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
