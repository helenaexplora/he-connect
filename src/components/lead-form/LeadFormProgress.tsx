import { leadFormSteps } from "./constants";

interface LeadFormProgressProps {
  currentStep: number;
  progress: number;
  onStepClick: (stepId: number) => void;
}

const LeadFormProgress = ({
  currentStep,
  progress,
  onStepClick,
}: LeadFormProgressProps) => {
  return (
    <div className="form-section !p-4 md:!p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{leadFormSteps[currentStep - 1].emoji}</span>
          <div>
            <p className="text-xs text-muted-foreground">
              Passo {currentStep} de {leadFormSteps.length}
            </p>
            <h3 className="font-semibold text-primary">
              {leadFormSteps[currentStep - 1].title}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-3">
        {leadFormSteps.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
              step.id === currentStep
                ? "bg-primary text-primary-foreground scale-110"
                : step.id < currentStep
                  ? "bg-accent text-accent-foreground cursor-pointer hover:scale-105"
                  : "bg-muted text-muted-foreground"
            }`}
            disabled={step.id > currentStep}
          >
            {step.id < currentStep ? "✓" : step.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeadFormProgress;
