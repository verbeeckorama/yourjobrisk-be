"use client";

import Link from "next/link";
import { useLang, tr } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

type Signal = "early" | "mixed" | "none";

type Sector = {
  title: string;
  signal: Signal;
  who: string;
  what: string;
  belgian: string;
  links: { label: string; href: string }[];
};

type Phase = { eyebrow: string; title: string; p1: string; p2: string };

type Content = {
  // Hero
  eyebrow: string;
  h1Pre: string;
  h1Accent: string;
  h1Post: string;
  intro: string;
  ctaSignals: string;
  ctaPhases: string;
  statYear: string;
  statEarly: string;
  statMixed: string;
  statNone: string;
  // Section 01
  s1Eyebrow: string;
  s1Headline: string;
  s1P1: { pre: string; bold: string; post: string };
  s1P2: string;
  s1ClaimEyebrow: string;
  s1Claim: string;
  s1Analogues: string;
  // Section 02 (conditions)
  s2Eyebrow: string;
  s2Headline: string;
  s2Intro: string;
  conditions: { n: string; title: string; body: string }[];
  // Section 03 (diagnostics)
  s3Eyebrow: string;
  s3Headline: string;
  diagnostics: string[];
  // Section 04 (sectors)
  s4Eyebrow: string;
  s4Headline: string;
  s4Intro: string;
  signalEarly: string;
  signalMixed: string;
  signalNone: string;
  belgianRead: string;
  sectors: Sector[];
  s4Caveat: string;
  // Section 05 (objections)
  s5Eyebrow: string;
  s5Headline: string;
  objections: { title: string; body: string }[];
  // Section 06 (phases)
  s6Eyebrow: string;
  s6Headline: string;
  phase1: Phase;
  phase2: Phase;
  phase1HerePre: string;
  phase1HereLink: string;
  phase1HerePost: string;
  // Section 07 (sources)
  s7Eyebrow: string;
  s7Headline: string;
  s7BelgianHeader: string;
  backToMap: string;
  methodologyLink: string;
  toolLink: string;
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "Your Job Risk · Belgium · Counter-view",
    h1Pre: "What if AI ",
    h1Accent: "grows",
    h1Post: " the jobs it looks like it's killing?",
    intro:
      "The rest of this site treats AI exposure as risk: tasks a model can do are tasks a worker might lose. This page flips the frame. If cognitive work gets 10× cheaper, history says total demand for it can rise, not fall. Coal in 1865. ATMs in the 1990s. Code in 2026?",
    ctaSignals: "Belgian signals →",
    ctaPhases: "Phase 1 vs Phase 2",
    statYear: "Year Jevons published",
    statEarly: "BE sectors w/ early signal",
    statMixed: "Mixed / unfolding",
    statNone: "Not yet visible",
    s1Eyebrow: "Section 01 · The original paradox",
    s1Headline: "When something gets cheaper, we often use much more of it.",
    s1P1: {
      pre: "In The Coal Question (1865), William Stanley Jevons observed that as steam engines became more efficient, Britain burned ",
      bold: "more",
      post: " coal, not less. Cheaper energy per unit of work expanded the set of things worth doing with energy.",
    },
    s1P2:
      "The modern restatement: when an input becomes cheaper, total consumption of that input can rise if demand is price-elastic and there is latent unmet demand. Lighting, computing, bandwidth and air travel have all walked this path.",
    s1ClaimEyebrow: "The AI Jevons claim, in one line",
    s1Claim:
      "If generative AI cuts the unit cost of a cognitive task by an order of magnitude, total output of that task will rise — and so, in many cases, will employment of the humans who steer it.",
    s1Analogues:
      "Historical analogues: ATMs and bank tellers (Bessen, 2015). Spreadsheets and accountants. Desktop publishing and graphic designers. E-discovery and paralegals. In every case the per-task cost collapsed, the \"X is dead\" headline ran loud, and employment in the occupation kept rising for years.",
    s2Eyebrow: "Section 02 · The three conditions",
    s2Headline: "Three things have to be true for AI to grow a job instead of killing it.",
    s2Intro:
      "When AI makes a task much cheaper to do, employment in that occupation can grow — but only if all three of these conditions hold at once. If any one fails, you get displacement instead.",
    conditions: [
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
    ],
    s3Eyebrow: "Section 03 · What to look for, in order",
    s3Headline: "A Jevons effect is visible before it is dominant.",
    diagnostics: [
      "Output per worker jumps measurably (PRs merged, tickets resolved, words translated, contracts reviewed).",
      "Unit price of the output falls — or quality at fixed price rises sharply.",
      "Volume rises faster than price falls. Total spend on the task increases. (The diagnostic Jevons signal.)",
      "Job postings reshape, not just shrink: senior \"own the AI workflow\" roles rise, narrow producer roles fall, juniors are squeezed.",
      "Adjacent occupations boom (more code → more PMs, data engineers, security, compliance).",
      "Wages of the survivors rise even as headcount in the narrow specialism plateaus.",
    ],
    s4Eyebrow: "Section 04 · Where the signal is showing up — in Belgium",
    s4Headline: "Seven Belgian occupation clusters to watch first.",
    s4Intro:
      "Each one is highly AI-exposed, has elastic demand, and has structural Belgian depth. The badge says how visible the Jevons-shaped signal is here today.",
    signalEarly: "Early signal",
    signalMixed: "Mixed signal",
    signalNone: "Not yet visible",
    belgianRead: "Belgian read",
    sectors: [
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
    ],
    s4Caveat:
      "Caveat: at the macro level, neither Belgium's 2025 LFS nor the OECD Employment Outlook 2025 yet show AI as net job loss at the occupation-group level. That is consistent with a slow Jevons unwind and with delayed displacement. The sector-level signals above are the place this will become distinguishable first.",
    s5Eyebrow: "Section 05 · Where the Jevons argument breaks",
    s5Headline: "Four honest objections.",
    objections: [
      { title: "Demand may be satiable", body: "Elastic demand is an empirical question, not a theorem. If the world doesn't actually want 10× more legal memos, marketing copy or translated PDFs, lower unit cost just shrinks the wage bill." },
      { title: "Complementarity may not survive the next model", body: "If the AI gets good enough to also do the review and integration step, the human bottleneck moves out of the occupation entirely. This is the agentic scenario and it is the strongest argument against a Jevons reading." },
      { title: "Distributional pain is real even if totals grow", body: "Junior cohorts, narrow specialists, and workers without the tooling, language or training to ride the new workflow can lose badly while aggregates look healthy. A macro Jevons effect is cold comfort to a 24-year-old whose entry-level role just disappeared." },
      { title: "Adjustment is slow", body: "Even in the optimistic reading, the gap between layoff announcement and the new hiring wave is years, not quarters. The Belgian social model makes that gap more survivable than most — but it does not erase it." },
    ],
    s6Eyebrow: "Section 06 · Synthesis",
    s6Headline: "Risk and Jevons aren't opposites. They're two phases of the same transition.",
    phase1: {
      eyebrow: "Phase 01 · Today",
      title: "The visible, painful one.",
      p1: "Firms book the productivity gain as cost reduction. Layoffs land in the high-AIOE roles. Juniors are first to be cut. The news cycle is dominated by displacement stories.",
      p2: "",
    },
    phase1HerePre: "Belgium is here today. The ",
    phase1HereLink: "layoff strip on the homepage",
    phase1HerePost: " is what phase one looks like.",
    phase2: {
      eyebrow: "Phase 02 · The Jevons phase",
      title: "Prices fall. Volumes explode. Roles rebuild.",
      p1: "Headcount in the affected occupations stabilises or grows, but composition shifts permanently toward senior, integrative, accountability-bearing work.",
      p2: "Whether Belgium spends three years or fifteen between the two phases — and how many workers fall through the gap — isn't a property of the technology. It's a policy and institutional choice.",
    },
    s7Eyebrow: "Section 07 · Further reading",
    s7Headline: "The papers and primary sources behind this page.",
    s7BelgianHeader: "Belgian institutional data",
    backToMap: "← Back to the map",
    methodologyLink: "Methodology →",
    toolLink: "Check my risk →",
  },

  nl: {
    eyebrow: "Jouw Job Risico · België · Tegenargument",
    h1Pre: "Wat als AI de jobs die hij lijkt te killen, juist ",
    h1Accent: "doet groeien",
    h1Post: "?",
    intro:
      "De rest van deze site behandelt AI-blootstelling als risico: taken die een model aankan, zijn taken die een werknemer kan verliezen. Deze pagina draait dat om. Als kenniswerk 10× goedkoper wordt, leert de geschiedenis dat de totale vraag ernaar kan stíjgen, niet dalen. Steenkool in 1865. Geldautomaten in de jaren '90. Code in 2026?",
    ctaSignals: "Belgische signalen →",
    ctaPhases: "Fase 1 vs fase 2",
    statYear: "Jaar dat Jevons publiceerde",
    statEarly: "BE-sectoren met vroeg signaal",
    statMixed: "Gemengd / nog onduidelijk",
    statNone: "Nog niet zichtbaar",
    s1Eyebrow: "Sectie 01 · De oorspronkelijke paradox",
    s1Headline: "Als iets goedkoper wordt, gebruiken we er vaak véél meer van.",
    s1P1: {
      pre: "In The Coal Question (1865) merkte William Stanley Jevons op dat naarmate stoommachines efficiënter werden, Brittannië ",
      bold: "méér",
      post: " steenkool verbrandde, niet minder. Goedkopere energie per eenheid arbeid breidde de set van zinvolle toepassingen voor energie uit.",
    },
    s1P2:
      "De moderne herformulering: wanneer een input goedkoper wordt, kan het totale verbruik ervan stijgen als de vraag prijs-elastisch is en er latente, onvervulde vraag bestaat. Verlichting, computerkracht, bandbreedte en luchtvervoer hebben dit pad allemaal afgelegd.",
    s1ClaimEyebrow: "De AI-Jevons-claim, in één zin",
    s1Claim:
      "Als generatieve AI de eenheidsprijs van een cognitieve taak met een orde van grootte verlaagt, zal de totale output van die taak stijgen — en in veel gevallen ook de tewerkstelling van de mensen die die taak aansturen.",
    s1Analogues:
      "Historische analogieën: geldautomaten en bankloketten (Bessen, 2015). Spreadsheets en boekhouders. Desktop publishing en grafisch ontwerpers. E-discovery en juridische assistenten. Telkens stortte de kost per taak in, schreeuwde de pers \"X is dood\", en bleef de tewerkstelling in dat beroep jaren stijgen.",
    s2Eyebrow: "Sectie 02 · De drie voorwaarden",
    s2Headline: "Drie dingen moeten waar zijn opdat AI een job laat groeien in plaats van haar te vernietigen.",
    s2Intro:
      "Wanneer AI een taak veel goedkoper maakt, kan de tewerkstelling in dat beroep groeien — maar alleen als alle drie deze voorwaarden tegelijk gelden. Faalt één ervan, dan krijg je verdringing.",
    conditions: [
      {
        n: "01",
        title: "Mensen willen er nog steeds méér van",
        body:
          "Goedkopere output moet nieuwe kopers en nieuwe toepassingen aantrekken die bij de oude prijs niet bestonden. Software, marketing, vertaling, juridisch onderzoek, klantenservice, design en analyse vertonen allemaal grote onvervulde vraag zodra de prijs daalt.",
      },
      {
        n: "02",
        title: "Mensen worden méér waard, niet minder",
        body:
          "De werknemer stopt met het stuk handmatig produceren en gaat sturen, reviewen, integreren en aftekenen wat de AI maakt. Elke overgebleven persoon wordt productiever — en waardevoller — niet overbodig.",
      },
      {
        n: "03",
        title: "Een nieuwe bottleneck verschijnt, en die is menselijk",
        body:
          "Zodra het model de routinetaak aankan, verschuift de beperking naar oordeel, smaak, domeinexpertise, distributie, vertrouwen en regulatoire goedkeuring. Die zaken zitten nog steeds bij mensen, dus de aanwervingen verschuiven daarheen.",
      },
    ],
    s3Eyebrow: "Sectie 03 · Waar je naar moet kijken, in volgorde",
    s3Headline: "Een Jevons-effect is zichtbaar voordat het dominant wordt.",
    diagnostics: [
      "De output per werknemer springt meetbaar omhoog (gemergde PR's, opgeloste tickets, vertaalde woorden, gereviewde contracten).",
      "De eenheidsprijs van de output daalt — of de kwaliteit bij gelijke prijs stijgt sterk.",
      "Het volume stijgt sneller dan de prijs daalt. De totale uitgaven aan de taak nemen toe. (Het diagnostische Jevons-signaal.)",
      "Vacatures hervormen, ze krimpen niet alleen: senior \"eigenaar van de AI-workflow\"-rollen stijgen, smalle producentenrollen dalen, juniors worden uitgeknepen.",
      "Aanverwante beroepen boomen (meer code → meer PM's, data-engineers, security, compliance).",
      "De lonen van de overlevenden stijgen, zelfs als het personeelsbestand in de smalle specialisatie stabiliseert.",
    ],
    s4Eyebrow: "Sectie 04 · Waar het signaal opduikt — in België",
    s4Headline: "Zeven Belgische beroepenclusters om eerst in de gaten te houden.",
    s4Intro:
      "Elk ervan is sterk AI-blootgesteld, kent een elastische vraag en heeft structurele Belgische diepte. Het label geeft aan hoe zichtbaar het Jevons-vormige signaal er vandaag is.",
    signalEarly: "Vroeg signaal",
    signalMixed: "Gemengd signaal",
    signalNone: "Nog niet zichtbaar",
    belgianRead: "Belgische lezing",
    sectors: [
      {
        title: "Software & data engineering",
        signal: "early",
        who: "Devs, data-engineers, platformteams in Brussel–Antwerpen–Leuven, plus Smals en de EU-instellingen.",
        what:
          "25–55% productiviteitswinst op afgebakende codeertaken in gepubliceerde RCT's; het totale aantal EU-developers groeit nog steeds in 2024–2025; instromende CS-aanwervingen zijn duidelijk zwakker dan andere afgestudeerdensegmenten. Output stijgt, samenstelling verschuift naar senior.",
        belgian:
          "De jaarlijkse Digital Skills Barometer van Agoria blijft developer- en data-rollen aanmerken als structurele knelpuntberoepen, zelfs na twee jaar massale Copilot/Claude-adoptie. VDAB en Le Forem houden ICT-rollen bovenaan de knelpuntenlijsten. Belgische softwarewerkgevers — Odoo, Showpad, Collibra, Itineris, Smals, de EU-agentschappen in Brussel — werven netto nog steeds aan in 2025–2026, terwijl de output per engineer zichtbaar omhoog is gegaan. De klassieke Jevons-handtekening.",
        links: [
          { label: "Agoria — Digital Skills Barometer", href: "https://www.agoria.be/en/themes/digitalisation" },
          { label: "VDAB knelpuntberoepen", href: "https://www.vdab.be/trendsdoc/knelpuntberoepen.shtml" },
          { label: "Le Forem — métiers en pénurie", href: "https://www.leforem.be/entreprises/recruter/metiers-en-penurie.html" },
          { label: "GitHub Copilot RCT (Peng et al.)", href: "https://arxiv.org/abs/2302.06590" },
        ],
      },
      {
        title: "Vertaling & lokalisatie",
        signal: "early",
        who: "EU-instellingen, NAVO, de Belgische federale diensten, en een dichte private lokalisatiecluster (Yamagata Europe, Lionbridge BE, Lexitech).",
        what:
          "De prijs per woord daalt gestaag; het vertaalde woordvolume — vooral in meertalig EU-werk — blijft groeien. Post-editing, terminologie en kwaliteitscontrole zijn de nieuwe vorm van het beroep.",
        belgian:
          "DG Translation gebruikt eTranslation al meer dan tien jaar als productieve tool, en de Brusselse EU-bubbel is een van Europa's grootste concentraties taalprofessionals. De Belgische Kamer van Vertalers en Tolken (CBTI-BKVT) en de vertaalopleidingen aan KU Leuven / UCLouvain / UMons rapporteren een gestage verschuiving van pure vertaling naar revisie, terminologie en AI-kwaliteitscontrole, geen ineenstorting.",
        links: [
          { label: "EU eTranslation", href: "https://commission.europa.eu/resources-partners/etranslation_en" },
          { label: "DG Translation", href: "https://commission.europa.eu/about/departments-and-executive-agencies/translation_en" },
          { label: "CBTI-BKVT — Belgische vertalers", href: "https://www.cbti-bkvt.org/en/" },
        ],
      },
      {
        title: "Klantenservice & contactcenters",
        signal: "mixed",
        who: "Proximus, Telenet, Orange Belgium, KBC, Belfius, ING Belgium, AG Insurance, Engie BE — eerste- en tweedelijns servicedesks.",
        what:
          "Klarna, IKEA, BT en anderen meldden grote deflecties naar AI-agents; Klarna trok later delen van die claims terug. De totale tewerkstelling in support is niet ingestort, maar de rolmix schuift op in de waardeketen. Of dit een steady-state Jevons of een tijdelijke transitie is, blijft open.",
        belgian:
          "Proximus heeft AI publiekelijk centraal gezet in zijn transformatieplan en heeft al jobimpact geboekt in klantgerichte rollen. KBC's Kate-assistent is al jaren live en KBC blijft customer-experience-medewerkers aanwerven rond die assistent. Telenet, Belfius en ING Belgium hebben in 2024–2025 allemaal generatieve-AI-assistenten uitgerold. Het vroege Belgische patroon: augmentatie aan de seniorkant en compressie in tier-1 — zichtbaar in de ontslagstrip op de homepage.",
        links: [
          { label: "Proximus newsroom", href: "https://www.proximus.com/news.html" },
          { label: "KBC newsroom — Kate", href: "https://newsroom.kbc.com/" },
          { label: "Telenet pers", href: "https://www2.telenet.be/en/about-telenet/press/" },
          { label: "Belfius pers", href: "https://www.belfius.be/about-us/en/press/" },
        ],
      },
      {
        title: "Juridisch, compliance & regulering",
        signal: "early",
        who: "Brusselse balieadvocaten, in-house juristen en compliance officers in finance en farma. Magic-circle en Belgische kantoren: Stibbe, Eubelius, Liedekerke, Loyens & Loeff, Linklaters en Clifford Chance Brussels.",
        what:
          "Tools als Harvey, CoCounsel en Lexis+ AI verkorten onderzoek en contractreview drastisch. Het personeelsbestand is ongeveer vlak tot stijgend; het volume gereviewde dossiers stijgt fors. De bottleneck is verschoven naar partner-aftekening en compliance — beide menselijk.",
        belgian:
          "België zit middenin drie regulatoire golven tegelijk — de EU AI Act, DORA voor financiële diensten en de post-AVG handhaving door GBA/APD. Elke golf vergroot het werk dat door een menselijke jurist of compliance officer afgetekend moet worden. De Brusselse EU-praktijk is een van Europa's grootste concentraties regulatorisch werk; AI verkort het onderzoek, maar de toezichthouder wil nog steeds een naam onder het memo.",
        links: [
          { label: "EU AI Act overzicht", href: "https://artificialintelligenceact.eu/" },
          { label: "DORA — ESMA", href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora" },
          { label: "APD/GBA — Belgische DPA", href: "https://www.dataprotectionauthority.be/citizen" },
          { label: "Ordre des Barreaux Francophones et Germanophone", href: "https://avocats.be/" },
        ],
      },
      {
        title: "Marketing, brand & content",
        signal: "early",
        who: "In-house marketingteams in retail (Colruyt, Delhaize, AB InBev), telecom (Proximus, Telenet, Orange BE), FMCG en B2B-hoofdkantoren, plus Belgische bureaus (mortierbrigade, Famous, BBDO Brussels, TBWA).",
        what:
          "De output per marketeer is geëxplodeerd; de uitgaven aan paid distribution en aan senior marketeers die AI-pijplijnen kunnen aansturen, stijgen. Junior copy-rollen en content-mill-freelancers zijn de slachtoffers.",
        belgian:
          "De ledenenquêtes van UBA en de jaarlijkse marketingbarometer van BAM beschrijven een consistent patroon bij Belgische adverteerders in 2025: meer campagnes, meer varianten, meer NL/FR/EN-lokalisatie per markt — geproduceerd door teams die aan de seniorkant zijn gegroeid en aan de juniorkant zijn gekrompen. Meertalige output, historisch een Belgisch kostennadeel, wordt een Belgisch Jevons-voordeel.",
        links: [
          { label: "UBA — United Brands Association", href: "https://www.ubabelgium.be/" },
          { label: "BAM — Belgische marketingbarometer", href: "https://www.marketing.be/" },
          { label: "ACC Belgium — communicatiebureaus", href: "https://www.accbelgium.be/" },
        ],
      },
      {
        title: "Audit, finance & controlling",
        signal: "mixed",
        who: "Big Four (PwC, Deloitte, EY, KPMG Belgium), corporate controllers en management accountants in BEL 20-bedrijven.",
        what:
          "Spreadsheets hebben boekhouders niet gedood; AI doet die truc misschien op een hoger niveau over. De inzet per opdracht daalt; het totale volume aan zekerheid- en analysewerk blijft groeien onder steeds strengere rapporteringsnormen.",
        belgian:
          "CSRD en de Belgische omzetting blijven de assurance-perimeter uitbreiden (duurzaamheidsdata, leveranciersrapportering). Het IBR-IRE (auditors) en het ITAA (accountants en belastingadviseurs) rapporteren beide aanhoudende tekorten — geen overschotten — aan gekwalificeerde professionals door 2025–2026, mét AI-tooling boven op die vraag, niet in plaats ervan.",
        links: [
          { label: "IBR-IRE — Instituut van de Bedrijfsrevisoren", href: "https://www.ibr-ire.be/en/" },
          { label: "ITAA — Belgische accountants & belastingadviseurs", href: "https://www.itaa.be/en/" },
          { label: "FSMA", href: "https://www.fsma.be/en" },
        ],
      },
      {
        title: "Zorgprofessionals die AI gebruiken",
        signal: "none",
        who: "Radiologie, pathologie, huisartsen, hoofdverpleegkundigen in de netwerken van UZ Leuven, UZ Brussel, UZA, CHU Liège en Cliniques Saint-Luc.",
        what:
          "AI-ondersteuning per scan en per dossier is reëel en groeit. Maar de Belgische vergrijzing en de structurele tekorten aan huisartsen en verpleegkundigen drijven de vraag sneller op dan welke denkbare efficiëntiewinst dan ook ze naar beneden duwt.",
        belgian:
          "RIZIV/INAMI-data en het Federaal Kenniscentrum (KCE) blijven tekorten projecteren — geen overschotten — voor de meeste klinische rollen tot 2030. Domus Medica en de SSMG signaleren een verergerend huisartsentekort, vooral in Wallonië. AI is hier een ontlastingsklep op de werkdruk, geen vervanger voor mensen — het schoolvoorbeeld van Jevons gedomineerd door onderliggende vraaggroei.",
        links: [
          { label: "RIZIV / INAMI", href: "https://www.riziv-inami.fgov.be/" },
          { label: "KCE — Federaal Kenniscentrum", href: "https://kce.fgov.be/en" },
          { label: "Domus Medica", href: "https://www.domusmedica.be/" },
          { label: "Sciensano", href: "https://www.sciensano.be/en" },
        ],
      },
    ],
    s4Caveat:
      "Voorbehoud: op macroniveau tonen noch de Belgische LFS 2025 noch de OECD Employment Outlook 2025 al een netto AI-jobverlies op het niveau van beroepsgroepen. Dat is consistent met een trage Jevons-ontvouwing én met uitgestelde verdringing. De sectorsignalen hierboven zijn de plek waar dit eerst onderscheidbaar wordt.",
    s5Eyebrow: "Sectie 05 · Waar het Jevons-argument breekt",
    s5Headline: "Vier eerlijke tegenargumenten.",
    objections: [
      { title: "De vraag kan verzadigd raken", body: "Elastische vraag is een empirische kwestie, geen theorema. Als de wereld eigenlijk geen 10× méér juridische memo's, marketingtekst of vertaalde PDF's wil, krimpt een lagere eenheidsprijs gewoon de loonsom." },
      { title: "Complementariteit overleeft het volgende model misschien niet", body: "Als de AI ook goed genoeg wordt om de review- en integratiestap te doen, verdwijnt de menselijke bottleneck volledig uit het beroep. Dat is het agentic-scenario en is het sterkste argument tegen een Jevons-lezing." },
      { title: "Verdelingspijn is reëel, ook als de totalen groeien", body: "Junior cohorten, smalle specialisten en werknemers zonder de tools, taal of opleiding om de nieuwe workflow te berijden, kunnen flink verliezen terwijl de aggregaten er gezond uitzien. Een macro-Jevons-effect is een schrale troost voor een 24-jarige wiens instaprol net is verdwenen." },
      { title: "Aanpassing gaat traag", body: "Zelfs in de optimistische lezing zit er jaren — geen kwartalen — tussen de ontslagaankondiging en de nieuwe aanwervingsgolf. Het Belgische sociaal model maakt die kloof leefbaarder dan elders, maar wist hem niet uit." },
    ],
    s6Eyebrow: "Sectie 06 · Synthese",
    s6Headline: "Risico en Jevons zijn geen tegenpolen. Het zijn twee fasen van dezelfde transitie.",
    phase1: {
      eyebrow: "Fase 01 · Vandaag",
      title: "De zichtbare, pijnlijke fase.",
      p1: "Bedrijven boeken de productiviteitswinst als kostenreductie. Ontslagen vallen in de hoge AIOE-rollen. Juniors worden eerst geschrapt. De nieuwsstroom wordt gedomineerd door verdringingsverhalen.",
      p2: "",
    },
    phase1HerePre: "België zit hier vandaag. De ",
    phase1HereLink: "ontslagstrip op de homepage",
    phase1HerePost: " is hoe fase één eruitziet.",
    phase2: {
      eyebrow: "Fase 02 · De Jevons-fase",
      title: "Prijzen dalen. Volumes exploderen. Rollen herorganiseren zich.",
      p1: "Het personeelsbestand in de getroffen beroepen stabiliseert of groeit, maar de samenstelling verschuift permanent naar senior, integratief en verantwoordelijkheidsdragend werk.",
      p2: "Of België drie of vijftien jaar tussen de twee fasen doorbrengt — en hoeveel werknemers door de gleuf vallen — is geen eigenschap van de technologie. Het is een beleidskeuze en een institutionele keuze.",
    },
    s7Eyebrow: "Sectie 07 · Verder lezen",
    s7Headline: "De papers en primaire bronnen achter deze pagina.",
    s7BelgianHeader: "Belgische institutionele data",
    backToMap: "← Terug naar de kaart",
    methodologyLink: "Methodologie →",
    toolLink: "Bereken mijn risico →",
  },

  fr: {
    eyebrow: "Votre risque emploi · Belgique · Thèse inverse",
    h1Pre: "Et si l'IA faisait ",
    h1Accent: "grandir",
    h1Post: " les emplois qu'elle semble tuer ?",
    intro:
      "Le reste du site traite l'exposition à l'IA comme un risque : les tâches qu'un modèle peut faire sont des tâches qu'un travailleur peut perdre. Cette page renverse le cadre. Si le travail cognitif devient 10× moins cher, l'histoire dit que la demande totale peut augmenter, pas diminuer. Le charbon en 1865. Les distributeurs dans les années 90. Le code en 2026 ?",
    ctaSignals: "Signaux belges →",
    ctaPhases: "Phase 1 vs phase 2",
    statYear: "Année de publication de Jevons",
    statEarly: "Secteurs BE avec signal précoce",
    statMixed: "Mixte / en cours",
    statNone: "Pas encore visible",
    s1Eyebrow: "Section 01 · Le paradoxe original",
    s1Headline: "Quand quelque chose devient moins cher, on en consomme souvent beaucoup plus.",
    s1P1: {
      pre: "Dans The Coal Question (1865), William Stanley Jevons a observé qu'à mesure que les machines à vapeur devenaient plus efficaces, la Grande-Bretagne brûlait ",
      bold: "plus",
      post: " de charbon, pas moins. Une énergie moins chère par unité de travail élargissait l'ensemble des choses qu'il valait la peine de faire avec de l'énergie.",
    },
    s1P2:
      "Reformulation moderne : quand un intrant devient moins cher, sa consommation totale peut augmenter si la demande est élastique aux prix et qu'il existe une demande latente non satisfaite. L'éclairage, le calcul, la bande passante et le transport aérien ont tous suivi ce chemin.",
    s1ClaimEyebrow: "La thèse Jevons-IA, en une ligne",
    s1Claim:
      "Si l'IA générative réduit le coût unitaire d'une tâche cognitive d'un ordre de grandeur, la production totale de cette tâche augmentera — et, dans bien des cas, l'emploi des humains qui la pilotent aussi.",
    s1Analogues:
      "Analogues historiques : distributeurs et guichetiers (Bessen, 2015). Tableurs et comptables. PAO et graphistes. E-discovery et parajuristes. À chaque fois, le coût par tâche s'est effondré, le titre \"X est mort\" a fait du bruit, et l'emploi dans le métier a continué de croître pendant des années.",
    s2Eyebrow: "Section 02 · Les trois conditions",
    s2Headline: "Trois choses doivent être vraies pour que l'IA fasse grandir un métier au lieu de le tuer.",
    s2Intro:
      "Quand l'IA rend une tâche bien moins chère, l'emploi dans ce métier peut grandir — mais seulement si ces trois conditions sont réunies en même temps. Si l'une fait défaut, vous obtenez du remplacement.",
    conditions: [
      {
        n: "01",
        title: "Les gens en veulent toujours plus",
        body:
          "Une production moins chère doit attirer de nouveaux acheteurs et des cas d'usage qui n'existaient pas à l'ancien prix. Logiciel, marketing, traduction, recherche juridique, support, design et analytique présentent tous une forte demande non satisfaite dès que le prix tombe.",
      },
      {
        n: "02",
        title: "Les humains gagnent en valeur, ils n'en perdent pas",
        body:
          "Le travailleur cesse de produire l'artefact à la main et se met à diriger, réviser, intégrer et signer ce que l'IA produit. Chaque personne restante devient plus productive — et plus précieuse — pas obsolète.",
      },
      {
        n: "03",
        title: "Un nouveau goulet d'étranglement apparaît, et il est humain",
        body:
          "Une fois le modèle capable de la tâche routinière, la contrainte se déplace vers le jugement, le goût, l'expertise métier, la distribution, la confiance et la validation réglementaire. Tout cela repose toujours sur des humains, donc l'embauche s'y déplace.",
      },
    ],
    s3Eyebrow: "Section 03 · Ce qu'il faut surveiller, dans l'ordre",
    s3Headline: "Un effet Jevons est visible avant d'être dominant.",
    diagnostics: [
      "La production par travailleur saute mesurablement (PR mergées, tickets résolus, mots traduits, contrats revus).",
      "Le prix unitaire de la production baisse — ou la qualité à prix constant grimpe nettement.",
      "Le volume monte plus vite que le prix ne baisse. La dépense totale sur la tâche augmente. (Le signal diagnostique de Jevons.)",
      "Les offres d'emploi se reforment, elles ne se contentent pas de diminuer : les rôles seniors \"propriétaire du flux IA\" montent, les rôles producteurs étroits chutent, les juniors sont compressés.",
      "Les métiers adjacents explosent (plus de code → plus de PM, data engineers, sécurité, conformité).",
      "Les salaires des survivants augmentent même si l'effectif dans la spécialité étroite plafonne.",
    ],
    s4Eyebrow: "Section 04 · Là où le signal apparaît — en Belgique",
    s4Headline: "Sept clusters professionnels belges à surveiller en premier.",
    s4Intro:
      "Chacun est fortement exposé à l'IA, présente une demande élastique et possède une profondeur structurelle belge. L'étiquette indique à quel point le signal en forme de Jevons est visible ici aujourd'hui.",
    signalEarly: "Signal précoce",
    signalMixed: "Signal mixte",
    signalNone: "Pas encore visible",
    belgianRead: "Lecture belge",
    sectors: [
      {
        title: "Logiciel & data engineering",
        signal: "early",
        who: "Devs, data engineers, équipes plateforme à Bruxelles–Anvers–Louvain, plus Smals et les institutions européennes.",
        what:
          "Hausse de productivité de 25–55% sur des tâches de codage bornées dans les RCT publiées ; les effectifs développeurs UE continuent de croître en 2024–2025 ; l'embauche junior CS est nettement plus faible que les autres segments diplômés. Production en hausse, composition redirigée vers le senior.",
        belgian:
          "Le Digital Skills Barometer annuel d'Agoria continue de classer les rôles développeur et data comme métiers en pénurie structurelle, même après deux ans d'adoption massive de Copilot/Claude. VDAB et Le Forem maintiennent les rôles ICT en tête des listes de métiers en pénurie. Les employeurs logiciels belges — Odoo, Showpad, Collibra, Itineris, Smals, les agences européennes à Bruxelles — embauchent toujours en net en 2025–2026, même quand la production par ingénieur a visiblement augmenté. La signature classique de Jevons.",
        links: [
          { label: "Agoria — Digital Skills Barometer", href: "https://www.agoria.be/en/themes/digitalisation" },
          { label: "VDAB knelpuntberoepen", href: "https://www.vdab.be/trendsdoc/knelpuntberoepen.shtml" },
          { label: "Le Forem — métiers en pénurie", href: "https://www.leforem.be/entreprises/recruter/metiers-en-penurie.html" },
          { label: "GitHub Copilot RCT (Peng et al.)", href: "https://arxiv.org/abs/2302.06590" },
        ],
      },
      {
        title: "Traduction & localisation",
        signal: "early",
        who: "Institutions européennes, OTAN, services fédéraux belges, et un cluster privé dense (Yamagata Europe, Lionbridge BE, Lexitech).",
        what:
          "Le prix au mot baisse régulièrement ; les volumes de mots traduits — surtout en travail européen multilingue — continuent de croître. Post-édition, terminologie et contrôle qualité sont la nouvelle forme du métier.",
        belgian:
          "DG Traduction utilise eTranslation comme outil productif depuis plus d'une décennie, et la bulle européenne de Bruxelles est l'une des plus grandes concentrations de professionnels des langues d'Europe. La Chambre Belge des Traducteurs et Interprètes (CBTI-BKVT) et les programmes de traduction de la KU Leuven / UCLouvain / UMons rapportent un glissement continu de la traduction brute vers la révision, la terminologie et le contrôle qualité de l'IA — pas un effondrement.",
        links: [
          { label: "EU eTranslation", href: "https://commission.europa.eu/resources-partners/etranslation_en" },
          { label: "DG Traduction", href: "https://commission.europa.eu/about/departments-and-executive-agencies/translation_en" },
          { label: "CBTI-BKVT — traducteurs belges", href: "https://www.cbti-bkvt.org/en/" },
        ],
      },
      {
        title: "Service client & centres de contact",
        signal: "mixed",
        who: "Proximus, Telenet, Orange Belgium, KBC, Belfius, ING Belgium, AG Insurance, Engie BE — service desks de niveaux 1 et 2.",
        what:
          "Klarna, IKEA, BT et d'autres ont annoncé de fortes déflexions vers des agents IA ; Klarna est ensuite revenu sur une partie de ses propos. L'emploi total dans le support ne s'est pas effondré, mais la composition des rôles remonte la chaîne de valeur. Jevons stabilisé ou simple transition : la question reste ouverte.",
        belgian:
          "Proximus a publiquement placé l'IA au cœur de son plan de transformation et a déjà acté un impact emploi sur les rôles en contact avec la clientèle. L'assistant Kate de KBC tourne depuis des années et KBC continue d'embaucher du personnel customer experience autour de lui. Telenet, Belfius et ING Belgium ont déployé des assistants IA générative en 2024–2025. Le motif belge précoce : augmentation côté senior et compression au tier 1 — visible dans la bande des plans sociaux sur la page d'accueil.",
        links: [
          { label: "Proximus newsroom", href: "https://www.proximus.com/news.html" },
          { label: "KBC newsroom — Kate", href: "https://newsroom.kbc.com/" },
          { label: "Telenet presse", href: "https://www2.telenet.be/en/about-telenet/press/" },
          { label: "Belfius presse", href: "https://www.belfius.be/about-us/en/press/" },
        ],
      },
      {
        title: "Juridique, conformité & réglementaire",
        signal: "early",
        who: "Avocats du barreau de Bruxelles, juristes d'entreprise et compliance officers en finance et pharma. Cabinets magic-circle et belges : Stibbe, Eubelius, Liedekerke, Loyens & Loeff, Linklaters et Clifford Chance Brussels.",
        what:
          "Des outils comme Harvey, CoCounsel et Lexis+ AI réduisent fortement le temps de recherche et de revue contractuelle. Les effectifs sont stables à en hausse ; le volume de dossiers revus est en forte hausse. Le goulot s'est déplacé vers la signature des associés et la conformité — tous deux humains.",
        belgian:
          "La Belgique se trouve au cœur de trois vagues réglementaires en même temps — l'AI Act européen, DORA pour les services financiers, et la montée en puissance post-RGPD de l'APD/GBA. Chacune élargit le travail qui doit être signé par un avocat ou compliance officer humain. La pratique européenne de Bruxelles est l'une des plus grandes concentrations de travail réglementaire d'Europe ; l'IA réduit le temps de recherche, mais le régulateur veut toujours un nom au bas du mémo.",
        links: [
          { label: "Aperçu de l'AI Act", href: "https://artificialintelligenceact.eu/" },
          { label: "DORA — ESMA", href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora" },
          { label: "APD/GBA — DPA belge", href: "https://www.dataprotectionauthority.be/citizen" },
          { label: "Ordre des Barreaux Francophones et Germanophone", href: "https://avocats.be/" },
        ],
      },
      {
        title: "Marketing, marque & contenu",
        signal: "early",
        who: "Équipes marketing internes en retail (Colruyt, Delhaize, AB InBev), télécom (Proximus, Telenet, Orange BE), FMCG et sièges B2B, plus les agences belges (mortierbrigade, Famous, BBDO Brussels, TBWA).",
        what:
          "La production par marketeur a explosé ; les dépenses en distribution payée et en marketeurs seniors capables de piloter des pipelines IA augmentent. Les rôles juniors de copy et les freelances de content-mill sont les victimes.",
        belgian:
          "Les enquêtes UBA et le baromètre marketing annuel de BAM décrivent un schéma cohérent chez les annonceurs belges en 2025 : plus de campagnes, plus de variantes, plus de localisation NL/FR/EN par marché — produites par des équipes qui ont grossi côté senior et rétréci côté junior. La livraison multilingue, historiquement un désavantage de coût belge, devient un avantage Jevons belge.",
        links: [
          { label: "UBA — United Brands Association", href: "https://www.ubabelgium.be/" },
          { label: "BAM — baromètre marketing belge", href: "https://www.marketing.be/" },
          { label: "ACC Belgium — agences de communication", href: "https://www.accbelgium.be/" },
        ],
      },
      {
        title: "Audit, finance & contrôle de gestion",
        signal: "mixed",
        who: "Big Four (PwC, Deloitte, EY, KPMG Belgium), contrôleurs financiers et management accountants des entreprises BEL 20.",
        what:
          "Les tableurs n'ont pas tué les comptables ; l'IA pourrait répéter le tour à un niveau plus élevé. L'effort par mission baisse ; le volume total de travail d'assurance et d'analyse continue de croître sous des normes de reporting de plus en plus strictes.",
        belgian:
          "La CSRD et sa transposition belge continuent d'élargir le périmètre d'assurance (données durabilité, reporting fournisseurs). L'IBR-IRE (réviseurs) et l'ITAA (experts-comptables et conseillers fiscaux) signalent tous deux des pénuries continues — pas des excédents — de professionnels qualifiés jusqu'en 2025–2026, l'outillage IA s'ajoutant à cette demande, sans s'y substituer.",
        links: [
          { label: "IBR-IRE — Institut des Réviseurs", href: "https://www.ibr-ire.be/en/" },
          { label: "ITAA — comptables & conseillers fiscaux belges", href: "https://www.itaa.be/en/" },
          { label: "FSMA", href: "https://www.fsma.be/en" },
        ],
      },
      {
        title: "Soignants utilisant l'IA",
        signal: "none",
        who: "Radiologie, pathologie, médecins généralistes, cadres infirmiers dans les réseaux de UZ Leuven, UZ Brussel, UZA, CHU Liège et Cliniques Saint-Luc.",
        what:
          "L'assistance IA par scanner et par dossier est réelle et croissante. Mais la démographie vieillissante de la Belgique et la pénurie structurelle de généralistes et d'infirmiers poussent la demande à la hausse plus vite que toute efficience plausible ne la pousse à la baisse.",
        belgian:
          "Les données INAMI/RIZIV et le Centre Fédéral d'Expertise (KCE) continuent de projeter des pénuries — pas des excédents — sur la plupart des rôles cliniques jusqu'en 2030. Domus Medica et la SSMG signalent une pénurie de généralistes qui s'aggrave, surtout en Wallonie. L'IA est ici une soupape sur la charge de travail, pas un substitut aux effectifs — le cas d'école d'un Jevons dominé par la croissance sous-jacente de la demande.",
        links: [
          { label: "RIZIV / INAMI", href: "https://www.riziv-inami.fgov.be/" },
          { label: "KCE — Centre Fédéral d'Expertise", href: "https://kce.fgov.be/en" },
          { label: "Domus Medica", href: "https://www.domusmedica.be/" },
          { label: "Sciensano", href: "https://www.sciensano.be/en" },
        ],
      },
    ],
    s4Caveat:
      "Réserve : au niveau macro, ni l'enquête sur les forces de travail belge 2025 ni l'OECD Employment Outlook 2025 ne montrent encore l'IA comme perte nette d'emplois au niveau des grands groupes professionnels. Cela est compatible avec un déploiement lent du Jevons et avec un déplacement différé. Les signaux sectoriels ci-dessus sont l'endroit où cela deviendra distinguable en premier.",
    s5Eyebrow: "Section 05 · Là où l'argument Jevons casse",
    s5Headline: "Quatre objections honnêtes.",
    objections: [
      { title: "La demande peut être saturable", body: "L'élasticité de la demande est une question empirique, pas un théorème. Si le monde ne veut pas vraiment 10× plus de mémos juridiques, de copy marketing ou de PDF traduits, un coût unitaire plus bas ne fait que rétrécir la masse salariale." },
      { title: "La complémentarité peut ne pas survivre au prochain modèle", body: "Si l'IA devient assez bonne pour faire aussi l'étape de revue et d'intégration, le goulot humain sort entièrement du métier. C'est le scénario agentique et c'est l'argument le plus fort contre une lecture Jevons." },
      { title: "La douleur distributive est réelle même si les totaux croissent", body: "Les cohortes juniors, les spécialistes étroits et les travailleurs sans l'outillage, la langue ou la formation pour monter dans le nouveau flux peuvent perdre lourdement pendant que les agrégats ont l'air sains. Un effet Jevons macro est une maigre consolation pour un jeune de 24 ans dont le rôle d'entrée vient de disparaître." },
      { title: "L'ajustement est lent", body: "Même dans la lecture optimiste, l'écart entre l'annonce de licenciements et la nouvelle vague d'embauches se compte en années, pas en trimestres. Le modèle social belge rend cet écart plus survivable qu'ailleurs — mais ne l'efface pas." },
    ],
    s6Eyebrow: "Section 06 · Synthèse",
    s6Headline: "Risque et Jevons ne sont pas opposés. Ce sont deux phases d'une même transition.",
    phase1: {
      eyebrow: "Phase 01 · Aujourd'hui",
      title: "La phase visible et douloureuse.",
      p1: "Les entreprises comptabilisent le gain de productivité comme réduction de coûts. Les licenciements tombent dans les rôles à fort AIOE. Les juniors sont les premiers coupés. Le cycle médiatique est dominé par les histoires de remplacement.",
      p2: "",
    },
    phase1HerePre: "La Belgique en est là aujourd'hui. La ",
    phase1HereLink: "bande des plans sociaux sur la page d'accueil",
    phase1HerePost: " est ce à quoi ressemble la phase un.",
    phase2: {
      eyebrow: "Phase 02 · La phase Jevons",
      title: "Les prix tombent. Les volumes explosent. Les rôles se reconstruisent.",
      p1: "Les effectifs dans les métiers concernés se stabilisent ou grandissent, mais la composition glisse durablement vers le travail senior, intégrateur, porteur de responsabilité.",
      p2: "Que la Belgique passe trois ans ou quinze entre les deux phases — et combien de travailleurs tombent dans la faille — n'est pas une propriété de la technologie. C'est un choix politique et institutionnel.",
    },
    s7Eyebrow: "Section 07 · Pour aller plus loin",
    s7Headline: "Les articles et sources primaires derrière cette page.",
    s7BelgianHeader: "Données institutionnelles belges",
    backToMap: "← Retour à la carte",
    methodologyLink: "Méthodologie →",
    toolLink: "Calculer mon risque →",
  },
};

const signalMeta: Record<
  Signal,
  { pill: string; dot: string }
> = {
  early: {
    pill: "border-accent/40 bg-accent/10 text-accent",
    dot: "bg-accent",
  },
  mixed: {
    pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    dot: "bg-amber-400",
  },
  none: {
    pill: "border-white/15 bg-white/5 text-white/50",
    dot: "bg-white/30",
  },
};

export default function JevonsContent() {
  const lang = useLang();
  const c = content[lang];
  const earlyCount = c.sectors.filter((s) => s.signal === "early").length;
  const mixedCount = c.sectors.filter((s) => s.signal === "mixed").length;
  const noneCount = c.sectors.filter((s) => s.signal === "none").length;

  const signalShort = (s: Signal) =>
    s === "early" ? c.signalEarly : s === "mixed" ? c.signalMixed : c.signalNone;

  return (
    <main>
      {/* HERO */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.eyebrow}
          </p>
          <h1 className="text-5xl font-semibold leading-[0.95] md:text-7xl">
            {c.h1Pre}
            <span className="text-accent">{c.h1Accent}</span>
            {c.h1Post}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {c.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#signals"
              className="inline-flex items-center rounded-sm border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-ink"
            >
              {c.ctaSignals}
            </Link>
            <Link
              href="#phases"
              className="inline-flex items-center rounded-sm border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/60 hover:text-white"
            >
              {c.ctaPhases}
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            <Stat value="1865" label={c.statYear} />
            <Stat value={`${earlyCount}`} label={c.statEarly} accent />
            <Stat value={`${mixedCount}`} label={c.statMixed} />
            <Stat value={`${noneCount}`} label={c.statNone} />
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s1Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s1Headline}
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="space-y-5 text-white/70 md:text-lg">
              <p>
                {c.s1P1.pre}
                <strong className="text-white">{c.s1P1.bold}</strong>
                {c.s1P1.post}
              </p>
              <p>{c.s1P2}</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                {c.s1ClaimEyebrow}
              </p>
              <p className="mt-4 text-lg leading-snug text-white md:text-xl">
                {c.s1Claim}
              </p>
              <p className="mt-6 text-sm text-white/50">{c.s1Analogues}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s2Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s2Headline}
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">{c.s2Intro}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.conditions.map((cond) => (
              <div
                key={cond.n}
                className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="numeric text-xs uppercase tracking-[0.25em] text-accent">
                  {cond.n}
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  {cond.title}
                </div>
                <p className="mt-3 text-sm text-white/60 md:text-base">
                  {cond.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03 */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s3Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s3Headline}
          </h2>
          <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {c.diagnostics.map((d, i) => (
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

      {/* Section 04 — sectors */}
      <section id="signals" className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s4Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s4Headline}
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">{c.s4Intro}</p>

          <div className="mt-8 flex flex-wrap gap-5 text-xs text-white/60">
            {(["early", "mixed", "none"] as Signal[]).map((s) => (
              <span key={s} className="inline-flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${signalMeta[s].dot}`}
                />
                {signalShort(s)}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {c.sectors.map((s) => {
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
                      {signalShort(s.signal)}
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
                      {c.belgianRead}
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

          <p className="mt-8 max-w-3xl text-xs text-white/40">{c.s4Caveat}</p>
        </div>
      </section>

      {/* Section 05 — objections */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s5Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s5Headline}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {c.objections.map((o) => (
              <div
                key={o.title}
                className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{o.title}</h3>
                <p className="mt-3 text-sm text-white/70 md:text-base">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 06 — phases */}
      <section id="phases" className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s6Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s6Headline}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                {c.phase1.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {c.phase1.title}
              </h3>
              <p className="mt-4 text-white/70">{c.phase1.p1}</p>
              <p className="mt-4 text-sm text-white/50">
                {c.phase1HerePre}
                <Link href="/" className="text-accent underline">
                  {c.phase1HereLink}
                </Link>
                {c.phase1HerePost}
              </p>
            </div>
            <div className="rounded-sm border border-accent/40 bg-accent/5 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                {c.phase2.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {c.phase2.title}
              </h3>
              <p className="mt-4 text-white/70">{c.phase2.p1}</p>
              {c.phase2.p2 && (
                <p className="mt-4 text-sm text-white/60">{c.phase2.p2}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 — sources (link list stays as-is) */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s7Eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.s7Headline}
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-3 font-mono text-sm text-white/70 md:grid-cols-2">
            <li>
              <SourceLink href="https://archive.org/details/coalquestionani00jevogoog">
                Jevons (1865) — The Coal Question
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://yalebooks.yale.edu/book/9780300195668/learning-by-doing/">
                Bessen (2015) — Learning by Doing
              </SourceLink>
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
              <SourceLink href="https://www.anthropic.com/news/the-anthropic-economic-index">
                Anthropic (2025) — Economic Index
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html">
                OECD Employment Outlook 2025
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure">
                ILO (2025) — GenAI &amp; jobs: refined global index
              </SourceLink>
            </li>
          </ul>

          <p className="mt-12 text-xs uppercase tracking-[0.25em] text-white/50">
            {c.s7BelgianHeader}
          </p>
          <ul className="mt-4 grid gap-x-10 gap-y-3 font-mono text-sm text-white/70 md:grid-cols-2">
            <li>
              <SourceLink href="https://www.nbb.be/en/publications-research/research-and-academic-cooperation">
                NBB — Research &amp; academic cooperation
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://statbel.fgov.be/en/themes/work-training/labour-market">
                Statbel — Labour Force Survey
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.plan.be/">
                Federaal Planbureau / Bureau du Plan
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://cse.belgique.be/en">
                Hoge Raad voor de Werkgelegenheid / CSE
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.vbo-feb.be/en/">
                VBO-FEB — employer federation
              </SourceLink>
            </li>
            <li>
              <SourceLink href="https://www.eurofound.europa.eu/en">
                Eurofound
              </SourceLink>
            </li>
          </ul>

          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/" className="text-accent hover:underline">
              {c.backToMap}
            </Link>
            <Link href="/methodology" className="text-accent hover:underline">
              {c.methodologyLink}
            </Link>
            <Link href="/tool" className="text-accent hover:underline">
              {c.toolLink}
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
