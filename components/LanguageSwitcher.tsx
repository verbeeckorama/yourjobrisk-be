"use client";

import { useLangCtx } from "@/components/LanguageProvider";
import { LANG_FULL, LANG_LABEL, LANGS, t } from "@/lib/i18n";
import { tr } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLangCtx();
  return (
    <div
      className="inline-flex items-center gap-1 rounded-sm border border-white/15 p-0.5"
      aria-label={tr(t.switcherLabel, lang)}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            title={LANG_FULL[l]}
            className={`rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-widest transition ${
              active
                ? "bg-accent text-ink"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {LANG_LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
