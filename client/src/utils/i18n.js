import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const languageStorageKey = 'language';

const supportedLanguages = ['en', 'ar'];
const fallbackLanguage = 'en';
const storedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem(languageStorageKey) : null;
const initialLanguage = supportedLanguages.includes(storedLanguage) ? storedLanguage : fallbackLanguage;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: fallbackLanguage,
    supportedLngs: supportedLanguages,
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/common.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
