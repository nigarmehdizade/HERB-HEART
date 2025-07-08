import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import az from './locales/az.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en', // Əgər az yoxdursa, ingiliscə olan original mətni istifadə et
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    resources: {
      az: { translation: az },
      // en yoxdur! çünki orijinal mətni olduğu kimi saxlayırsan
    },
    interpolation: {
      escapeValue: false,
    },backend: {
  loadPath: '/locales/{{lng}}.json',
},
  });

export default i18n;
