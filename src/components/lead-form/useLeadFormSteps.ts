import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { leadFormStepFields, leadFormSteps } from "./constants";
import type { LeadFormData } from "./schema";

export const useLeadFormSteps = (form: UseFormReturn<LeadFormData>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const validateCurrentStep = async (): Promise<boolean> => {
    const fields = leadFormStepFields[currentStep];
    if (fields.length === 0) return true;

    const result = await form.trigger(fields);

    if (currentStep === 3) {
      const isWorking = form.getValues("isCurrentlyWorking");

      if (isWorking === "Sim, trabalho atualmente") {
        const workAreaValid = await form.trigger(["workArea", "yearsExperience"]);
        return result && workAreaValid;
      }

      if (isWorking === "Não, estou buscando oportunidades") {
        const previousWorkValid = await form.trigger(["previousWork"]);
        return result && previousWorkValid;
      }
    }

    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < leadFormSteps.length) {
      setDirection("forward");
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection("backward");
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const jumpToStep = (stepId: number) => {
    if (stepId < currentStep) {
      setDirection("backward");
      setCurrentStep(stepId);
    }
  };

  return {
    currentStep,
    direction,
    progress: (currentStep / leadFormSteps.length) * 100,
    handleNext,
    handlePrevious,
    jumpToStep,
  };
};
