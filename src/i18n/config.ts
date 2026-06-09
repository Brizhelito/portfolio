import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";

const STORAGE_KEY = "rm.lang";

function detectInitialLang(): "es" | "en" {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  return "es";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: detectInitialLang(),
    fallbackLng: "es",
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

export function setLanguage(lang: "es" | "en") {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }
}

export default i18n;
