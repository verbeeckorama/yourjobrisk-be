"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, tr } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n";

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const lang = useLang();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const tabs = [
    {
      href: "/",
      eyebrow: "01",
      label: tr(t.navAiExposure, lang),
      blurb: tr(t.navAiExposureBlurb, lang),
    },
    {
      href: "/tool",
      eyebrow: "02",
      label: tr(t.navCheckRisk, lang),
      blurb: tr(t.navCheckRiskBlurb, lang),
    },
    {
      href: "/jevons",
      eyebrow: "03",
      label: tr(t.navJevons, lang),
      blurb: tr(t.navJevonsBlurb, lang),
    },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/60">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white"
          >
            {tr(t.navTagline, lang)} · <span className="text-accent">Belgium</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/methodology"
              className={`text-[11px] uppercase tracking-[0.2em] transition md:text-xs ${
                isActive("/methodology")
                  ? "text-accent"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tr(t.navMethodology, lang)}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        <nav>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tabs.map((tab) => {
              const active = isActive(tab.href);
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex h-full flex-col rounded-sm border px-4 py-3 transition ${
                      active
                        ? "border-accent bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(255,65,51,0.4)]"
                        : "border-accent/40 bg-accent/[0.04] text-white hover:border-accent hover:bg-accent/10"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`numeric text-[10px] uppercase tracking-[0.25em] ${
                          active ? "text-accent" : "text-accent/70"
                        }`}
                      >
                        {tab.eyebrow}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.25em] transition ${
                          active
                            ? "text-accent"
                            : "text-white/30 group-hover:text-accent"
                        }`}
                      >
                        {active ? tr(t.navViewing, lang) : "→"}
                      </span>
                    </div>
                    <div
                      className={`mt-1 text-base font-semibold leading-tight md:text-lg ${
                        active ? "text-accent" : "text-white"
                      }`}
                    >
                      {tab.label}
                    </div>
                    <div
                      className={`mt-1 text-xs ${
                        active ? "text-accent/80" : "text-white/55"
                      }`}
                    >
                      {tab.blurb}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
