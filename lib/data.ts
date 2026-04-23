// Modeled AI-exposure figures for Belgium.
// Province exposure is a weighted composite built from sectoral employment
// mix (Statbel LFS 2024 annual release) combined with the Felten-Raj-Rock
// 2021 AI Occupational Exposure (AIOE) index aggregated to ISCO-08 major
// groups, cross-checked against Eloundou et al. (OpenAI 2023), ILO 2025,
// OECD Employment Outlook 2024/2025 and the Anthropic Economic Index 2025.
// Numbers are indicative (0 = low, 100 = high) and intended for narrative,
// not for policy use.

export type Province = {
  code: string;
  // Eurostat NUTS-2 identifier — matches feature.properties.id in be-provinces.geojson
  nuts: string;
  name: string;
  // Short label used on the map (≤ ~10 chars so it fits inside the smallest province)
  shortLabel: string;
  region: "Flanders" | "Wallonia" | "Brussels";
  // Employed residents (thousands), 2024 approx.
  workers: number;
  // Composite AI exposure score 0-100.
  exposure: number;
  note: string;
};

export const provinces: Province[] = [
  { code: "VWV", nuts: "BE25", name: "West Flanders", shortLabel: "W-Vl.", region: "Flanders", workers: 560, exposure: 47,
    note: "Manufacturing, logistics and tourism dampen cognitive exposure." },
  { code: "VOV", nuts: "BE23", name: "East Flanders", shortLabel: "O-Vl.", region: "Flanders", workers: 700, exposure: 55,
    note: "Ghent's universities and biotech raise the professional share." },
  { code: "VAN", nuts: "BE21", name: "Antwerp", shortLabel: "Antwerp", region: "Flanders", workers: 830, exposure: 58,
    note: "Port logistics offset by finance, chemicals R&D and HQs." },
  { code: "VLI", nuts: "BE22", name: "Limburg", shortLabel: "Limburg", region: "Flanders", workers: 400, exposure: 46,
    note: "Heavier manufacturing base than the Flemish average." },
  { code: "VBR", nuts: "BE24", name: "Flemish Brabant", shortLabel: "Vl-Br.", region: "Flanders", workers: 550, exposure: 63,
    note: "Leuven research corridor and Zaventem corporate cluster." },
  { code: "BRU", nuts: "BE10", name: "Brussels-Capital", shortLabel: "Brussels", region: "Brussels", workers: 490, exposure: 72,
    note: "EU institutions, finance, consulting — the most exposed region." },
  { code: "WBR", nuts: "BE31", name: "Walloon Brabant", shortLabel: "W-Br.", region: "Wallonia", workers: 175, exposure: 64,
    note: "Louvain-la-Neuve, pharma R&D and corporate back-offices." },
  { code: "WHT", nuts: "BE32", name: "Hainaut", shortLabel: "Hainaut", region: "Wallonia", workers: 480, exposure: 45,
    note: "Post-industrial economy with a lower knowledge-work share." },
  { code: "WNA", nuts: "BE35", name: "Namur", shortLabel: "Namur", region: "Wallonia", workers: 200, exposure: 50,
    note: "Walloon administrative capital lifts the clerical share." },
  { code: "WLG", nuts: "BE33", name: "Liège", shortLabel: "Liège", region: "Wallonia", workers: 420, exposure: 51,
    note: "Mixed industry and services; modest professional density." },
  { code: "WLX", nuts: "BE34", name: "Luxembourg", shortLabel: "Lux.", region: "Wallonia", workers: 120, exposure: 43,
    note: "Rural, agriculture and cross-border services into Luxembourg." },
];

export type OccupationGroup = {
  isco: string;
  name: string;
  shareOfEmployment: number; // fraction of Belgian employed, LFS 2023 approx.
  exposure: number; // AIOE-inspired 0-100.
  examples: string;
};

export const occupations: OccupationGroup[] = [
  {
    isco: "2",
    name: "Professionals",
    shareOfEmployment: 0.26,
    exposure: 75,
    examples: "Engineers, teachers, accountants, lawyers, analysts",
  },
  {
    isco: "4",
    name: "Clerical support workers",
    shareOfEmployment: 0.10,
    exposure: 82,
    examples: "Secretaries, bookkeeping clerks, call-centre staff",
  },
  {
    isco: "1",
    name: "Managers",
    shareOfEmployment: 0.07,
    exposure: 68,
    examples: "Corporate, administrative and production managers",
  },
  {
    isco: "3",
    name: "Technicians & associate professionals",
    shareOfEmployment: 0.17,
    exposure: 62,
    examples: "IT support, nurses, financial associates, technicians",
  },
  {
    isco: "5",
    name: "Service & sales workers",
    shareOfEmployment: 0.16,
    exposure: 38,
    examples: "Retail, hospitality, personal care, security",
  },
  {
    isco: "8",
    name: "Plant & machine operators",
    shareOfEmployment: 0.06,
    exposure: 32,
    examples: "Drivers, assembly-line and process operators",
  },
  {
    isco: "7",
    name: "Craft & related trades",
    shareOfEmployment: 0.09,
    exposure: 28,
    examples: "Electricians, welders, builders, mechanics",
  },
  {
    isco: "9",
    name: "Elementary occupations",
    shareOfEmployment: 0.07,
    exposure: 25,
    examples: "Cleaners, labourers, food preparation assistants",
  },
  {
    isco: "6",
    name: "Agricultural, forestry & fishery",
    shareOfEmployment: 0.01,
    exposure: 22,
    examples: "Farmers, foresters, fishers",
  },
  {
    isco: "0",
    name: "Armed forces",
    shareOfEmployment: 0.005,
    exposure: 35,
    examples: "Military personnel",
  },
];

// Headline aggregates ------------------------------------------------------

export const totalWorkersMillions =
  provinces.reduce((s, p) => s + p.workers, 0) / 1000; // ~5.0M

// "Elevated exposure" = occupation groups scoring >= 60 on AIOE.
export const elevatedShare = occupations
  .filter((o) => o.exposure >= 60)
  .reduce((s, o) => s + o.shareOfEmployment, 0); // ~0.60

export const elevatedWorkersMillions = +(totalWorkersMillions * elevatedShare).toFixed(1);

// Recent Belgium-linked AI-era layoff / restructuring announcements (public news).
// Numbers are reported figures; used narratively, not as precise ground truth.
// aiFactor classifies how plausibly AI / digital automation is a driver:
//   high   — explicit citation of automation, AI, digital transformation,
//            or the roles cut are overwhelmingly clerical/knowledge work
//            where generative AI is actively displacing tasks.
//   medium — transformation plan in a digitising industry where AI is one
//            plausible factor among several (cost, demand, regulation).
//   low    — primarily geopolitical, energy, demand or sector-specific
//            shocks; automation is not the stated or likely driver.
export type AiFactor = "high" | "medium" | "low";

export type Layoff = {
  company: string;
  roles: number;
  when: string;
  note: string;
  aiFactor: AiFactor;
  // Short rationale for why the AI factor is rated this way.
  why: string;
};

// Sourced from Belgian and European press (VRT, Brussels Times, Belga News
// Agency, Eurofound ERM, L'Echo/De Tijd) between April 2024 and April 2026.
// Figures are announced headcounts; final numbers may differ after
// negotiations under the Renault Law.
export const layoffs: Layoff[] = [
  { company: "Audi Brussels", roles: 3000, when: "2024-07",
    note: "Forest plant closure announced; production ended Feb 2025",
    aiFactor: "low",
    why: "Driven by Volkswagen Group EV strategy, site cost and demand for the Q8 e-tron — not automation." },
  { company: "Cora (Louis Delhaize)", roles: 1779, when: "2025-04",
    note: "All 7 Belgian hypermarkets to close by early 2026",
    aiFactor: "low",
    why: "Retail sector pressure and loss of a buyer for the chain; shop-floor jobs, not the roles most exposed to AI." },
  { company: "Van Hool", roles: 1600, when: "2024-04",
    note: "Bus manufacturer bankruptcy; partial takeover by VDL/Schouten",
    aiFactor: "low",
    why: "Classic industrial bankruptcy — cashflow, competition and demand, not AI displacement." },
  { company: "Proximus", roles: 1900, when: "2024-09",
    note: "Multi-year transformation plan, network & back-office automation",
    aiFactor: "high",
    why: "Telco explicitly cites digital transformation, AI in customer ops and back-office automation in its 'bold2025' plan." },
  { company: "bpost", roles: 900, when: "2024-10",
    note: "Back-office and mail-sorting restructuring",
    aiFactor: "medium",
    why: "Mail-volume decline is the headline cause, but targeted roles (clerical, sorting supervision) are squarely in the AI/automation exposure zone." },
  { company: "BASF Antwerp", roles: 600, when: "2025-10",
    note: "Cost-reduction plan, phased through 2028",
    aiFactor: "low",
    why: "Energy prices, Chinese competition and European chemicals demand — geopolitical/industrial shock." },
  { company: "BNP Paribas Fortis", roles: 550, when: "2024-11",
    note: "Branch network consolidation and IT restructuring",
    aiFactor: "high",
    why: "Branch closures driven by customers migrating to digital channels; back-office consolidation is a classic AI/automation vector." },
  { company: "ExxonMobil Belgium", roles: 337, when: "2025-09",
    note: "European reorganisation affecting Machelen HQ",
    aiFactor: "low",
    why: "Global oil-major footprint rationalisation; driven by energy strategy and European demand, not AI." },
  { company: "Syensqo", roles: 200, when: "2025-05",
    note: "Speciality chemicals spin-off, global restructuring",
    aiFactor: "low",
    why: "Post-Solvay-spin-off cost programme in response to economic uncertainty; no AI driver cited." },
  { company: "AGC Glass Europe", roles: 103, when: "2026-02",
    note: "Louvain-la-Neuve HQ, Gosselies R&D and sites nationwide",
    aiFactor: "medium",
    why: "Headquarters and R&D white-collar roles — the exact profile most exposed to AI productivity substitution." },
  { company: "Villeroy & Boch", roles: 60, when: "2025-09",
    note: "Closure of Belgian ceramics factory",
    aiFactor: "low",
    why: "Industrial closure driven by energy costs and European ceramics demand." },
  { company: "Pfizer Belgium", roles: 58, when: "2025-09",
    note: "Second collective redundancy at Puurs/HQ for 'efficiency'",
    aiFactor: "medium",
    why: "Pfizer has publicly tied ongoing 'operational efficiency' programmes to AI/digital tooling in commercial and back-office functions." },
  { company: "British American Tobacco", roles: 51, when: "2026-01",
    note: "Groot-Bijgaarden hub cuts amid tighter tobacco rules",
    aiFactor: "low",
    why: "Regulatory and excise pressure on tobacco — not an AI displacement story." },
];
