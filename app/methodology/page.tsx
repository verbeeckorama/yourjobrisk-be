import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — how the Belgian AI-exposure scores are built",
  description:
    "Province exposure scores, occupation rankings (ISCO-08) and layoff classifications for Belgium, fully sourced. AIOE (Felten, Raj & Rock 2021) cross-checked with Eloundou et al. 2023, ILO 2025, OECD Employment Outlook 2025 and the Anthropic Economic Index. Belgian employment from Statbel LFS 2024.",
  keywords: [
    "AIOE",
    "Felten Raj Rock",
    "ISCO-08",
    "Statbel LFS 2024",
    "AI exposure methodology",
    "OECD Employment Outlook 2025",
    "ILO Generative AI",
    "Anthropic Economic Index",
    "Belgian labour market",
  ],
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology — Your Job Risk Belgium",
    description:
      "How province scores, occupation rankings and layoff classifications are built, with every source.",
    url: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
        Methodology
      </p>
      <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
        How these numbers are built — and what they are not.
      </h1>
      <p className="mt-6 text-lg text-white/70">
        This page walks through every figure on the site: the province
        exposure scores, the occupation ranking, the layoff classifications,
        and the deliberate choices that shaped each one.
      </p>

      <Section title="1. What &quot;AI exposure&quot; means here">
        <p>
          Exposure is <em>not</em> displacement. A high score means a job is
          made up of tasks that today&apos;s AI systems (large language
          models, vision systems, tabular ML, process automation) can do
          part of the work for. Whether that leads to layoffs, augmentation,
          new jobs or nothing visible depends on firm strategy, institutions
          and policy.
        </p>
        <p>
          The underlying construct is the{" "}
          <strong>AI Occupational Exposure (AIOE) index</strong> from{" "}
          <em>Felten, Raj &amp; Rock (2021)</em>, which links applications
          of AI to the O*NET abilities that an occupation relies on.
          Treat the 0–100 number as a <em>relative ranking</em> of
          cognitive task exposure, not a probability of job loss.
        </p>
      </Section>

      <Section title="2. Occupation scores (ISCO-08 major groups)">
        <p>
          The AIOE is defined at the US SOC occupation level. For Belgium
          the site works at the coarser ISCO-08 <em>major-group</em> level
          (1 through 9) because:
        </p>
        <ul>
          <li>
            Statbel publishes Belgian employment at the ISCO major-group
            level consistently and openly.
          </li>
          <li>
            Crosswalking each 4-digit SOC to 4-digit ISCO would introduce
            false precision for a narrative site like this.
          </li>
        </ul>
        <p>
          For each ISCO major group, the score shown is an
          employment-weighted AIOE average of the SOCs that map into that
          group, rescaled to 0–100 so clerical support (the most exposed
          group) sits around 82 and agriculture around 22. The
          <em>examples</em> in each row are representative, not exhaustive.
        </p>
        <p>
          The AIOE numbers are <strong>cross-checked</strong> against more
          recent task-exposure work that captures generative AI
          specifically — Eloundou et&nbsp;al.&nbsp;(OpenAI, 2023) on GPT
          exposure, the ILO&apos;s <em>Generative AI and Jobs</em>
          refreshes (2023 and the 2025 update), the OECD Employment
          Outlook 2023–2025 chapters on AI, and the{" "}
          <em>Anthropic Economic Index</em> (2025), which measures what
          tasks Claude users are actually delegating to the model. All
          four agree on the direction of the ranking, even where absolute
          scores differ.
        </p>
      </Section>

      <Section title="3. Province exposure scores">
        <p>
          Each province gets a single composite score by combining:
        </p>
        <ol>
          <li>
            <strong>Occupation mix:</strong> the share of that province&apos;s
            employed residents in each ISCO major group, from the Belgian
            Labour Force Survey (Statbel LFS, 2024 annual release).
          </li>
          <li>
            <strong>Occupation AIOE:</strong> the group-level scores from
            step&nbsp;2.
          </li>
          <li>
            <strong>Sector adjustment:</strong> a small correction for
            province-level sector intensity (e.g. EU institutions in
            Brussels, chemicals in Antwerp, auto/logistics in Limburg,
            retail/services in Luxembourg province) drawn from Eurostat
            regional accounts.
          </li>
        </ol>
        <p>
          The resulting score is rescaled to 0–100 so Brussels-Capital sits
          near the top (72) and Luxembourg province at the bottom (43). Two
          things to remember:
        </p>
        <ul>
          <li>
            It reflects <strong>where workers live</strong>, not where they
            work. Cross-border commuting into Brussels is significant but
            not explicitly modelled.
          </li>
          <li>
            The sector adjustment is <em>indicative</em>. I did not run
            this through Statbel&apos;s detailed regional sector tables or
            reweight by firm size — both would move scores by a few points.
          </li>
        </ul>
      </Section>

      <Section title="4. Province totals and headline numbers">
        <p>
          The{" "}
          <strong>~5.0 M workers</strong> figure is the sum of modelled
          employed residents per province (rounded Statbel 2024 numbers),
          and sits within a few percent of the official Belgian employed
          population.
        </p>
        <p>
          The <strong>&quot;at elevated AI exposure&quot;</strong> aggregate
          counts workers in ISCO groups scoring ≥ 60 on the occupation
          scale — professionals, managers, technicians and clerical
          support. That&apos;s a defensible threshold but it is a
          threshold: move it to 55 or 65 and the headline changes by
          roughly ±0.5&nbsp;M.
        </p>
      </Section>

      <Section title="5. Layoff classification (AI likely / plausible / non-AI)">
        <p>
          Every restructuring announcement in the last 24 months is tagged
          with an editorial <strong>AI factor</strong>. The rubric is:
        </p>
        <ul>
          <li>
            <strong className="text-accent">AI likely</strong> — the
            company explicitly cites AI, automation, digital transformation
            or back-office modernisation as a driver, <em>and</em> the roles
            being cut sit in occupation groups the AIOE flags as highly
            exposed. Example: Proximus&apos; transformation plan, BNP
            Paribas Fortis branch + IT consolidation.
          </li>
          <li>
            <strong className="text-amber-300">AI plausible</strong> —
            stated cause is primarily market, demand or regulation, but the
            <em>profile of roles cut</em> (clerical, HQ, R&amp;D support)
            sits in the high-exposure zone. Example: bpost back-office,
            AGC Glass HQ / R&amp;D, Pfizer commercial efficiency.
          </li>
          <li>
            <strong className="text-white/60">Non-AI</strong> — the
            restructuring is primarily a geopolitical, energy, demand or
            sector-specific shock, targeting roles (production, retail,
            plant) the AIOE does not flag. Example: Audi Brussels, Cora,
            Van Hool, BASF Antwerp, ExxonMobil, Villeroy &amp; Boch, BAT.
          </li>
        </ul>
        <p>
          These tags are <strong>judgements, not causal attribution.</strong>{" "}
          The counterfactual — &quot;would this layoff have happened in a
          world without generative AI?&quot; — is genuinely unknowable.
          Hover a tag on the homepage to see the one-line rationale.
        </p>
      </Section>

      <Section title="6. What this site is not">
        <ul>
          <li>
            Not a forecast. There is no Monte Carlo simulation, no 2030 /
            2035 projection, no &quot;X% of jobs will be lost&quot; claim.
          </li>
          <li>
            Not a policy tool. The figures are indicative, intended to
            frame a conversation, not to size a training budget or a
            regional transition plan.
          </li>
          <li>
            Not commercial. There are no ads, trackers, email captures or
            affiliate links.
          </li>
        </ul>
      </Section>

      <Section title="7. Sources">
        <p className="text-white/60">
          Core exposure construct:
        </p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://onlinelibrary.wiley.com/doi/abs/10.1002/smj.3286">
              Felten, Raj &amp; Rock (2021)
            </SourceLink>{" "}
            — Occupational, industry, and geographic exposure to AI
            (AIOE index). Preprint:{" "}
            <SourceLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3368605">
              SSRN 3368605
            </SourceLink>
            .
          </li>
          <li>
            <SourceLink href="https://www.onetonline.org/">
              O*NET Online
            </SourceLink>{" "}
            — abilities &amp; work activities. Raw database:{" "}
            <SourceLink href="https://www.onetcenter.org/database.html">
              onetcenter.org
            </SourceLink>
            .
          </li>
        </ul>
        <p className="mt-4 text-white/60">
          Cross-checked against more recent task-exposure work:
        </p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://arxiv.org/abs/2303.10130">
              Eloundou, Manning, Mishkin &amp; Rock (2023)
            </SourceLink>{" "}
            — &quot;GPTs are GPTs: An early look at the labor market impact
            potential of large language models&quot; (OpenAI).
          </li>
          <li>
            <SourceLink href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure">
              ILO (2025)
            </SourceLink>{" "}
            — Generative AI and Jobs: a refined global index of
            occupational exposure (update of the 2023 working paper).
          </li>
          <li>
            <SourceLink href="https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html">
              OECD Employment Outlook 2025
            </SourceLink>{" "}
            · <SourceLink href="https://www.oecd.org/en/publications/oecd-employment-outlook-2023_08785bba-en.html">
              2023 edition
            </SourceLink>{" "}
            — AI chapters on exposure, adoption and workplace use.
          </li>
          <li>
            <SourceLink href="https://www.anthropic.com/research/economic-index">
              Anthropic (2025) — Economic Index
            </SourceLink>{" "}
            — task-level analysis of what Claude is actually used for.
          </li>
          <li>
            <SourceLink href="https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379">
              IMF SDN 2024/01
            </SourceLink>{" "}
            — Gen-AI: artificial intelligence and the future of work.
          </li>
        </ul>
        <p className="mt-4 text-white/60">Belgian labour and geography:</p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://statbel.fgov.be/en/themes/work-training/labour-market/employment-and-unemployment">
              Statbel — Labour Force Survey
            </SourceLink>{" "}
            (2024 annual release).
          </li>
          <li>
            <SourceLink href="https://statbel.fgov.be/en/themes/work-training/labour-market/employment-and-unemployment#figures">
              Statbel — Employed residents by province
            </SourceLink>{" "}
            (2024).
          </li>
          <li>
            <SourceLink href="https://ec.europa.eu/eurostat/web/regions/database">
              Eurostat — regional accounts
            </SourceLink>{" "}
            (NUTS-2, 2024 release).
          </li>
          <li>
            <SourceLink href="https://ec.europa.eu/eurostat/web/nuts/background">
              Eurostat — NUTS-2 2021 classification
            </SourceLink>{" "}
            · boundaries via{" "}
            <SourceLink href="https://github.com/eurostat/Nuts2json">
              Nuts2json
            </SourceLink>{" "}
            (1:20M, EPSG:4326).
          </li>
        </ul>
        <p className="mt-4 text-white/60">Layoff announcements (April 2024 – April 2026):</p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://www.vrt.be/vrtnws/en/">VRT NWS</SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://www.brusselstimes.com/">
              The Brussels Times
            </SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://www.belganewsagency.eu/">
              Belga News Agency
            </SourceLink>
          </li>
          <li>
            <SourceLink href="https://www.lecho.be/">L&apos;Echo</SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://www.tijd.be/">De Tijd</SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://www.rtbf.be/">RTBF</SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://www.hln.be/">HLN</SourceLink>
          </li>
          <li>
            <SourceLink href="https://www.eurofound.europa.eu/en/observatories/emcc/european-restructuring-monitor">
              Eurofound — European Restructuring Monitor (ERM)
            </SourceLink>
          </li>
        </ul>
        <p className="mt-6 text-xs text-white/50">
          Last data refresh: April 2026. The AIOE itself has not been
          rewritten since 2021 — newer work (ILO, OECD, Anthropic) extends
          it rather than replacing it, so the ranking is stable; absolute
          levels should be read with a wider confidence band than the
          two-digit scores suggest.
        </p>
      </Section>

      <Section title="8. Corrections">
        <p>
          If a number is wrong, a layoff is missing, or a classification
          is unfair to a company, the code and data are in a single file
          (<code>lib/data.ts</code>) in the repository — open an issue or a
          pull request and it can be fixed in minutes.
        </p>
      </Section>

      <div className="mt-20 border-t border-white/10 pt-8">
        <Link
          href="/"
          className="text-sm text-accent hover:underline"
        >
          ← Back to the map
        </Link>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-white/10 pt-10">
      <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
      <div className="prose-invert mt-4 space-y-4 text-white/70 [&_a]:text-accent [&_a]:underline [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_strong]:text-white">
        {children}
      </div>
    </section>
  );
}

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
    >
      {children}
    </a>
  );
}
