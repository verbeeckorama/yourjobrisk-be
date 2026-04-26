"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  eyebrow: string;
  label: string;
  blurb: string;
};

const tabs: Tab[] = [
  {
    href: "/",
    eyebrow: "01",
    label: "AI exposure",
    blurb: "Map · provinces · occupations · layoffs",
  },
  {
    href: "/tool",
    eyebrow: "02",
    label: "Check my risk",
    blurb: "Pick a province, role and scenario",
  },
  {
    href: "/jevons",
    eyebrow: "03",
    label: "Jevons paradox?",
    blurb: "The counter-view: more jobs, not fewer",
  },
];

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/60">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white"
          >
            Your Job Risk · <span className="text-accent">Belgium</span>
          </Link>
          <Link
            href="/methodology"
            className={`text-[11px] uppercase tracking-[0.2em] transition md:text-xs ${
              isActive("/methodology")
                ? "text-accent"
                : "text-white/50 hover:text-white"
            }`}
          >
            Methodology →
          </Link>
        </div>

        <nav>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tabs.map((t) => {
              const active = isActive(t.href);
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
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
                        {t.eyebrow}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.25em] transition ${
                          active
                            ? "text-accent"
                            : "text-white/30 group-hover:text-accent"
                        }`}
                      >
                        {active ? "● Viewing" : "→"}
                      </span>
                    </div>
                    <div
                      className={`mt-1 text-base font-semibold leading-tight md:text-lg ${
                        active ? "text-accent" : "text-white"
                      }`}
                    >
                      {t.label}
                    </div>
                    <div
                      className={`mt-1 text-xs ${
                        active ? "text-accent/80" : "text-white/55"
                      }`}
                    >
                      {t.blurb}
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
