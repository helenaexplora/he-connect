import { CheckCircle, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadFormSteps } from "./constants";

interface LeadFormNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPrevious: () => void;
  turnstileToken: string | null;
}

export const LeadFormSuccess = () => {
  return (
    <div className="form-section text-center py-12 animate-fade-in">
      <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
      <h2 className="text-2xl font-serif font-bold text-primary mb-2">
        Obrigada por se juntar à comunidade!
      </h2>
      <p className="text-muted-foreground">
        Verifique seu email para receber nossas atualizações sobre estudo nos EUA.
      </p>
    </div>
  );
};

const LeadFormNavigation = ({
  currentStep,
  isSubmitting,
  onNext,
  onPrevious,
  turnstileToken,
}: LeadFormNavigationProps) => {
  return (
    <div className="form-section !p-4">
      <div className="flex gap-3">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="flex-1 h-12"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </Button>
        )}

        {currentStep < leadFormSteps.length ? (
          <Button
            type="button"
            onClick={onNext}
            className="flex-1 h-12"
          >
            Continuar
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="flex-1 h-12"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar
              </>
            )}
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Os seus dados são usados apenas para compreender melhor a comunidade. Veja a nossa{" "}
        <a href="/privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </a>.
      </p>
    </div>
  );
};

export default LeadFormNavigation;
