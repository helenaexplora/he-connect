import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LeadFormNavigation, { LeadFormSuccess } from "./lead-form/LeadFormNavigation";
import LeadFormProgress from "./lead-form/LeadFormProgress";
import LeadFormSecurity from "./lead-form/LeadFormSecurity";
import LeadFormStepContent from "./lead-form/LeadFormStepContent";
import { leadFormDefaultValues, leadFormSchema, type LeadFormData } from "./lead-form/schema";
import { useLeadFormSteps } from "./lead-form/useLeadFormSteps";
import { useLeadSubmission } from "./lead-form/useLeadSubmission";
import { useTurnstile } from "./lead-form/useTurnstile";

const LeadForm = () => {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: leadFormDefaultValues,
    mode: "onChange",
  });

  const { currentStep, direction, progress, handleNext, handlePrevious, jumpToStep } = useLeadFormSteps(form);
  const { resetTurnstile, turnstileError, turnstileToken } = useTurnstile();
  const { isSubmitted, isSubmitting, submitLead } = useLeadSubmission({
    resetTurnstile,
    turnstileError,
    turnstileToken,
  });

  if (isSubmitted) {
    return <LeadFormSuccess />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitLead)} className="space-y-6">
        <LeadFormSecurity
          turnstileError={turnstileError}
          turnstileToken={turnstileToken}
        />

        <LeadFormProgress
          currentStep={currentStep}
          progress={progress}
          onStepClick={jumpToStep}
        />

        <div className="min-h-[300px]">
          <LeadFormStepContent
            currentStep={currentStep}
            direction={direction}
            form={form}
          />
        </div>

        <LeadFormNavigation
          currentStep={currentStep}
          isSubmitting={isSubmitting}
          onNext={() => {
            void handleNext();
          }}
          onPrevious={handlePrevious}
          turnstileToken={turnstileToken}
        />
      </form>
    </Form>
  );
};

export default LeadForm;
