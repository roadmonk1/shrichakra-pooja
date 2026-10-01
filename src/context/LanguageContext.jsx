import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

const STORAGE_LANG_KEY = 'srichakra_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      return saved === 'kn' || saved === 'sa' || saved === 'en' ? saved : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'kn' || lang === 'sa') {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_LANG_KEY, lang);
      } catch (e) {
        console.warn('Could not save language to localStorage:', e);
      }
    }
  };

  /**
   * t(path, fallback)
   * Example: t('nav.home') => 'ಮುಖಪುಟ' when language === 'kn'
   */
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    let curr = translations;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        return fallback || path;
      }
    }

    if (curr && typeof curr === 'object') {
      return curr[language] || curr.en || fallback || path;
    }

    return curr || fallback || path;
  };

  /**
   * resolveText(obj, fallback)
   * Resolves multilingual client content objects: { en: '...', kn: '...', sa: '...' }
   */
  const resolveText = (obj, fallback = '') => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || obj.kn || obj.sa || fallback;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, resolveText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
