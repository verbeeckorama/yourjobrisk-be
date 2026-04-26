import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An AI Jevons paradox in Belgium? · Your Job Risk",
  description:
    "If AI makes cognitive work radically cheaper, Belgian employment in the exposed jobs may grow, not shrink. Where the early signs of an AI Jevons paradox would show up first — software, translation, legal, marketing, audit, customer support, healthcare — and which Belgian employers and institutions to watch.",
  keywords: [
    "AI Jevons paradox",
    "AI jobs Belgium",
    "AI banen België",
    "AI emplois Belgique",
    "AI exposure Belgium",
    "generative AI labour market",
    "AI productivity",
    "Belgian labour market 2026",
    "AI augmentation",
    "future of work Belgium",
  ],
  alternates: { canonical: "/jevons" },
  openGraph: {
    type: "article",
    title: "An AI Jevons paradox in Belgium?",
    description:
      "Cheaper cognitive work, more total demand, growing employment in the exposed jobs — the case, the early signs, the Belgian sectors to watch.",
    url: "/jevons",
    siteName: "Your Job Risk · Belgium",
    locale: "en_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "An AI Jevons paradox in Belgium?",
    description:
      "If AI makes cognitive work 10× cheaper, do we end up doing more of it — not less? The Belgian read.",
  },
};

type Signal = "early" | "mixed" | "none";

const signalMeta: Record<
  Signal,
  { short: string; pill: string; dot: string }
> = {
  early: {
    short: "Early signal",
    pill: "border-accent/40 bg-accent/10 text-accent",
    dot: "bg-accent",
  },
  mixed: {
    short: "Mixed signal",
    pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    dot: "bg-amber-400",
  },
  none: {
    short: "Not yet visible",
    pill: "border-white/15 bg-white/5 text-white/50",
    dot: "bg-white/30",
  },
};

type Sector = {
  title: string;
  signal: Signal;
  who: string;
  what: string;
  belgian: string;
  links: { label: string; href: string }[];
};

const sectors: Sector[] = [
  {
    title: "Software & data engineering",
    signal: "early",
    who: "Devs, data engineers, platform teams across Brussels–Antwerp–Leuven, plus Smals and the EU institutions.",
    what:
      "25–55% productivity uplifts on bounded coding tasks in published RCTs; total EU developer headcount still growing in 2024–2025; entry-level CS hiring visibly weaker than other graduate segments. Output up, composition reshaping toward senior.",
    belgian:
      "Agoria's annual Digital Skills Barometer continues to flag developer and data roles as structural shortage occupations even after two years of mass Copilot/Claude adoption. VDAB and Le Forem both keep ICT roles in the top knelpuntberoepen / métiers en pénurie lists. Belgian software employers — Odoo, Showpad, Collibra, Itineris, Smals, the EU agencies in Brussels — are still net hiring through 2025–2026 even as per-engineer output has visibly stepped up. The textbook Jevons signature.",
    links: [
      { label: "Agoria — Digital Skills Barometer", href: "https://www.agoria.be/en/themes/digitalisation" },
      { label: "VDAB Knelpuntberoepen", href: "https://www.vdab.be/trendsdoc/knelpuntberoepen.shtml" },
      { label: "Le Forem — métiers en pénurie", href: "https://www.leforem.be/entreprises/recruter/metiers-en-penurie.html" },
      { label: "GitHub Copilot RCT (Peng et al.)", href: "https://arxiv.org/abs/2302.06590" },
    ],
  },
  {
    title: "Translation & localisation",
    signal: "early",
    who: "EU institutions, NATO, the Belgian federal services, and a dense private localisation cluster (Yamagata Europe, Lionbridge BE, Lexitech).",
    what:
      "Per-word prices in steady decline; translated word volumes — especially in multilingual EU work — keep growing. Post-editing, terminology and quality assurance are the new shape of the job.",
    belgian:
      "DG Translation has run eTranslation as a productive tool for over a decade, and the Brussels EU bubble is one of Europe's largest single concentrations of language professionals. The Chambre Belge des Traducteurs et Interprètes (CBTI-BKVT) and the KU Leuven / UCLouvain / UMons translation programmes report a steady shift away from raw translation toward revision, terminology and AI quality control rather than collapse.",
    links: [
      { label: "EU eTranslation", href: "https://commission.europa.eu/resources-partners/etranslation_en" },
      { label: "DG Translation", href: "https://commission.europa.eu/about/departments-and-executive-agencies/translation_en" },
      { label: "CBTI-BKVT — Belgian translators association", href: "https://www.cbti-bkvt.org/en/" },
    ],
  },
  {
    title: "Customer support & contact centres",
    signal: "mixed",
    who: "Proximus, Telenet, Orange Belgium, KBC, Belfius, ING Belgium, AG Insurance, Engie BE — tier-1 and tier-2 service desks.",
    what:
      "Klarna, IKEA, BT and others reported large deflections to AI agents; Klarna later walked back parts of its claims. Total support employment has not collapsed, but the role mix is moving up the value chain. Whether this is steady-state Jevons or a transition is still open.",
    belgian:
      "Proximus has publicly described AI as central to its transformation plan and has already booked job impact in customer-facing roles. KBC's Kate assistant has been live for years and KBC continues to hire customer-experience staff around it. Telenet, Belfius and ING Belgium have all rolled out generative-AI assistants in 2024–2025. The early Belgian pattern is augmentation at the senior end and compression at tier-1 — visible in the layoff strip on the homepage.",
    links: [
      { label: "Proximus newsroom", href: "https://www.proximus.com/news.html" },
      { label: "KBC newsroom — Kate", href: "https://newsroom.kbc.com/" },
      { label: "Telenet press", href: "https://www2.telenet.be/en/about-telenet/press/" },
      { label: "Belfius press", href: "https://www.belfius.be/about-us/en/press/" },
    ],
  },
  {
    title: "Legal, compliance & regulatory",
    signal: "early",
    who: "Brussels Bar associates, in-house counsel and compliance officers in finance and pharma. Magic-circle and Belgian firms: Stibbe, Eubelius, Liedekerke, Loyens & Loeff, Linklaters and Clifford Chance Brussels.",
    what:
      "Tools like Harvey, CoCounsel and Lexis+ AI are cutting research and contract-review time sharply. Headcount is roughly flat to up; volume of matters reviewed is sharply up. The bottleneck has moved to partner sign-off and to compliance — both human.",
    belgian:
      "Belgium sits inside three regulatory waves at once — the EU AI Act, DORA for financial services, and the post-GDPR enforcement build-out by the APD/GBA. Each one expands work that must be signed off by a human lawyer or compliance officer. The Brussels EU practice is one of the largest single concentrations of regulatory work in Europe; AI cuts the research time, but the regulator still wants a name on the memo.",
    links: [
      { label: "EU AI Act overview", href: "https://artificialintelligenceact.eu/" },
      { label: "DORA — ESMA", href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora" },
      { label: "APD/GBA — Belgian DPA", href: "https://www.dataprotectionauthority.be/citizen" },
      { label: "Ordre des Barreaux Francophones et Germanophone", href: "https://avocats.be/" },
    ],
  },
  {
    title: "Marketing, brand & content",
    signal: "early",
    who: "In-house marketing teams in retail (Colruyt, Delhaize, AB InBev), telecom (Proximus, Telenet, Orange BE), FMCG and B2B HQs, plus Belgian agencies (mortierbrigade, Famous, BBDO Brussels, TBWA).",
    what:
      "Output per marketer has exploded; spend on paid distribution and on senior marketers who can direct AI pipelines is rising. Junior copy roles and content-mill freelancers are the casualty.",
    belgian:
      "UBA member surveys and BAM's annual marketing barometer describe a consistent pattern across Belgian advertisers in 2025: more campaigns, more variants, more NL/FR/EN localisation per market — produced by teams that grew at the senior end and shrank at the junior end. Multilingual delivery, historically a Belgian cost disadvantage, is becoming a Belgian Jevons advantage.",
    links: [
      { label: "UBA — United Brands Association", href: "https://www.ubabelgium.be/" },
      { label: "BAM — Belgian marketing barometer", href: "https://www.marketing.be/" },
      { label: "ACC Belgium — communication agencies", href: "https://www.accbelgium.be/" },
    ],
  },
  {
    title: "Audit, finance & controlling",
    signal: "mixed",
    who: "Big Four audit (PwC, Deloitte, EY, KPMG Belgium), corporate controllers and management accountants across BEL 20 firms.",
    what:
      "Spreadsheets did not kill accountants; AI may repeat the trick at a higher altitude. Per-engagement effort is falling; total volume of assurance and analysis work continues to grow under tightening reporting standards.",
    belgian:
      "CSRD and the Belgian transposition continue to expand the assurance perimeter (sustainability data, supplier reporting). The IBR-IRE (auditors institute) and ITAA (accountants and tax advisers) both report ongoing shortages, not surpluses, of qualified professionals through 2025–2026 — with AI tooling spreading on top of that demand, not in place of it.",
    links: [
      { label: "IBR-IRE — Institute of Auditors", href: "https://www.ibr-ire.be/en/" },
      { label: "ITAA — Belgian accountants & tax advisers", href: "https://www.itaa.be/en/" },
      { label: "FSMA", href: "https://www.fsma.be/en" },
    ],
  },
  {
    title: "Healthcare professionals using AI",
    signal: "none",
    who: "Radiology, pathology, primary care GPs, nursing leads across the UZ Leuven, UZ Brussel, UZA, CHU Liège and Cliniques Saint-Luc networks.",
    what:
      "Per-scan and per-record AI assistance is real and growing. But Belgium's aging demographics and the structural shortage of GPs and nurses push demand up faster than any conceivable efficiency gain pushes it down.",
    belgian:
      "RIZIV/INAMI data and the Federal Knowledge Centre (KCE) continue to project shortages, not surpluses, across most clinical roles through 2030. Domus Medica and the SSMG flag a worsening GP shortage, especially in Wallonia. AI here is a relief valve on workload, not a substitute for headcount — the textbook case of Jevons being dominated by underlying demand growth.",
    links: [
      { label: "RIZIV / INAMI", href: "https://www.riziv-inami.fgov.be/" },
      { label: "KCE — Federal Knowledge Centre", href: "https://kce.fgov.be/en" },
      { label: "Domus Medica", href: "https://www.domusmedica.be/" },
      { label: "Sciensano", href: "https://www.sciensano.be/en" },
    ],
  },
];

const conditions = [
  {
    n: "01",
    title: "People still want more of it",
    body:
      "Cheaper output has to pull in new buyers and new use-cases that didn't exist at the old price. Software, marketing, translation, legal research, customer support, design and analytics all show large unmet demand once the price drops.",
  },
  {
    n: "02",
    title: "Humans become more valuable, not less",
    body:
      "The worker stops producing the artefact by hand and starts directing, reviewing, integrating and signing off on what the AI produces. Each remaining person becomes more productive — and more valuable — not redundant.",
  },
  {
    n: "03",
    title: "A new bottleneck appears, and it's human",
    body:
      "Once the model can do the routine task, the constraint moves to judgement, taste, domain expertise, distribution, trust and regulatory sign-off. Those things still sit on people, so hiring shifts toward them.",
  },
];

const diagnostics = [
  "Output per worker jumps measurably (PRs merged, tickets resolved, words translated, contracts reviewed).",
  "Unit price of the output falls — or quality at fixed price rises sharply.",
  "Volume rises faster than price falls. Total spend on the task increases. (The diagnostic Jevons signal.)",
  "Job postings reshape, not just shrink: senior \"own the AI workflow\" roles rise, narrow producer roles fall, juniors are squeezed.",
  "Adjacent occupations boom (more code → more PMs, data engineers, security, compliance).",
  "Wages of the survivors rise even as headcount in the narrow specialism plateaus.",
];

export default function JevonsPage() {
  const earlyCount = sectors.filter((s) => s.signal === "early").length;
  const mixedCount = sectors.filter((s) => s.signal === "mixed").length;
  const noneCount = sectors.filter((s) => s.signal === "none").length;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline:
                "An AI Jevons paradox in Belgium? Where the early signs would show up first",
              description:
                "If AI makes cognitive work radically cheaper, Belgian employment in the exposed jobs may grow, not shrink. The Belgian read on the Jevons paradox.",
              inLanguage: "en",
              isPartOf: { "@type": "WebSite", name: "Your Job Risk · Belgium" },
              about: [
                "Artificial intelligence",
                "Labour market",
                "Belgium",
                "Jevons paradox",
              ],
              mainEntityOfPage: "/jevons",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "AI exposure", item: "/" },
                { "@type": "ListItem", position: 2, name: "Jevons paradox", item: "/jevons" },
              ],
            },
          ],
        }}
      />
      {/* HERO */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/50">
            Your Job Risk · Belgium · Counter-view
          </p>

          <h1 className="text-5xl font-semibold leading-[0.95] md:text-7xl">
            What if AI <span className="text-accent">grows</span> the jobs it
            looks like it&apos;s killing?
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            The rest of this site treats AI exposure as risk: tasks a model
            can do are tasks a worker might lose. This page flips the frame.
            If cognitive work gets 10× cheaper, history says total demand
            for it can <em>rise</em>, not fall. Coal in 1865. ATMs in the
            1990s. Code in 2026?
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#signals"
              className="inline-flex items-center rounded-sm border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-ink"
            >
              Belgian signals →
            </Link>
            <Link
              href="#phases"
              className="inline-flex items-center rounded-sm border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/60 hover:text-white"
            >
              Phase 1 vs Phase 2
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            <Stat value="1865" label="Year Jevons published" />
            <Stat value={`${earlyCount}`} label="BE sectors w/ early signal" accent />
            <Stat value={`${mixedCount}`} label="Mixed / unfolding" />
            <Stat value={`${noneCount}`} label="Not yet visible" />
          </div>
        </div>
      </section>

      {/* WHAT JEVONS SAID */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 01 · The original paradox
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            When something gets cheaper, we often use much more of it.
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="space-y-5 text-white/70 md:text-lg">
              <p>
                In <em>The Coal Question</em> (1865), William Stanley Jevons
                observed that as steam engines became more efficient,
                Britain burned <strong className="text-white">more</strong>{" "}
                coal, not less. Cheaper energy per unit of work expanded the
                set of things worth doing with energy.
              </p>
              <p>
                The modern restatement: when an input becomes cheaper, total
                consumption of that input can rise if demand is{" "}
                <strong className="text-white">price-elastic</strong> and
                there is{" "}
                <strong className="text-white">latent unmet demand</strong>.
                Lighting, computing, bandwidth and air travel have all
                walked this path.
              </p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                The AI Jevons claim, in one line
              </p>
              <p className="mt-4 text-lg leading-snug text-white md:text-xl">
                If generative AI cuts the unit cost of a cognitive task by an
                order of magnitude, total output of that task will rise — and
                so, in many cases, will employment of the humans who steer
                it.
              </p>
              <p className="mt-6 text-sm text-white/50">
                Historical analogues: ATMs and bank tellers (Bessen, 2015).
                Spreadsheets and accountants. Desktop publishing and graphic
                designers. E-discovery and paralegals. In every case the
                per-task cost collapsed, the &quot;X is dead&quot; headline
                ran loud, and employment in the occupation kept rising for
                years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CONDITIONS */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 02 · The three conditions
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Three things have to be true for AI to grow a job instead of
            killing it.
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            When AI makes a task much cheaper to do, employment in that
            occupation can <em>grow</em> — but only if all three of these
            conditions hold at once. If any one fails, you get
            displacement instead.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {conditions.map((c) => (
              <div
                key={c.n}
                className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="numeric text-xs uppercase tracking-[0.25em] text-accent">
                  {c.n}
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  {c.title}
                </div>
                <p className="mt-3 text-sm text-white/60 md:text-base">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC ORDER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 03 · What to look for, in order
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            A Jevons effect is visible before it is dominant.
          </h2>
          <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {diagnostics.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-6 py-5 text-sm md:text-base"
              >
                <span className="numeric w-10 shrink-0 text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/80">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BELGIAN SIGNALS */}
      <section id="signals" className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 04 · Where the signal is showing up — in Belgium
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Seven Belgian occupation clusters to watch first.
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            Each one is highly AI-exposed, has elastic demand, and has
            structural Belgian depth. The badge says how visible the
            Jevons-shaped signal is here today.
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/60">
            {(["early", "mixed", "none"] as Signal[]).map((s) => (
              <span key={s} className="inline-flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${signalMeta[s].dot}`}
                />
                {signalMeta[s].short}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sectors.map((s) => {
              const m = signalMeta[s.signal];
              return (
                <div
                  key={s.title}
                  className="flex flex-col rounded-sm border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {s.title}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-widest ${m.pill}`}
                    >
                      <span
                        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${m.dot}`}
                      />
                      {m.short}
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                    {s.who}
                  </p>
                  <p className="mt-4 text-sm text-white/70 md:text-base">
                    {s.what}
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-accent">
                      Belgian read
                    </p>
                    <p className="mt-2 text-sm text-white/70 md:text-base">
                      {s.belgian}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    {s.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-xs text-white/40">
            Caveat: at the macro level, neither Belgium&apos;s 2025 LFS nor
            the OECD Employment Outlook 2025 yet show AI as net job loss at
            the occupation-group level. That is consistent with a slow
            Jevons unwind <em>and</em> with delayed displacement. The
            sector-level signals above are the place this will become
            distinguishable first.
          </p>
        </div>
      </section>

      {/* WHERE IT BREAKS */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 05 · Where the Jevons argument breaks
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Four honest objections.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Objection
              title="Demand may be satiable"
              body="Elastic demand is an empirical question, not a theorem. If the world doesn't actually want 10× more legal memos, marketing copy or translated PDFs, lower unit cost just shrinks the wage bill."
            />
            <Objection
              title="Complementarity may not survive the next model"
              body="If the AI gets good enough to also do the review and integration step, the human bottleneck moves out of the occupation entirely. This is the agentic scenario and it is the strongest argument against a Jevons reading."
            />
            <Objection
              title="Distributional pain is real even if totals grow"
              body="Junior cohorts, narrow specialists, and workers without the tooling, language or training to ride the new workflow can lose badly while aggregates look healthy. A macro Jevons effect is cold comfort to a 24-year-old whose entry-level role just disappeared."
            />
            <Objection
              title="Adjustment is slow"
              body="Even in the optimistic reading, the gap between layoff announcement and the new hiring wave is years, not quarters. The Belgian social model makes that gap more survivable than most — but it does not erase it."
            />
          </div>
        </div>
      </section>

      {/* PHASE 1 / PHASE 2 */}
      <section id="phases" className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 06 · Synthesis
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Risk and Jevons aren&apos;t opposites. They&apos;re two phases of
            the same transition.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                Phase 01 · Today
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                The visible, painful one.
              </h3>
              <p className="mt-4 text-white/70">
                Firms book the productivity gain as cost reduction. Layoffs
                land in the high-AIOE roles. Juniors are first to be cut.
                The news cycle is dominated by displacement stories.
              </p>
              <p className="mt-4 text-sm text-white/50">
                Belgium is here today. The{" "}
                <Link href="/" className="text-accent underline">
                  layoff strip on the homepage
                </Link>{" "}
                is what phase one looks like.
              </p>
            </div>
            <div className="rounded-sm border border-accent/40 bg-accent/5 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                Phase 02 · The Jevons phase
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Prices fall. Volumes explode. Roles rebuild.
              </h3>
              <p className="mt-4 text-white/70">
                Headcount in the affected occupations stabilises or grows,
                but composition shifts permanently toward senior,
                integrative, accountability-bearing work.
              </p>
              <p className="mt-4 text-sm text-white/60">
                Whether Belgium spends three years or fifteen between the
                two phases — and how many workers fall through the gap —
                isn&apos;t a property of the technology. It&apos;s a policy
                and institutional choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FURTHER READING */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Section 07 · Further reading
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            The papers and primary sources behind this page.
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-3 font-mono text-sm text-white/70 md:grid-cols-2">
            <li>
              <SourceLink href="https://www.gutenberg.org/ebooks/8800">
                Jevons (1865) — The Coal Question
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://yalebooks.yale.edu/book/9780300195668/learning-by-doing/">
                Bessen (2015) — Learning by Doing
              </SourceLink>{" "}
              (ATMs &amp; bank tellers)
            </li>
            <li>
              <SourceLink href="https://www.nber.org/papers/w31161">
                Brynjolfsson, Li &amp; Raymond (2023) — Generative AI at Work
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://arxiv.org/abs/2302.06590">
                Peng et al. (2023) — Copilot RCT
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.anthropic.com/research/economic-index">
                Anthropic (2025) — Economic Index
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html">
                OECD Employment Outlook 2025
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.stlouisfed.org/on-the-economy/2025/sep/recent-graduates-labor-market-outcomes">
                St. Louis Fed (2025) — entry-level CS outcomes
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure">
                ILO (2025) — GenAI &amp; jobs: refined global index
              </SourceLink>
            </li>
          </ul>

          <p className="mt-12 text-xs uppercase tracking-[0.25em] text-white/50">
            Belgian institutional data
          </p>
          <ul className="mt-4 grid gap-x-10 gap-y-3 font-mono text-sm text-white/70 md:grid-cols-2">
            <li>
              <SourceLink href="https://www.nbb.be/en/publications-and-research/working-papers">
                NBB — Working Papers (productivity &amp; AI)
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://statbel.fgov.be/en/themes/work-training/labour-market">
                Statbel — Labour Force Survey
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.plan.be/databases/data-26-en-employment_by_branch_and_status">
                Federaal Planbureau / Bureau du Plan
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://cse.belgique.be/en">
                Hoge Raad voor de Werkgelegenheid / CSE
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.vbo-feb.be/en/">VBO-FEB — employer federation</SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.acerta.be/en/about-acerta/press">Acerta — HR market reports</SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.sdworx.com/en/press">SD Worx — HR market reports</SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.eurofound.europa.eu/en/country/belgium">
                Eurofound — Belgium country page
              </SourceLink>
            </li>
          </ul>

          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/" className="text-accent hover:underline">
              ← Back to the map
            </Link>
            <Link href="/methodology" className="text-accent hover:underline">
              Methodology →
            </Link>
            <Link href="/tool" className="text-accent hover:underline">
              Check my risk →
            </Link>
          </div>
        </div>
      </section>
    </main>
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

function Objection({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-white/70 md:text-base">{body}</p>
    </div>
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

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
