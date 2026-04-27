"use client";

import { useLang, tr } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function Footer() {
  const lang = useLang();
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 text-sm text-white/50">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-white">{tr(t.ftSiteName, lang)}</div>
            <p className="mt-3 max-w-xs text-white/50">{tr(t.ftAbout, lang)}</p>
          </div>
          <div>
            <div className="text-white">{tr(t.ftMethodology, lang)}</div>
            <p className="mt-3 text-white/50">
              {tr(t.ftMethodologyExpl, lang)}{" "}
              <a
                href="/methodology"
                className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                {tr(t.ftMethodologyLink, lang)}
              </a>
              .
            </p>
            <ul className="mt-3 space-y-1 text-xs text-white/40">
              <li>Felten, Raj &amp; Rock (2021) · Eloundou et al. (2023)</li>
              <li>ILO 2025 · OECD 2024/25 · Anthropic Economic Index 2025</li>
              <li>Gimbel et al. 2025 · junior-worker effects</li>
              <li>ISCO-08 · Statbel LFS 2024</li>
              <li>Eurostat NUTS-2 2021</li>
            </ul>
          </div>
          <div>
            <div className="text-white">{tr(t.ftCaveats, lang)}</div>
            <p className="mt-3 text-white/50">{tr(t.ftCaveatsBody, lang)}</p>
            <p className="mt-3 text-white/50">
              {tr(t.ftCounterview, lang)}{" "}
              <a
                href="/jevons"
                className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                {tr(t.ftCounterviewLink, lang)}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          {tr(t.ftInspired, lang)}
        </div>
      </div>
    </footer>
  );
}
