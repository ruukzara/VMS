import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./../locale/en.json";
import ja from "./../locale/ja.json";

const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
};

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    lng: "ja",
    fallbackLng: "ja",

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });

export default i18n;
