import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './en-gb.json'; // Your JSON file path

/* const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const locales = RNLocalize.getLocales();
    callback(locales[0]?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
}; */

i18n
  //.use(languageDetector) // Automatically detects device language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: translations }, // Add more languages if needed
    },
    fallbackLng: 'en', // Default language if none detected
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
