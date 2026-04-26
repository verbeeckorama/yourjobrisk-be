// Lightweight client-side i18n for the static-exported site.
// Detection: localStorage('lang') > navigator.languages match > 'en'.

export type Lang = "en" | "nl" | "fr";

export const LANGS: Lang[] = ["en", "nl", "fr"];

export const LANG_LABEL: Record<Lang, string> = {
  en: "EN",
  nl: "NL",
  fr: "FR",
};

export const LANG_FULL: Record<Lang, string> = {
  en: "English",
  nl: "Nederlands",
  fr: "Français",
};

export function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("lang");
  if (stored === "en" || stored === "nl" || stored === "fr") return stored;
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language ?? "en"];
  for (const c of candidates) {
    const lc = c.toLowerCase();
    if (lc.startsWith("nl")) return "nl";
    if (lc.startsWith("fr")) return "fr";
    if (lc.startsWith("en")) return "en";
  }
  return "en";
}

// ---------------------------------------------------------------------------
// SHARED UI strings (nav, hero, footer, page chrome).
// ---------------------------------------------------------------------------

type T = Record<Lang, string>;

export const t = {
  // Site nav
  navTagline: { en: "Your Job Risk", nl: "Jouw Job Risico", fr: "Votre risque emploi" } as T,
  navMethodology: { en: "Methodology →", nl: "Methodologie →", fr: "Méthodologie →" } as T,
  navAiExposure: { en: "AI exposure", nl: "AI-blootstelling", fr: "Exposition à l'IA" } as T,
  navAiExposureBlurb: {
    en: "Map · provinces · occupations · layoffs",
    nl: "Kaart · provincies · beroepen · ontslagen",
    fr: "Carte · provinces · métiers · licenciements",
  } as T,
  navCheckRisk: { en: "Check my risk", nl: "Bereken mijn risico", fr: "Calculer mon risque" } as T,
  navCheckRiskBlurb: {
    en: "Pick a province, role and scenario",
    nl: "Kies provincie, beroep en scenario",
    fr: "Province, métier et scénario",
  } as T,
  navJevons: { en: "Jevons paradox?", nl: "Jevons-paradox?", fr: "Paradoxe de Jevons ?" } as T,
  navJevonsBlurb: {
    en: "The counter-view: more jobs, not fewer",
    nl: "De tegenstelling: méér jobs, niet minder",
    fr: "La thèse inverse : plus d'emplois, pas moins",
  } as T,
  navViewing: { en: "● Viewing", nl: "● Bekijken", fr: "● Affiché" } as T,

  // Hero
  heroEyebrow: {
    en: "Your Job Risk · Belgium edition",
    nl: "Jouw Job Risico · Belgische editie",
    fr: "Votre risque emploi · édition belge",
  } as T,
  heroJobs: { en: "jobs.", nl: "jobs.", fr: "emplois." } as T,
  heroEmployers: { en: "employers.", nl: "werkgevers.", fr: "employeurs." } as T,
  heroYears: { en: "2 years.", nl: "2 jaar.", fr: "2 ans." } as T,
  heroSubtitle: {
    en: "AI-era restructuring isn't a future event in Belgium. It is showing up in corporate plans, call-centre floors and back-office teams — province by province, role by role.",
    nl: "AI-herstructurering is geen toekomstmuziek in België. Ze duikt op in transformatieplannen, callcenters en back-officeteams — provincie per provincie, functie per functie.",
    fr: "La restructuration liée à l'IA n'est pas un événement futur en Belgique. Elle apparaît dans les plans d'entreprise, les call-centers et les équipes back-office — province par province, métier par métier.",
  } as T,
  heroCta: { en: "Check my risk →", nl: "Bereken mijn risico →", fr: "Calculer mon risque →" } as T,
  heroStatWorkers: {
    en: "Belgian workers",
    nl: "Belgische werkenden",
    fr: "actifs belges",
  } as T,
  heroStatProvinces: { en: "Provinces", nl: "Provincies", fr: "Provinces" } as T,
  heroStatElevated: {
    en: "At elevated AI exposure",
    nl: "Met verhoogde AI-blootstelling",
    fr: "À forte exposition à l'IA",
  } as T,
  heroStatFramework: {
    en: "Occupation framework",
    nl: "Beroepenclassificatie",
    fr: "Classification des métiers",
  } as T,

  // Belgium map section
  geoEyebrow: { en: "Section 01 · Geography", nl: "Sectie 01 · Geografie", fr: "Section 01 · Géographie" } as T,
  geoHeadline: {
    en: "The most AI-exposed part of Belgium isn't a factory town.",
    nl: "Het meest AI-blootgestelde stuk van België is geen fabrieksstad.",
    fr: "La partie la plus exposée à l'IA n'est pas une ville industrielle.",
  } as T,
  geoIntro: {
    en: "It's the square kilometre around Rue de la Loi. Brussels' concentration of EU institutions, banks and consultancies gives it the highest cognitive-AI exposure score in the country — followed closely by the Leuven and Louvain-la-Neuve corridors.",
    nl: "Het is de vierkante kilometer rond de Wetstraat. De concentratie van EU-instellingen, banken en consultancybureaus in Brussel geeft de hoofdstad de hoogste score voor cognitieve AI-blootstelling van het land — gevolgd door de assen Leuven en Louvain-la-Neuve.",
    fr: "C'est le kilomètre carré autour de la rue de la Loi. La concentration d'institutions européennes, de banques et de cabinets-conseils donne à Bruxelles le score le plus élevé du pays — suivie de près par les axes de Louvain et Louvain-la-Neuve.",
  } as T,
  geoLower: { en: "Lower exposure", nl: "Lagere blootstelling", fr: "Faible exposition" } as T,
  geoHigher: { en: "Higher exposure", nl: "Hogere blootstelling", fr: "Forte exposition" } as T,
  geoBoundaries: {
    en: "Boundaries: Eurostat NUTS-2, 2021, 1:20M generalisation.",
    nl: "Grenzen: Eurostat NUTS-2, 2021, schaal 1:20M.",
    fr: "Limites : Eurostat NUTS-2, 2021, échelle 1:20M.",
  } as T,
  geoMapAria: {
    en: "Choropleth map of Belgian provinces by AI exposure",
    nl: "Choropletenkaart van Belgische provincies naar AI-blootstelling",
    fr: "Carte choroplèthe des provinces belges par exposition à l'IA",
  } as T,

  // Occupations table
  occEyebrow: { en: "Section 02 · Occupations", nl: "Sectie 02 · Beroepen", fr: "Section 02 · Métiers" } as T,
  occHeadline: {
    en: "Clerical work is the most exposed job family in Belgium.",
    nl: "Administratieve beroepen zijn de meest blootgestelde Belgische beroepsgroep.",
    fr: "Les métiers administratifs sont la famille la plus exposée en Belgique.",
  } as T,
  occIntro: {
    en: "Using the Felten–Raj–Rock AI Occupational Exposure index mapped onto ISCO-08 major groups, clerical roles and professional knowledge work score highest. Trades, agriculture and elementary occupations score lowest.",
    nl: "Op basis van de Felten–Raj–Rock AIOE-index, gemapt op de ISCO-08 hoofdgroepen, scoren administratieve en professionele kennisberoepen het hoogst. Vakberoepen, landbouw en elementaire beroepen scoren het laagst.",
    fr: "Sur la base de l'indice AIOE de Felten–Raj–Rock, projeté sur les grands groupes ISCO-08, les emplois administratifs et les métiers de la connaissance arrivent en tête. Métiers manuels, agriculture et professions élémentaires ferment la marche.",
  } as T,
  occHIsco: { en: "ISCO", nl: "ISCO", fr: "CITP" } as T,
  occHGroup: { en: "Occupation group", nl: "Beroepsgroep", fr: "Groupe de métiers" } as T,
  occHExamples: { en: "Examples", nl: "Voorbeelden", fr: "Exemples" } as T,
  occHWorkers: { en: "Workers", nl: "Werkenden", fr: "Actifs" } as T,
  occHExposure: { en: "Exposure", nl: "Blootstelling", fr: "Exposition" } as T,

  // Layoffs strip
  loEyebrow: {
    en: "Section 03 · What already happened",
    nl: "Sectie 03 · Wat al gebeurde",
    fr: "Section 03 · Ce qui s'est déjà passé",
  } as T,
  loHeadline: {
    en: "Belgium's last 24 months of restructuring.",
    nl: "De voorbije 24 maanden Belgische herstructureringen.",
    fr: "Les 24 derniers mois de restructuration en Belgique.",
  } as T,
  loIntro: {
    en: "Not every announcement below is an AI story — many are driven by energy prices, demand shocks, regulation or geopolitics. Each row is tagged with how plausibly AI or automation is a driver, so you can see the signal inside the noise.",
    nl: "Niet elke aankondiging hieronder is een AI-verhaal — energieprijzen, vraaguitval, regelgeving en geopolitiek spelen vaak een grotere rol. Elke regel is gelabeld met hoe waarschijnlijk AI of automatisering een drijver is, zodat je het signaal in de ruis ziet.",
    fr: "Toutes les annonces ci-dessous ne sont pas des histoires d'IA — l'énergie, la demande, la réglementation et la géopolitique pèsent souvent davantage. Chaque ligne est étiquetée selon la plausibilité du rôle de l'IA ou de l'automatisation, pour distinguer le signal du bruit.",
  } as T,
  loAnnouncedIn: { en: "announced in", nl: "aangekondigd in", fr: "annoncés en" } as T,
  loAiLikely: { en: "AI likely a factor", nl: "AI waarschijnlijk een factor", fr: "IA probablement en cause" } as T,
  loAiPlausible: { en: "AI plausibly a factor", nl: "AI plausibel een factor", fr: "IA plausiblement en cause" } as T,
  loFactorHighShort: { en: "AI likely", nl: "AI waarschijnlijk", fr: "IA probable" } as T,
  loFactorHighLong: { en: "AI a likely factor", nl: "AI is een waarschijnlijke factor", fr: "IA probablement un facteur" } as T,
  loFactorMediumShort: { en: "AI plausible", nl: "AI plausibel", fr: "IA plausible" } as T,
  loFactorMediumLong: {
    en: "AI plausibly a factor",
    nl: "AI plausibel een factor",
    fr: "IA plausiblement un facteur",
  } as T,
  loFactorLowShort: { en: "Non-AI", nl: "Niet-AI", fr: "Hors-IA" } as T,
  loFactorLowLong: {
    en: "Mostly market / geopolitical",
    nl: "Vooral markt / geopolitiek",
    fr: "Surtout marché / géopolitique",
  } as T,
  loHoverHint: {
    en: "Hover a tag for the reasoning. Classifications are editorial judgements based on company statements and press coverage — not a formal causal attribution.",
    nl: "Beweeg over een label voor de motivering. De classificaties zijn redactionele inschattingen op basis van persmededelingen en bedrijfscommunicatie — geen formele causale toewijzing.",
    fr: "Survolez une étiquette pour la motivation. Les classifications sont des jugements éditoriaux fondés sur les communiqués et la presse — pas une attribution causale formelle.",
  } as T,

  // Narrative
  narEyebrow: {
    en: "Why Belgium is different",
    nl: "Waarom België anders is",
    fr: "Ce qui rend la Belgique différente",
  } as T,
  narHeadline: {
    en: "A small, service-heavy, multilingual economy sits unusually high on the exposure curve.",
    nl: "Een kleine, dienstenintensieve, meertalige economie zit ongewoon hoog op de blootstellingscurve.",
    fr: "Une petite économie tertiaire et multilingue se retrouve étonnamment haut sur la courbe d'exposition.",
  } as T,
  narP1Pre: { en: "Roughly", nl: "Ongeveer", fr: "Environ" } as T,
  narP1Bold: {
    en: "three in five Belgian workers",
    nl: "drie op vijf Belgische werkenden",
    fr: "trois actifs belges sur cinq",
  } as T,
  narP1Post: {
    en: "sit in occupation families the AIOE index marks as highly exposed: professionals, managers, technicians and clerical support.",
    nl: "zitten in beroepsgroepen die de AIOE-index als sterk blootgesteld bestempelt: kenniswerkers, kaderleden, technici en administratief personeel.",
    fr: "occupent des familles de métiers que l'indice AIOE classe comme fortement exposées : professions intellectuelles, cadres, techniciens et personnel administratif.",
  } as T,
  narP2: {
    en: "The country's unusual industrial mix — European institutions, a dense banking and insurance sector, pharma R&D and a very large public administration — means cognitive work dominates employment more than in most EU peers.",
    nl: "De ongewone economische mix van het land — Europese instellingen, een dichte bank- en verzekeringssector, farma-R&D en een zeer grote overheid — zorgt dat cognitief werk hier sterker domineert dan in de meeste EU-landen.",
    fr: "Le mélange industriel particulier du pays — institutions européennes, un secteur banque-assurance dense, R&D pharma et une administration publique très importante — fait que le travail cognitif y domine plus qu'ailleurs dans l'UE.",
  } as T,
  narP3: {
    en: "At the same time, Belgium's strong social dialogue, sectoral training funds and multilingual workforce give it unusual levers for a managed transition — if they are used early, not after the layoff announcements.",
    nl: "Tegelijk geven het sterke sociaal overleg, de sectorale opleidingsfondsen en de meertalige beroepsbevolking België ongebruikelijke hefbomen voor een beheerde transitie — als ze vroeg worden ingezet, niet ná de ontslagaankondigingen.",
    fr: "Dans le même temps, la concertation sociale, les fonds de formation sectoriels et la main-d'œuvre multilingue offrent à la Belgique des leviers inhabituels pour une transition pilotée — à condition d'être actionnés tôt, pas après les plans sociaux.",
  } as T,
  narCounterview: {
    en: "Counter-view:",
    nl: "Tegenargument:",
    fr: "Thèse inverse :",
  } as T,
  narCounterviewLink: {
    en: "what if AI triggers a Jevons paradox in cognitive work?",
    nl: "wat als AI een Jevons-paradox in kenniswerk uitlokt?",
    fr: "et si l'IA déclenchait un paradoxe de Jevons dans le travail cognitif ?",
  } as T,
  narCounterviewPost: {
    en: "Cheaper tasks, more total demand, and the exposed occupations grow rather than shrink — the case, the early signs, and the Belgian jobs to watch first.",
    nl: "Goedkopere taken, méér totale vraag, en de blootgestelde beroepen groeien in plaats van te krimpen — het argument, de eerste signalen en de Belgische jobs om eerst in de gaten te houden.",
    fr: "Des tâches moins chères, plus de demande totale, et les métiers exposés qui grandissent au lieu de rétrécir — la thèse, les premiers signaux et les emplois belges à suivre en premier.",
  } as T,

  // Footer
  ftSiteName: {
    en: "Your Job Risk · Belgium",
    nl: "Jouw Job Risico · België",
    fr: "Votre risque emploi · Belgique",
  } as T,
  ftAbout: {
    en: "An independent, non-commercial research site modelling AI exposure across Belgium's provinces and occupations.",
    nl: "Een onafhankelijke, niet-commerciële onderzoekssite die AI-blootstelling modelleert over de Belgische provincies en beroepen.",
    fr: "Un site de recherche indépendant, non commercial, qui modélise l'exposition à l'IA dans les provinces et métiers belges.",
  } as T,
  ftMethodology: { en: "Methodology", nl: "Methodologie", fr: "Méthodologie" } as T,
  ftMethodologyExpl: {
    en: "Every number on this site — province scores, occupation ranking, layoff classifications — is explained on the",
    nl: "Elk cijfer op deze site — provinciescores, beroepenranking, ontslagclassificaties — wordt uitgelegd op de",
    fr: "Chaque chiffre du site — scores par province, classement des métiers, classification des licenciements — est expliqué sur la",
  } as T,
  ftMethodologyLink: { en: "methodology page", nl: "methodologiepagina", fr: "page méthodologie" } as T,
  ftCaveats: { en: "Caveats", nl: "Kanttekeningen", fr: "Précautions" } as T,
  ftCaveatsBody: {
    en: "Exposure is not the same as displacement. High-AIOE roles can be augmented, deskilled, or eliminated — which outcome wins depends on firm strategy, labour-market institutions and policy. These figures are indicative, not forecasts.",
    nl: "Blootstelling is niet hetzelfde als verdringing. Functies met hoge AIOE kunnen versterkt, verarmd of geschrapt worden — welke uitkomst wint, hangt af van bedrijfsstrategie, arbeidsmarktinstellingen en beleid. Deze cijfers zijn indicatief, geen voorspellingen.",
    fr: "L'exposition n'est pas le déplacement. Les rôles à fort AIOE peuvent être augmentés, dégradés ou supprimés — ce qui l'emporte dépend de la stratégie d'entreprise, des institutions du marché du travail et de la politique. Ces chiffres sont indicatifs, pas des prévisions.",
  } as T,
  ftCounterview: { en: "Counter-view:", nl: "Tegenargument:", fr: "Thèse inverse :" } as T,
  ftCounterviewLink: {
    en: "an AI Jevons paradox?",
    nl: "een AI-Jevons-paradox?",
    fr: "un paradoxe de Jevons de l'IA ?",
  } as T,
  ftInspired: {
    en: "Inspired by yourjobrisk.com. Built as an independent Belgian companion site.",
    nl: "Geïnspireerd door yourjobrisk.com. Gebouwd als onafhankelijke Belgische zustersite.",
    fr: "Inspiré de yourjobrisk.com. Conçu comme site frère belge indépendant.",
  } as T,

  // Tool
  toolEyebrow: { en: "The Tool", nl: "De Tool", fr: "L'Outil" } as T,
  toolHeadline: {
    en: "Click your province. Pick your role. See the number.",
    nl: "Klik je provincie. Kies je beroep. Zie het cijfer.",
    fr: "Cliquez votre province. Choisissez votre métier. Voyez le chiffre.",
  } as T,
  toolIntro: {
    en: "This is a scenario explorer, not a prediction. Adjust how fast AI gets rolled out across Belgian workplaces and how far forward you want to look, then click into your province and occupation to see the resulting \"task-pressure\" estimate.",
    nl: "Dit is een scenario-explorator, geen voorspelling. Stel in hoe snel AI uitrolt op de Belgische werkvloer en hoe ver vooruit je kijkt, klik dan op je provincie en beroep om de resulterende \"taakdruk\"-schatting te zien.",
    fr: "Il s'agit d'un explorateur de scénarios, pas d'une prévision. Réglez la vitesse de déploiement de l'IA dans les entreprises belges et l'horizon, puis cliquez sur votre province et votre métier pour voir l'estimation de \"pression sur les tâches\".",
  } as T,
  toolAdoption: { en: "Adoption scenario", nl: "Adoptiescenario", fr: "Scénario d'adoption" } as T,
  toolHorizon: { en: "Horizon", nl: "Horizon", fr: "Horizon" } as T,
  toolYears: { en: "years", nl: "jaar", fr: "ans" } as T,
  toolStep1: { en: "Step 1 · Pick your province", nl: "Stap 1 · Kies je provincie", fr: "Étape 1 · Choisissez votre province" } as T,
  toolStep2: { en: "Step 2 · Pick your occupation", nl: "Stap 2 · Kies je beroep", fr: "Étape 2 · Choisissez votre métier" } as T,
  toolStep3: { en: "Step 3 · The number", nl: "Stap 3 · Het cijfer", fr: "Étape 3 · Le chiffre" } as T,
  toolScenarioSlow: {
    en: "Slow: AI tooling stays in pilots",
    nl: "Traag: AI blijft in pilots steken",
    fr: "Lent : l'IA reste au stade pilote",
  } as T,
  toolScenarioCurrent: {
    en: "Current: today's adoption curve continues",
    nl: "Huidig: de huidige adoptiecurve loopt door",
    fr: "Actuel : la courbe d'adoption actuelle se poursuit",
  } as T,
  toolScenarioFast: {
    en: "Fast: broad enterprise rollout",
    nl: "Snel: brede uitrol in bedrijven",
    fr: "Rapide : déploiement étendu en entreprise",
  } as T,
  toolPickAProvince: {
    en: "Pick a province on the map.",
    nl: "Kies een provincie op de kaart.",
    fr: "Choisissez une province sur la carte.",
  } as T,
  toolPickAnOccupation: {
    en: "Pick an occupation group.",
    nl: "Kies een beroepsgroep.",
    fr: "Choisissez un groupe de métiers.",
  } as T,
  toolMagnitude: {
    en: "Modelled task-pressure",
    nl: "Gemodelleerde taakdruk",
    fr: "Pression sur les tâches (modélisée)",
  } as T,
  toolMagnitudeHelp: {
    en: "Share of this role's task basket plausibly substitutable by AI over the chosen horizon at the chosen adoption speed.",
    nl: "Aandeel van het takenpakket van dit beroep dat over de gekozen horizon en bij de gekozen adoptiesnelheid plausibel door AI vervangen kan worden.",
    fr: "Part du panier de tâches de ce métier plausiblement remplaçable par l'IA sur l'horizon et la vitesse d'adoption choisis.",
  } as T,

  // Tool — additional labels
  toolWorkersUnderPressure: {
    en: "Belgian workers under task-pressure at this scenario",
    nl: "Belgische werkenden onder taakdruk in dit scenario",
    fr: "actifs belges sous pression sur les tâches dans ce scénario",
  } as T,
  toolFormula: {
    en: "= Σ (group exposure × adoption × horizon/15) × employment share",
    nl: "= Σ (blootstelling per groep × adoptie × horizon/15) × tewerkstellingsaandeel",
    fr: "= Σ (exposition par groupe × adoption × horizon/15) × part dans l'emploi",
  } as T,
  toolPickProvinceMap: {
    en: "Click your province on the map",
    nl: "Klik je provincie op de kaart",
    fr: "Cliquez votre province sur la carte",
  } as T,
  toolProvinceLabel: { en: "Province", nl: "Provincie", fr: "Province" } as T,
  toolOccupationLabel: { en: "Occupation", nl: "Beroep", fr: "Métier" } as T,
  toolNoneSelected: { en: "none selected", nl: "niets gekozen", fr: "aucun choisi" } as T,
  toolPickOccupationHeadline: {
    en: "Pick your occupation",
    nl: "Kies je beroep",
    fr: "Choisissez votre métier",
  } as T,
  toolPickOccupationHelp: {
    en: "Choose your occupation family (ISCO-08 major group). The site combines its AIOE-derived score with the province score above and the current scenario to produce your task-pressure estimate.",
    nl: "Kies je beroepsgroep (ISCO-08 hoofdgroep). De site combineert de AIOE-score met de provinciescore en het huidige scenario tot een taakdruk-schatting.",
    fr: "Choisissez votre famille de métiers (grand groupe CITP-08). Le site combine son score AIOE avec celui de la province et le scénario en cours pour produire votre estimation de pression sur les tâches.",
  } as T,
  toolStartHint: {
    en: "Click one of the 11 provinces on the map to begin.",
    nl: "Klik op één van de 11 provincies op de kaart om te beginnen.",
    fr: "Cliquez sur l'une des 11 provinces de la carte pour commencer.",
  } as T,
  toolDarkerRed: {
    en: "Darker red = higher AI exposure.",
    nl: "Donkerder rood = hogere AI-blootstelling.",
    fr: "Rouge plus foncé = exposition plus élevée à l'IA.",
  } as T,
  toolSelectedProvince: {
    en: "Selected province",
    nl: "Geselecteerde provincie",
    fr: "Province sélectionnée",
  } as T,
  toolWorkers: { en: "Workers", nl: "Werkenden", fr: "Actifs" } as T,
  toolUnderPressure: {
    en: "Under task-pressure",
    nl: "Onder taakdruk",
    fr: "Sous pression sur les tâches",
  } as T,
  toolRegion: { en: "Region", nl: "Regio", fr: "Région" } as T,
  toolNuts: { en: "NUTS-2", nl: "NUTS-2", fr: "NUTS-2" } as T,
  toolYourEstimate: { en: "Your estimate", nl: "Jouw schatting", fr: "Votre estimation" } as T,
  toolCompositeExposure: {
    en: "Composite exposure",
    nl: "Samengestelde blootstelling",
    fr: "Exposition composite",
  } as T,
  toolCompositeHint: {
    en: "avg. of province + occupation (0–100)",
    nl: "gemiddelde van provincie + beroep (0–100)",
    fr: "moyenne province + métier (0–100)",
  } as T,
  toolTaskPressure: {
    en: "Task-pressure",
    nl: "Taakdruk",
    fr: "Pression sur les tâches",
  } as T,
  toolTaskPressureHint: {
    en: "share of your task-basket plausibly substitutable",
    nl: "aandeel van je takenpakket dat plausibel vervangbaar is",
    fr: "part de votre panier de tâches plausiblement remplaçable",
  } as T,
  toolScenarioLabel: { en: "Scenario", nl: "Scenario", fr: "Scénario" } as T,
  toolScenarioSlowShort: { en: "Slow", nl: "Traag", fr: "Lent" } as T,
  toolScenarioCurrentShort: { en: "Current", nl: "Huidig", fr: "Actuel" } as T,
  toolScenarioFastShort: { en: "Fast", nl: "Snel", fr: "Rapide" } as T,
  toolHorizonShort: { en: "{n}-year horizon", nl: "horizon van {n} jaar", fr: "horizon de {n} ans" } as T,
  toolStepSelectProvince: {
    en: "Select a province on the map above",
    nl: "Kies een provincie op de kaart hierboven",
    fr: "Choisissez une province sur la carte ci-dessus",
  } as T,
  toolStepSelectOccupation: {
    en: "Select an occupation here",
    nl: "Kies hier een beroep",
    fr: "Choisissez un métier ici",
  } as T,
  toolDisclaimer: {
    en: "Task-pressure is not the probability of losing your job. It is an indicative measure of how much of what you do today could be done, in whole or in part, by current AI systems at the chosen adoption level and horizon.",
    nl: "Taakdruk is niet de kans om je job te verliezen. Het is een indicatieve maat voor hoeveel van wat je vandaag doet, geheel of gedeeltelijk gedaan zou kunnen worden door huidige AI-systemen bij het gekozen adoptieniveau en de gekozen horizon.",
    fr: "La pression sur les tâches n'est pas la probabilité de perdre votre emploi. C'est une mesure indicative de la part de ce que vous faites aujourd'hui qui pourrait être réalisée, en tout ou en partie, par les systèmes d'IA actuels au niveau d'adoption et à l'horizon choisis.",
  } as T,
  toolStepProvinceTitle: {
    en: "Step 1",
    nl: "Stap 1",
    fr: "Étape 1",
  } as T,
  toolStepOccupationTitle: {
    en: "Step 2",
    nl: "Stap 2",
    fr: "Étape 2",
  } as T,
  toolMapAria: {
    en: "Interactive map of Belgian provinces",
    nl: "Interactieve kaart van de Belgische provincies",
    fr: "Carte interactive des provinces belges",
  } as T,
  toolClickInspect: {
    en: "click to inspect",
    nl: "klik om te bekijken",
    fr: "cliquez pour inspecter",
  } as T,
  toolHigher: {
    en: "Higher exposure",
    nl: "Hogere blootstelling",
    fr: "Forte exposition",
  } as T,

  // Switcher tooltip
  switcherLabel: {
    en: "Language",
    nl: "Taal",
    fr: "Langue",
  } as T,
};

export type DictKey = keyof typeof t;

// ---------------------------------------------------------------------------
// Province / occupation / layoff PROSE translations.
// Keys must match lib/data.ts identifiers.
// ---------------------------------------------------------------------------

export const provinceNameI18n: Record<string, T> = {
  // nuts code -> translated province name
  BE25: { en: "West Flanders", nl: "West-Vlaanderen", fr: "Flandre-Occidentale" },
  BE23: { en: "East Flanders", nl: "Oost-Vlaanderen", fr: "Flandre-Orientale" },
  BE21: { en: "Antwerp", nl: "Antwerpen", fr: "Anvers" },
  BE22: { en: "Limburg", nl: "Limburg", fr: "Limbourg" },
  BE24: { en: "Flemish Brabant", nl: "Vlaams-Brabant", fr: "Brabant flamand" },
  BE10: { en: "Brussels-Capital", nl: "Brussels Hoofdstedelijk Gewest", fr: "Bruxelles-Capitale" },
  BE31: { en: "Walloon Brabant", nl: "Waals-Brabant", fr: "Brabant wallon" },
  BE32: { en: "Hainaut", nl: "Henegouwen", fr: "Hainaut" },
  BE35: { en: "Namur", nl: "Namen", fr: "Namur" },
  BE33: { en: "Liège", nl: "Luik", fr: "Liège" },
  BE34: { en: "Luxembourg", nl: "Luxemburg", fr: "Luxembourg" },
};

export const provinceNoteI18n: Record<string, T> = {
  BE25: {
    en: "Manufacturing, logistics and tourism dampen cognitive exposure.",
    nl: "Industrie, logistiek en toerisme dempen de cognitieve blootstelling.",
    fr: "L'industrie, la logistique et le tourisme atténuent l'exposition cognitive.",
  },
  BE23: {
    en: "Ghent's universities and biotech raise the professional share.",
    nl: "Gentse universiteiten en biotech tillen het aandeel kenniswerk omhoog.",
    fr: "Les universités gantoises et la biotech relèvent la part de travail intellectuel.",
  },
  BE21: {
    en: "Port logistics offset by finance, chemicals R&D and HQs.",
    nl: "Havenlogistiek wordt deels gecompenseerd door finance, chemie-R&D en hoofdzetels.",
    fr: "La logistique portuaire est compensée par la finance, la R&D chimique et les sièges.",
  },
  BE22: {
    en: "Heavier manufacturing base than the Flemish average.",
    nl: "Zwaardere industriële basis dan het Vlaamse gemiddelde.",
    fr: "Base industrielle plus lourde que la moyenne flamande.",
  },
  BE24: {
    en: "Leuven research corridor and Zaventem corporate cluster.",
    nl: "Leuvense onderzoeksas en Zaventemse corporate cluster.",
    fr: "Axe de recherche louvaniste et cluster corporate de Zaventem.",
  },
  BE10: {
    en: "EU institutions, finance, consulting — the most exposed region.",
    nl: "EU-instellingen, finance, consultancy — de meest blootgestelde regio.",
    fr: "Institutions européennes, finance, conseil — la région la plus exposée.",
  },
  BE31: {
    en: "Louvain-la-Neuve, pharma R&D and corporate back-offices.",
    nl: "Louvain-la-Neuve, farma-R&D en corporate back-offices.",
    fr: "Louvain-la-Neuve, R&D pharma et back-offices d'entreprise.",
  },
  BE32: {
    en: "Post-industrial economy with a lower knowledge-work share.",
    nl: "Postindustriële economie met een lager aandeel kenniswerk.",
    fr: "Économie post-industrielle avec une part plus faible de travail de la connaissance.",
  },
  BE35: {
    en: "Walloon administrative capital lifts the clerical share.",
    nl: "Waalse administratieve hoofdstad tilt het administratieve aandeel op.",
    fr: "Capitale administrative wallonne, qui relève la part administrative.",
  },
  BE33: {
    en: "Mixed industry and services; modest professional density.",
    nl: "Gemengde industrie en diensten; bescheiden kennisdichtheid.",
    fr: "Mélange d'industrie et de services ; densité professionnelle modérée.",
  },
  BE34: {
    en: "Rural, agriculture and cross-border services into Luxembourg.",
    nl: "Landelijk, met landbouw en grensoverschrijdende diensten richting Luxemburg.",
    fr: "Rural, agriculture et services transfrontaliers vers le Luxembourg.",
  },
};

export const occupationNameI18n: Record<string, T> = {
  "1": { en: "Managers", nl: "Leidinggevenden", fr: "Cadres dirigeants" },
  "2": { en: "Professionals", nl: "Kenniswerkers", fr: "Professions intellectuelles" },
  "3": {
    en: "Technicians & associate professionals",
    nl: "Technici & gelijkgestelden",
    fr: "Techniciens & professions intermédiaires",
  },
  "4": {
    en: "Clerical support workers",
    nl: "Administratief personeel",
    fr: "Employés administratifs",
  },
  "5": {
    en: "Service & sales workers",
    nl: "Diensten- en verkoopberoepen",
    fr: "Personnel des services et vente",
  },
  "6": {
    en: "Skilled agricultural workers",
    nl: "Geschoolde landbouwarbeiders",
    fr: "Agriculteurs qualifiés",
  },
  "7": {
    en: "Craft & related trades",
    nl: "Vaklieden en aanverwanten",
    fr: "Métiers qualifiés de l'industrie et de l'artisanat",
  },
  "8": {
    en: "Plant & machine operators",
    nl: "Bedieners van installaties en machines",
    fr: "Conducteurs d'installations et de machines",
  },
  "9": {
    en: "Elementary occupations",
    nl: "Elementaire beroepen",
    fr: "Professions élémentaires",
  },
};

export const occupationExamplesI18n: Record<string, T> = {
  "1": {
    en: "Corporate, administrative and production managers",
    nl: "Bedrijfs-, administratieve en productiemanagers",
    fr: "Cadres d'entreprise, administratifs et de production",
  },
  "2": {
    en: "Engineers, teachers, accountants, lawyers, analysts",
    nl: "Ingenieurs, leerkrachten, accountants, advocaten, analisten",
    fr: "Ingénieurs, enseignants, comptables, avocats, analystes",
  },
  "3": {
    en: "IT support, lab technicians, sales reps, paramedics",
    nl: "IT-support, labotechnici, vertegenwoordigers, paramedici",
    fr: "Support IT, techniciens de labo, commerciaux, paramédicaux",
  },
  "4": {
    en: "Secretaries, bookkeeping clerks, call-centre staff",
    nl: "Secretariaat, boekhoudmedewerkers, callcentermedewerkers",
    fr: "Secrétaires, comptables-employés, agents de centre d'appels",
  },
  "5": {
    en: "Retail staff, hospitality, care workers, hairdressers",
    nl: "Winkelpersoneel, horeca, zorgmedewerkers, kappers",
    fr: "Personnel du commerce, horeca, aides-soignants, coiffeurs",
  },
  "6": {
    en: "Farmers, market gardeners, foresters",
    nl: "Landbouwers, tuinders, bosbouwers",
    fr: "Agriculteurs, maraîchers, forestiers",
  },
  "7": {
    en: "Electricians, mechanics, builders, welders",
    nl: "Elektriciens, monteurs, bouwvakkers, lassers",
    fr: "Électriciens, mécaniciens, ouvriers du bâtiment, soudeurs",
  },
  "8": {
    en: "Truck drivers, line operators, process operators",
    nl: "Vrachtwagenchauffeurs, lijnoperators, procesoperatoren",
    fr: "Chauffeurs PL, opérateurs de ligne, opérateurs de procédés",
  },
  "9": {
    en: "Cleaners, food prep helpers, refuse workers",
    nl: "Schoonmakers, keukenhulpen, ophalers",
    fr: "Nettoyeurs, aides en cuisine, agents de collecte",
  },
};
