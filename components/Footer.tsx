export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 text-sm text-white/50">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-white">Your Job Risk · Belgium</div>
            <p className="mt-3 max-w-xs text-white/50">
              An independent, non-commercial research site modelling AI
              exposure across Belgium&apos;s provinces and occupations.
            </p>
          </div>
          <div>
            <div className="text-white">Methodology</div>
            <p className="mt-3 text-white/50">
              Every number on this site — province scores, occupation
              ranking, layoff classifications — is explained on the{" "}
              <a
                href="/methodology"
                className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                methodology page
              </a>
              .
            </p>
            <ul className="mt-3 space-y-1 text-xs text-white/40">
              <li>Felten, Raj &amp; Rock (2021) · Eloundou et al. (2023)</li>
              <li>ILO 2025 · OECD 2024/25 · Anthropic Economic Index 2025</li>
              <li>ISCO-08 major groups · Statbel LFS 2024</li>
              <li>Province workforce: Statbel 2024</li>
              <li>Boundaries: Eurostat NUTS-2 2021</li>
              <li>Layoffs: press announcements, 2024–2026</li>
            </ul>
          </div>
          <div>
            <div className="text-white">Caveats</div>
            <p className="mt-3 text-white/50">
              Exposure is not the same as displacement. High-AIOE roles can
              be augmented, deskilled, or eliminated — which outcome wins
              depends on firm strategy, labour-market institutions and
              policy. These figures are indicative, not forecasts.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          Inspired by yourjobrisk.com. Built as an independent Belgian
          companion site.
        </div>
      </div>
    </footer>
  );
}
