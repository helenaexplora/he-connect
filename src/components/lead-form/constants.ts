import type { LeadFormData } from "./schema";

export const TURNSTILE_SITE_KEY = "0x4AAAAAACF73uW-8PrAMmCp";
export const TURNSTILE_CONTAINER_ID = "turnstile-container";

export const leadFormSteps = [
  { id: 1, title: "Sobre Você", emoji: "👋" },
  { id: 2, title: "Formação", emoji: "🎓" },
  { id: 3, title: "Experiência", emoji: "💼" },
  { id: 4, title: "Recursos", emoji: "💡" },
  { id: 5, title: "Interesses", emoji: "🇺🇸" },
  { id: 6, title: "Contato", emoji: "📬" },
];

export const leadFormStepFields: Record<number, (keyof LeadFormData)[]> = {
  1: ["fullName", "email", "country"],
  2: ["educationLevel", "studyArea", "graduationYear"],
  3: ["isCurrentlyWorking"],
  4: ["financialSituation", "englishLevel"],
  5: [],
  6: ["howDidYouFind", "contactPreference"],
};
