import type { UseFormReturn } from "react-hook-form";
import CommunicationSection from "../form-sections/CommunicationSection";
import EducationSection from "../form-sections/EducationSection";
import EnglishSection from "../form-sections/EnglishSection";
import FinancialSection from "../form-sections/FinancialSection";
import PersonalDataSection from "../form-sections/PersonalDataSection";
import ProfessionalSection from "../form-sections/ProfessionalSection";
import USAInterestsSection from "../form-sections/USAInterestsSection";
import type { LeadFormData } from "./schema";

interface LeadFormStepContentProps {
  currentStep: number;
  direction: "forward" | "backward";
  form: UseFormReturn<LeadFormData>;
}

const LeadFormStepContent = ({
  currentStep,
  direction,
  form,
}: LeadFormStepContentProps) => {
  const animationClass = direction === "forward"
    ? "animate-slide-in-right"
    : "animate-slide-in-left";

  return (
    <div key={currentStep} className={animationClass}>
      {currentStep === 1 && <PersonalDataSection form={form} />}
      {currentStep === 2 && <EducationSection form={form} />}
      {currentStep === 3 && <ProfessionalSection form={form} />}
      {currentStep === 4 && (
        <div className="space-y-6">
          <FinancialSection form={form} />
          <EnglishSection form={form} />
        </div>
      )}
      {currentStep === 5 && <USAInterestsSection form={form} />}
      {currentStep === 6 && <CommunicationSection form={form} />}
    </div>
  );
};

export default LeadFormStepContent;
