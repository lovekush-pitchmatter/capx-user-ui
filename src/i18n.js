import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import id from './locales/id.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import nl from './locales/nl.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
      fr: { translation: fr },
      de: { translation: de },
      nl: { translation: nl },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
