export interface LeadSubmissionData {
  fullName: string;
  email: string;
  country: string;
  countryOther?: string;
  phone?: string;
  educationLevel: string;
  educationLevelOther?: string;
  studyArea: string;
  graduationYear: string;
  isCurrentlyWorking: string;
  yearsExperience?: string;
  workArea?: string;
  previousWork?: string;
  financialSituation: string;
  usaInterests?: string[];
  usaInterestsOther?: string;
  englishLevel: string;
  howDidYouFind: string;
  howDidYouFindOther?: string;
  contactPreference: string;
  whatsappContact?: string;
  additionalMessage?: string;
  turnstileToken: string;
}
