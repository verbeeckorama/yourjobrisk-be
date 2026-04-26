"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

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

const eyebrows: Record<Lang, string> = {
  en: "Methodology",
  nl: "Methodologie",
  fr: "Méthodologie",
};

const headlines: Record<Lang, string> = {
  en: "How these numbers are built — and what they are not.",
  nl: "Hoe deze cijfers tot stand komen — en wat ze níét zijn.",
  fr: "Comment ces chiffres sont construits — et ce qu'ils ne sont pas.",
};

const intros: Record<Lang, string> = {
  en: "This page walks through every figure on the site: the province exposure scores, the occupation ranking, the layoff classifications, and the deliberate choices that shaped each one.",
  nl: "Deze pagina overloopt elk cijfer op de site: de provinciale AI Exposure-scores, de beroepenranking, de ontslagclassificaties, en de bewuste keuzes die elk daarvan vormgegeven hebben.",
  fr: "Cette page passe en revue chaque chiffre du site : les scores AI Exposure par province, le classement des métiers, la classification des plans sociaux, et les choix délibérés qui ont façonné chacun.",
};

const backToMap: Record<Lang, string> = {
  en: "← Back to the map",
  nl: "← Terug naar de kaart",
  fr: "← Retour à la carte",
};

// Section titles per language.
const titles = {
  s1: {
    en: "1. What \"AI exposure\" means here",
    nl: "1. Wat \"AI Exposure\" hier betekent",
    fr: "1. Ce que \"AI Exposure\" signifie ici",
  },
  s2: {
    en: "2. Occupation scores (ISCO-08 major groups)",
    nl: "2. Beroepenscores (ISCO-08 hoofdgroepen)",
    fr: "2. Scores par métier (grands groupes CITP-08)",
  },
  s3: {
    en: "3. Province exposure scores",
    nl: "3. Provinciale AI Exposure-scores",
    fr: "3. Scores AI Exposure par province",
  },
  s4: {
    en: "4. Province totals and headline numbers",
    nl: "4. Provinciale totalen en kerncijfers",
    fr: "4. Totaux par province et chiffres-clés",
  },
  s5: {
    en: "5. Layoff classification (AI likely / plausible / non-AI)",
    nl: "5. Ontslagclassificatie (AI waarschijnlijk / plausibel / niet-AI)",
    fr: "5. Classification des plans sociaux (IA probable / plausible / hors-IA)",
  },
  s6: {
    en: "6. What this site is not",
    nl: "6. Wat deze site níét is",
    fr: "6. Ce que ce site n'est pas",
  },
  s7: {
    en: "7. Sources",
    nl: "7. Bronnen",
    fr: "7. Sources",
  },
  s8: {
    en: "8. Corrections",
    nl: "8. Correcties",
    fr: "8. Corrections",
  },
} as const;

// English bodies (the original prose).
const bodyEn = {
  s1: (
    <>
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
        <em>Felten, Raj &amp; Rock (2021)</em>, which links applications of
        AI to the O*NET abilities that an occupation relies on. Treat the
        0–100 number as a <em>relative ranking</em> of cognitive task
        exposure, not a probability of job loss.
      </p>
    </>
  ),
  s2: (
    <>
      <p>
        The AIOE is defined at the US SOC occupation level. For Belgium the
        site works at the coarser ISCO-08 <em>major-group</em> level
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
        <em> examples</em> in each row are representative, not exhaustive.
      </p>
      <p>
        The AIOE numbers are <strong>cross-checked</strong> against more
        recent task-exposure work that captures generative AI specifically
        — Eloundou et&nbsp;al.&nbsp;(OpenAI, 2023) on GPT exposure, the
        ILO&apos;s <em>Generative AI and Jobs</em> refreshes (2023 and the
        2025 update), the OECD Employment Outlook 2023–2025 chapters on
        AI, and the <em>Anthropic Economic Index</em> (2025), which
        measures what tasks Claude users are actually delegating to the
        model. All four agree on the direction of the ranking, even where
        absolute scores differ.
      </p>
    </>
  ),
  s3: (
    <>
      <p>Each province gets a single composite score by combining:</p>
      <ol>
        <li>
          <strong>Occupation mix:</strong> the share of that
          province&apos;s employed residents in each ISCO major group,
          from the Belgian Labour Force Survey (Statbel LFS, 2024 annual
          release).
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
    </>
  ),
  s4: (
    <>
      <p>
        The <strong>~5.0 M workers</strong> figure is the sum of modelled
        employed residents per province (rounded Statbel 2024 numbers),
        and sits within a few percent of the official Belgian employed
        population.
      </p>
      <p>
        The <strong>&quot;at elevated AI exposure&quot;</strong> aggregate
        counts workers in ISCO groups scoring ≥ 60 on the occupation
        scale — professionals, managers, technicians and clerical
        support. That&apos;s a defensible threshold but it is a threshold:
        move it to 55 or 65 and the headline changes by roughly
        ±0.5&nbsp;M.
      </p>
    </>
  ),
  s5: (
    <>
      <p>
        Every restructuring announcement in the last 24 months is tagged
        with an editorial <strong>AI factor</strong>. The rubric is:
      </p>
      <ul>
        <li>
          <strong className="text-accent">AI likely</strong> — the company
          explicitly cites AI, automation, digital transformation or
          back-office modernisation as a driver, <em>and</em> the roles
          being cut sit in occupation groups the AIOE flags as highly
          exposed. Example: Proximus&apos; transformation plan, BNP
          Paribas Fortis branch + IT consolidation.
        </li>
        <li>
          <strong className="text-amber-300">AI plausible</strong> —
          stated cause is primarily market, demand or regulation, but the
          <em> profile of roles cut</em> (clerical, HQ, R&amp;D support)
          sits in the high-exposure zone. Example: bpost back-office, AGC
          Glass HQ / R&amp;D, Pfizer commercial efficiency.
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
    </>
  ),
  s6: (
    <ul>
      <li>
        Not a forecast. There is no Monte Carlo simulation, no 2030 / 2035
        projection, no &quot;X% of jobs will be lost&quot; claim.
      </li>
      <li>
        Not a policy tool. The figures are indicative, intended to frame a
        conversation, not to size a training budget or a regional
        transition plan.
      </li>
      <li>
        Not commercial. There are no ads, trackers, email captures or
        affiliate links.
      </li>
    </ul>
  ),
  s8: (
    <p>
      If a number is wrong, a layoff is missing, or a classification is
      unfair to a company, the code and data are in a single file
      (<code>lib/data.ts</code>) in the repository — open an issue or a
      pull request and it can be fixed in minutes.
    </p>
  ),
};

// Dutch bodies.
const bodyNl = {
  s1: (
    <>
      <p>
        AI Exposure is <em>niet</em> hetzelfde als verdringing. Een hoge score betekent
        dat een job uit taken bestaat die de AI-systemen van vandaag (grote
        taalmodellen, beeldsystemen, tabulaire ML, procesautomatisering)
        deels kunnen overnemen. Of dat tot ontslagen, augmentatie, nieuwe
        jobs of helemaal niets zichtbaars leidt, hangt af van de
        bedrijfsstrategie, de instellingen en het beleid.
      </p>
      <p>
        Het onderliggende construct is de{" "}
        <strong>AI Occupational Exposure (AIOE)-index</strong> van{" "}
        <em>Felten, Raj &amp; Rock (2021)</em>, die AI-toepassingen koppelt
        aan de O*NET-vaardigheden waarop een beroep steunt. Lees dit
        getal van 0–100 als een <em>relatieve rangschikking</em> van
        cognitieve AI Exposure, niet als een kans op jobverlies.
      </p>
    </>
  ),
  s2: (
    <>
      <p>
        De AIOE is gedefinieerd op het Amerikaanse SOC-beroepsniveau. Voor
        België werkt de site op het grovere ISCO-08 <em>hoofdgroepniveau</em>
        {" "}(1 tot en met 9), omdat:
      </p>
      <ul>
        <li>
          Statbel de Belgische tewerkstelling op ISCO-hoofdgroepniveau
          consistent en open publiceert.
        </li>
        <li>
          Het overzetten van elke 4-cijferige SOC naar 4-cijferige ISCO
          zou onterechte precisie introduceren voor een verhalende site
          als deze.
        </li>
      </ul>
      <p>
        Voor elke ISCO-hoofdgroep is de getoonde score een
        tewerkstellingsgewogen AIOE-gemiddelde van de SOC's die in die
        groep vallen, herschaald naar 0–100 zodat administratieve
        ondersteuning (de meest blootgestelde groep) rond 82 zit en
        landbouw rond 22. De <em>voorbeelden</em> per rij zijn
        representatief, niet uitputtend.
      </p>
      <p>
        De AIOE-cijfers worden <strong>gekruisvalideerd</strong> met
        recenter taakblootstellingswerk dat specifiek generatieve AI
        meeneemt — Eloundou et&nbsp;al. (OpenAI, 2023) over GPT-blootstelling,
        de ILO-update <em>Generative AI and Jobs</em> (2023 en de update
        van 2025), de OESO Employment Outlook 2023–2025 hoofdstukken over
        AI, en de <em>Anthropic Economic Index</em> (2025), die meet
        welke taken Claude-gebruikers daadwerkelijk aan het model
        delegeren. Alle vier zijn het eens over de richting van de
        rangschikking, zelfs waar de absolute scores verschillen.
      </p>
    </>
  ),
  s3: (
    <>
      <p>Elke provincie krijgt één samengestelde score door te combineren:</p>
      <ol>
        <li>
          <strong>Beroepenmix:</strong> het aandeel van de werkende
          inwoners van die provincie per ISCO-hoofdgroep, uit de Belgische
          Enquête naar de Arbeidskrachten (Statbel EAK, jaarrelease 2024).
        </li>
        <li>
          <strong>Beroepen-AIOE:</strong> de scores op groepsniveau uit
          stap 2.
        </li>
        <li>
          <strong>Sectorcorrectie:</strong> een kleine aanpassing voor de
          sectorintensiteit op provinciaal niveau (bv. EU-instellingen in
          Brussel, chemie in Antwerpen, auto/logistiek in Limburg,
          retail/diensten in Luxemburg) op basis van de regionale
          rekeningen van Eurostat.
        </li>
      </ol>
      <p>
        De resulterende score wordt herschaald naar 0–100, zodat
        Brussel-Hoofdstad bovenaan staat (72) en de provincie Luxemburg
        onderaan (43). Twee dingen om te onthouden:
      </p>
      <ul>
        <li>
          Dit toont <strong>waar werknemers wonen</strong>, niet
          waar ze werken. Pendelen naar Brussel is significant maar niet
          expliciet gemodelleerd.
        </li>
        <li>
          De sectorcorrectie is <em>indicatief</em>. Deze cijfers zijn
          niet door Statbels gedetailleerde regionale sectortabellen
          gehaald of herwogen op bedrijfsgrootte — beide zouden de
          scores enkele punten verschuiven.
        </li>
      </ul>
    </>
  ),
  s4: (
    <>
      <p>
        Het cijfer van <strong>~5,0 miljoen werkenden</strong> is de som
        van de gemodelleerde werkende inwoners per provincie (afgeronde
        Statbel-cijfers 2024), en zit op enkele procenten van de officiële
        Belgische werkende beroepsbevolking.
      </p>
      <p>
        Het aggregaat <strong>&quot;met verhoogde AI Exposure&quot;</strong>{" "}
        telt werkenden in ISCO-groepen met een score ≥ 60 op de
        beroepenschaal — kenniswerkers, managers, technici en
        administratief personeel. Dat is een verdedigbare drempel, maar
        wel een drempel: zet hem op 55 of 65 en het kerncijfer
        verschuift met ongeveer ±0,5 miljoen.
      </p>
    </>
  ),
  s5: (
    <>
      <p>
        Elke herstructureringsaankondiging van de voorbije 24 maanden krijgt
        een redactionele <strong>AI-factor</strong>. De indeling:
      </p>
      <ul>
        <li>
          <strong className="text-accent">AI waarschijnlijk</strong> — het
          bedrijf vermeldt expliciet AI, automatisering, digitale
          transformatie of back-office-modernisering als drijver,{" "}
          <em>én</em> de geschrapte rollen zitten in beroepsgroepen die de
          AIOE als sterk blootgesteld bestempelt. Voorbeeld: het
          transformatieplan van Proximus, BNP Paribas Fortis kantoren +
          IT-consolidatie.
        </li>
        <li>
          <strong className="text-amber-300">AI plausibel</strong> — de
          opgegeven oorzaak is vooral markt, vraag of regelgeving, maar
          het <em>profiel van de geschrapte rollen</em> (administratie,
          hoofdkantoor, R&amp;D-ondersteuning) zit in de hoge AI Exposure-zone.
          Voorbeeld: bpost back-office, AGC Glass HQ / R&amp;D, Pfizer
          commerciële efficiëntie.
        </li>
        <li>
          <strong className="text-white/60">Niet-AI</strong> — de
          herstructurering is vooral een geopolitieke, energie-, vraag-
          of sectorspecifieke schok, gericht op rollen (productie, retail,
          fabriek) die de AIOE niet als sterk blootgesteld aanduidt. Voorbeeld: Audi Brussels, Cora,
          Van Hool, BASF Antwerpen, ExxonMobil, Villeroy &amp; Boch, BAT.
        </li>
      </ul>
      <p>
        Deze labels zijn{" "}
        <strong>oordelen, geen causale toewijzing.</strong> Het
        contrafeitelijke — &quot;zou dit ontslag plaatsgevonden hebben in
        een wereld zonder generatieve AI?&quot; — is werkelijk niet te
        weten. Wijs naar een label op de homepage voor de
        eenregelmotivering.
      </p>
    </>
  ),
  s6: (
    <ul>
      <li>
        Geen voorspelling. Geen Monte Carlo-simulatie, geen 2030/2035-projectie,
        geen &quot;X% van de jobs zal verdwijnen&quot;-claim.
      </li>
      <li>
        Geen beleidstool. De cijfers zijn indicatief, bedoeld om een
        gesprek te kaderen, niet om een opleidingsbudget of regionaal
        transitieplan op te bouwen.
      </li>
      <li>
        Geen commerciële site. Geen reclame, trackers, e-mailcaptures of
        affiliate links.
      </li>
    </ul>
  ),
  s8: (
    <p>
      Klopt een cijfer niet, ontbreekt er een ontslag of is een
      classificatie onrechtvaardig voor een bedrijf? De code en data
      zitten in één bestand (<code>lib/data.ts</code>) in de repository —
      open een issue of pull request en het kan in enkele minuten worden aangepast.
    </p>
  ),
};

// French bodies.
const bodyFr = {
  s1: (
    <>
      <p>
        Le score AI Exposure ne mesure <em>pas</em> un remplacement. Un score élevé
        signifie qu'un emploi est composé de tâches que les systèmes d'IA
        actuels (grands modèles de langage, vision, ML tabulaire,
        automatisation de processus) peuvent prendre en charge en partie.
        Que cela mène à des licenciements, à de l'augmentation, à de
        nouveaux emplois ou à rien de visible dépend de la stratégie de
        l'entreprise, des institutions et de la politique.
      </p>
      <p>
        Le cadre sous-jacent est l'indice{" "}
        <strong>AI Occupational Exposure (AIOE)</strong> de{" "}
        <em>Felten, Raj &amp; Rock (2021)</em>, qui relie les applications
        de l'IA aux capacités O*NET dont dépend une profession. Lisez le
        chiffre de 0 à 100 comme un <em>classement relatif</em>{" "}
        du score AI Exposure cognitif, pas comme une probabilité de perte
        d'emploi.
      </p>
    </>
  ),
  s2: (
    <>
      <p>
        L'AIOE est défini au niveau des professions SOC américaines. Pour
        la Belgique, le site travaille au niveau plus grossier des{" "}
        <em>grands groupes</em> CITP-08 (1 à 9), parce que :
      </p>
      <ul>
        <li>
          Statbel publie l'emploi belge au niveau des grands groupes CITP
          de manière cohérente et ouverte.
        </li>
        <li>
          Faire correspondre chaque SOC à 4 chiffres à un CITP à 4
          chiffres introduirait une fausse précision pour un site
          narratif comme celui-ci.
        </li>
      </ul>
      <p>
        Pour chaque grand groupe CITP, le score affiché est une moyenne
        AIOE pondérée par l'emploi des SOC qui en relèvent, ramenée à
        0–100 : le personnel administratif (le groupe le plus exposé) se
        situe vers 82 et l'agriculture vers 22. Les <em>exemples</em>{" "}
        dans chaque ligne sont représentatifs, pas exhaustifs.
      </p>
      <p>
        Les chiffres AIOE sont <strong>recoupés</strong> avec des travaux
        plus récents sur l'exposition aux tâches qui captent
        spécifiquement l'IA générative — Eloundou et&nbsp;al. (OpenAI,
        2023) sur l'exposition aux GPT, les mises à jour de l'OIT
        <em> Generative AI and Jobs</em> (2023 puis 2025), les chapitres
        IA de l'OECD Employment Outlook 2023–2025 et l'<em>Anthropic
        Economic Index</em> (2025) qui mesure les tâches que les
        utilisateurs de Claude délèguent réellement au modèle. Tous
        s'accordent sur la direction du classement, même si les niveaux
        absolus diffèrent.
      </p>
    </>
  ),
  s3: (
    <>
      <p>
        Chaque province reçoit un score composite unique en combinant :
      </p>
      <ol>
        <li>
          <strong>Mix professionnel :</strong> la part des résidents
          actifs de la province dans chaque grand groupe CITP, issue de
          l'enquête belge sur les forces de travail (Statbel EFT,
          publication annuelle 2024).
        </li>
        <li>
          <strong>AIOE par métier :</strong> les scores au niveau du
          groupe issus de l'étape 2.
        </li>
        <li>
          <strong>Ajustement sectoriel :</strong> une petite correction
          pour l'intensité sectorielle au niveau provincial (ex.
          institutions européennes à Bruxelles, chimie à Anvers,
          auto/logistique au Limbourg, commerce/services au Luxembourg)
          tirée des comptes régionaux Eurostat.
        </li>
      </ol>
      <p>
        Le score résultant est ramené à 0–100 : Bruxelles-Capitale est
        proche du sommet (72) et la province de Luxembourg en bas (43).
        Deux choses à retenir :
      </p>
      <ul>
        <li>
          Il reflète <strong>là où les travailleurs habitent</strong>, pas
          là où ils travaillent. Le navettage vers Bruxelles est
          important mais n'est pas explicitement modélisé.
        </li>
        <li>
          L'ajustement sectoriel est <em>indicatif</em>. Ces chiffres
          n'ont pas été repassés par les tables sectorielles régionales
          détaillées de Statbel ni repondérés par taille d'entreprise —
          l'un comme l'autre déplaceraient les scores de quelques points.
        </li>
      </ul>
    </>
  ),
  s4: (
    <>
      <p>
        Le chiffre de <strong>~5,0 M d'actifs</strong> est la somme des
        résidents actifs modélisés par province (chiffres Statbel 2024
        arrondis), à quelques pour cent près de la population active
        belge officielle.
      </p>
      <p>
        L'agrégat{" "}
        <strong>&quot;avec un score AI Exposure élevé&quot;</strong> compte les
        actifs dans les groupes CITP avec un score ≥ 60 sur l'échelle
        métier — professions intellectuelles, cadres, techniciens et
        personnel administratif. Seuil défendable, mais c'est un seuil :
        portez-le à 55 ou 65 et le chiffre de tête bouge d'environ ±0,5
        M.
      </p>
    </>
  ),
  s5: (
    <>
      <p>
        Chaque annonce de restructuration des 24 derniers mois reçoit un{" "}
        <strong>facteur IA</strong> éditorial. Grille :
      </p>
      <ul>
        <li>
          <strong className="text-accent">IA probable</strong> — l'entreprise
          cite explicitement l'IA, l'automatisation, la transformation
          numérique ou la modernisation back-office comme moteur,{" "}
          <em>et</em> les rôles supprimés relèvent de groupes
          professionnels que l'AIOE classe comme fortement exposés.
          Exemple : plan de transformation de Proximus, consolidation
          agences + IT BNP Paribas Fortis.
        </li>
        <li>
          <strong className="text-amber-300">IA plausible</strong> — la
          cause invoquée est principalement de marché, de demande ou de
          réglementation, mais le <em>profil des rôles supprimés</em>{" "}
          (administratif, siège, support R&amp;D) se trouve dans une zone à
          score AI Exposure élevé. Exemple : back-office bpost, siège/R&amp;D
          AGC Glass, efficacité commerciale Pfizer.
        </li>
        <li>
          <strong className="text-white/60">Hors-IA</strong> — la
          restructuration est principalement un choc géopolitique,
          énergétique, de demande ou sectoriel, ciblant des rôles
          (production, retail, usine) que l'AIOE ne signale pas.
          Exemple : Audi Brussels, Cora, Van Hool, BASF Anvers,
          ExxonMobil, Villeroy &amp; Boch, BAT.
        </li>
      </ul>
      <p>
        Ces étiquettes sont des{" "}
        <strong>jugements, pas une attribution causale.</strong> Le
        contrefactuel — &quot;ce plan social aurait-il eu lieu dans un
        monde sans IA générative ?&quot; — est véritablement
        inconnaissable. Survolez une étiquette en page d'accueil pour voir la
        justification en une ligne.
      </p>
    </>
  ),
  s6: (
    <ul>
      <li>
        Pas une prévision. Pas de simulation Monte Carlo, pas de
        projection 2030/2035, pas d'affirmation &quot;X % d'emplois
        seront perdus&quot;.
      </li>
      <li>
        Pas un outil de politique publique. Les chiffres sont indicatifs,
        destinés à cadrer une conversation, pas à dimensionner un budget
        de formation ni un plan régional de transition.
      </li>
      <li>
        Pas commercial. Pas de pubs, trackers, captures d'e-mail ni liens
        affiliés.
      </li>
    </ul>
  ),
  s8: (
    <p>
      Si un chiffre est faux, un plan social manquant, ou une
      classification injuste pour une entreprise, le code et les données
      sont dans un seul fichier (<code>lib/data.ts</code>) du dépôt —
      ouvrez un ticket ou une pull request et cela peut être corrigé en
      quelques minutes.
    </p>
  ),
};

const bodies: Record<Lang, typeof bodyEn> = {
  en: bodyEn,
  nl: bodyNl,
  fr: bodyFr,
};

const sourcesIntro: Record<Lang, { core: string; cross: string; be: string; layoffs: string; refresh: string }> = {
  en: {
    core: "Core exposure construct:",
    cross: "Cross-checked against more recent task-exposure work:",
    be: "Belgian labour and geography:",
    layoffs: "Layoff announcements (April 2024 – April 2026):",
    refresh:
      "Last data refresh: April 2026. The AIOE itself has not been rewritten since 2021 — newer work (ILO, OECD, Anthropic) extends it rather than replacing it, so the ranking is stable; absolute levels should be read with a wider confidence band than the two-digit scores suggest.",
  },
  nl: {
    core: "Kernconstruct voor AI Exposure:",
    cross: "Gekruisvalideerd met recenter taakblootstellingswerk:",
    be: "Belgische arbeidsmarkt en geografie:",
    layoffs: "Ontslagaankondigingen (april 2024 – april 2026):",
    refresh:
      "Laatste data-update: april 2026. De AIOE zelf is sinds 2021 niet herschreven — recenter werk (ILO, OESO, Anthropic) breidt hem uit in plaats van hem te vervangen, dus de rangschikking is stabiel; absolute niveaus moeten met een ruimere betrouwbaarheidsmarge gelezen worden dan de tweecijferige scores suggereren.",
  },
  fr: {
    core: "Construct de base pour le score AI Exposure :",
    cross: "Recoupé avec des travaux plus récents sur l'exposition aux tâches :",
    be: "Marché du travail et géographie belges :",
    layoffs: "Annonces de plans sociaux (avril 2024 – avril 2026) :",
    refresh:
      "Dernière mise à jour des données : avril 2026. L'AIOE lui-même n'a pas été réécrit depuis 2021 — les travaux plus récents (OIT, OCDE, Anthropic) l'étendent plutôt que le remplacent, donc le classement est stable ; les niveaux absolus doivent être lus avec une marge de confiance plus large que ce que suggèrent les scores à deux chiffres.",
  },
};

export default function MethodologyContent() {
  const lang = useLang();
  const b = bodies[lang];
  const si = sourcesIntro[lang];
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
        {eyebrows[lang]}
      </p>
      <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
        {headlines[lang]}
      </h1>
      <p className="mt-6 text-lg text-white/70">{intros[lang]}</p>

      <Section title={titles.s1[lang]}>{b.s1}</Section>
      <Section title={titles.s2[lang]}>{b.s2}</Section>
      <Section title={titles.s3[lang]}>{b.s3}</Section>
      <Section title={titles.s4[lang]}>{b.s4}</Section>
      <Section title={titles.s5[lang]}>{b.s5}</Section>
      <Section title={titles.s6[lang]}>{b.s6}</Section>

      <Section title={titles.s7[lang]}>
        <p className="text-white/60">{si.core}</p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://onlinelibrary.wiley.com/doi/abs/10.1002/smj.3286">
              Felten, Raj &amp; Rock (2021)
            </SourceLink>{" "}
            — Occupational, industry, and geographic exposure to AI (AIOE
            index). Preprint:{" "}
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
        <p className="mt-4 text-white/60">{si.cross}</p>
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
            ·{" "}
            <SourceLink href="https://www.oecd.org/en/publications/oecd-employment-outlook-2023_08785bba-en.html">
              2023 edition
            </SourceLink>{" "}
            — AI chapters on exposure, adoption and workplace use.
          </li>
          <li>
            <SourceLink href="https://www.anthropic.com/news/the-anthropic-economic-index">
              Anthropic (2025) — Economic Index
            </SourceLink>{" "}
            — task-level analysis of what Claude is actually used for.
          </li>
          <li>
            <SourceLink href="https://arxiv.org/abs/2503.04761">
              Handa et al. (2025)
            </SourceLink>{" "}
            — Which economic tasks are performed with AI? Evidence from
            millions of Claude conversations.
          </li>
          <li>
            <SourceLink href="https://www.nber.org/papers/w32487">
              Acemoglu (2024/2025)
            </SourceLink>{" "}
            — The Simple Macroeconomics of AI; a cautious task-based
            estimate of aggregate productivity and inequality effects.
          </li>
          <li>
            <SourceLink href="https://www.nber.org/papers/w30957">
              Korinek (2023)
            </SourceLink>{" "}
            — Language Models and Cognitive Automation for Economic
            Research; concrete use-cases for cognitive task automation.
          </li>
          <li>
            <SourceLink href="https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379">
              IMF SDN 2024/01
            </SourceLink>{" "}
            — Gen-AI: artificial intelligence and the future of work.
          </li>
        </ul>
        <p className="mt-4 text-white/60">{si.be}</p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://statbel.fgov.be/en/themes/work-training/labour-market/employment-and-unemployment">
              Statbel — Labour Force Survey
            </SourceLink>{" "}
            (2024).
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
            (NUTS-2, 2024).
          </li>
          <li>
            <SourceLink href="https://ec.europa.eu/eurostat/web/nuts">
              Eurostat — NUTS classification
            </SourceLink>{" "}
            ·{" "}
            <SourceLink href="https://github.com/eurostat/Nuts2json">
              Nuts2json
            </SourceLink>{" "}
            (1:20M, EPSG:4326).
          </li>
        </ul>
        <p className="mt-4 text-white/60">{si.layoffs}</p>
        <ul className="font-mono text-sm text-white/70">
          <li>
            <SourceLink href="https://www.vrt.be/vrtnws/en/">
              VRT NWS
            </SourceLink>{" "}
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
            <SourceLink href="https://www.lecho.be/">
              L&apos;Echo
            </SourceLink>{" "}
            · <SourceLink href="https://www.tijd.be/">De Tijd</SourceLink>{" "}
            · <SourceLink href="https://www.rtbf.be/">RTBF</SourceLink> ·{" "}
            <SourceLink href="https://www.hln.be/">HLN</SourceLink>
          </li>
          <li>
            <SourceLink href="https://www.eurofound.europa.eu/en/topics/restructuring">
              Eurofound — Restructuring topic
            </SourceLink>
          </li>
        </ul>
        <p className="mt-6 text-xs text-white/50">{si.refresh}</p>
      </Section>

      <Section title={titles.s8[lang]}>{b.s8}</Section>

      <div className="mt-20 border-t border-white/10 pt-8">
        <Link href="/" className="text-sm text-accent hover:underline">
          {backToMap[lang]}
        </Link>
      </div>
    </main>
  );
}
