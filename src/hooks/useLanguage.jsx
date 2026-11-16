import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translate } from '../data/translations';

const STORAGE_KEY = 'blubber-language';
const LanguageContext = createContext(null);
const normalize = (value) => (value === 'en' ? 'en' : 'vi');

export function LanguageProvider({ children }) {
  const [language, updateLanguage] = useState(() => normalize(document.documentElement.lang));

  useEffect(() => {
    document.documentElement.lang = language;
    const description = translate(
      'Một bến cảng nhỏ, một đại dương yêu thương. Ghé thăm thế giới của chú cá mập voi Blubber.',
      language,
    );
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', description);
    }
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'en' ? 'en_US' : 'vi_VN');
    document
      .querySelector('meta[property="og:locale:alternate"]')
      ?.setAttribute('content', language === 'en' ? 'vi_VN' : 'en_US');
  }, [language]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === STORAGE_KEY || event.key === null)
        updateLanguage(normalize(event.newValue));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const context = useMemo(
    () => ({
      language,
      t: (source, values) => translate(source, language, values),
      setLanguage(next) {
        const selected = normalize(next);
        updateLanguage(selected);
        try {
          localStorage.setItem(STORAGE_KEY, selected);
        } catch {
          /* Keep this visit usable without storage. */
        }
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={context}>{children}</LanguageContext.Provider>;
}

export default function useLanguage() {
  return useContext(LanguageContext);
}
