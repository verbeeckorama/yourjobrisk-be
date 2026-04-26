"use client";

import { useLang, tr } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function Narrative() {
  const lang = useLang();
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-28">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
          {tr(t.narEyebrow, lang)}
        </p>
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          {tr(t.narHeadline, lang)}
        </h2>
        <div className="mt-8 space-y-6 text-white/70 md:text-lg">
          <p>
            {tr(t.narP1Pre, lang)}{" "}
            <span className="text-white">{tr(t.narP1Bold, lang)}</span>{" "}
            {tr(t.narP1Post, lang)}
          </p>
          <p>{tr(t.narP2, lang)}</p>
          <p>{tr(t.narP3, lang)}</p>
          <p className="text-white/60">
            {tr(t.narCounterview, lang)}{" "}
            <a
              href="/jevons"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              {tr(t.narCounterviewLink, lang)}
            </a>{" "}
            {tr(t.narCounterviewPost, lang)}
          </p>
        </div>
      </div>
    </section>
  );
}
