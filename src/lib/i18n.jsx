import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { T } from '../data/content.js';

const LangContext = createContext(null);
const KEY = 'redaa-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch (e) { /* storage blocked */ }
  return 'en';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  // Switch document language and direction (RTL for Arabic) before paint.
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
  }, [lang]);

  const value = useMemo(() => {
    const ar = lang === 'ar';
    return {
      lang,
      ar,
      t: (k) => T[lang][k],
      pick: (en, arText) => (ar ? arText : en),
      toggle: () => setLang(ar ? 'en' : 'ar'),
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
