import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Send, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

import PersonalDataSection from "./form-sections/PersonalDataSection";
import EducationSection from "./form-sections/EducationSection";
import ProfessionalSection from "./form-sections/ProfessionalSection";
import FinancialSection from "./form-sections/FinancialSection";
import USAInterestsSection from "./form-sections/USAInterestsSection";
import EnglishSection from "./form-sections/EnglishSection";
import CommunicationSection from "./form-sections/CommunicationSection";

// Regex to validate names (letters, spaces, accents only - no numbers)
const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
// Regex to validate phone numbers (only digits, spaces, +, -, parentheses)
const phoneRegex = /^[\d\s+\-()]+$/;

const formSchema = z.object({
  fullName: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(nameRegex, "Nome deve conter apenas letras"),
  email: z.string()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
  country: z.string().min(1, "Selecione seu país"),
  countryOther: z.string().max(100, "Máximo de 100 caracteres").optional(),
  phone: z.string()
    .max(20, "Telefone deve ter no máximo 20 caracteres")
    .refine((val) => !val || phoneRegex.test(val), "Telefone inválido")
    .optional(),
  educationLevel: z.string().min(1, "Selecione seu nível de educação"),
  educationLevelOther: z.string().max(100, "Máximo de 100 caracteres").optional(),
  studyArea: z.string()
    .min(1, "Informe sua área de estudo")
    .max(100, "Área de estudo deve ter no máximo 100 caracteres"),
  graduationYear: z.string().min(1, "Selecione o ano de conclusão"),
  isCurrentlyWorking: z.string().min(1, "Selecione uma opção"),
  workArea: z.string().max(100, "Área de atuação deve ter no máximo 100 caracteres").optional(),
  yearsExperience: z.string().optional(),
  previousWork: z.string().max(500, "Máximo de 500 caracteres").optional(),
  financialSituation: z.string().min(1, "Selecione uma opção"),
  usaInterests: z.array(z.string()).optional(),
  usaInterestsOther: z.string().max(200, "Máximo de 200 caracteres").optional(),
  englishLevel: z.string().min(1, "Selecione seu nível de inglês"),
  howDidYouFind: z.string().min(1, "Informe como nos conheceu"),
  howDidYouFindOther: z.string().max(200, "Máximo de 200 caracteres").optional(),
  contactPreference: z.string().min(1, "Selecione sua preferência de contato"),
  whatsappContact: z.string()
    .max(20, "Número deve ter no máximo 20 caracteres")
    .refine((val) => !val || phoneRegex.test(val), "Número inválido")
    .optional(),
  additionalMessage: z.string().max(1000, "Mensagem deve ter no máximo 1000 caracteres").optional(),
}).superRefine((data, ctx) => {
  // Validate conditional work fields
  if (data.isCurrentlyWorking === "Sim, trabalho atualmente") {
    if (!data.workArea || data.workArea.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe sua área de atuação",
        path: ["workArea"],
      });
    }
    if (!data.yearsExperience || data.yearsExperience.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione os anos de experiência",
        path: ["yearsExperience"],
      });
    }
  }
  if (data.isCurrentlyWorking === "Não, estou buscando oportunidades") {
    if (!data.previousWork || data.previousWork.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe o que você costumava fazer",
        path: ["previousWork"],
      });
    }
  }
  // Validate WhatsApp contact when WhatsApp is selected
  if (data.contactPreference === "WhatsApp") {
    if (!data.whatsappContact || data.whatsappContact.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe seu número de WhatsApp",
        path: ["whatsappContact"],
      });
    }
  }
  // Validate "Other" fields when "Outro" is selected
  if (data.country === "Outro" && (!data.countryOther || data.countryOther.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Informe seu país",
      path: ["countryOther"],
    });
  }
  if (data.howDidYouFind === "Outro" && (!data.howDidYouFindOther || data.howDidYouFindOther.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Informe como nos conheceu",
      path: ["howDidYouFindOther"],
    });
  }
});

export type LeadFormData = z.infer<typeof formSchema>;

const TURNSTILE_SITE_KEY = "0x4AAAAAACF73uW-8PrAMmCp";

// Step configuration
const steps = [
  { id: 1, title: "Sobre Você", emoji: "👋" },
  { id: 2, title: "Formação", emoji: "🎓" },
  { id: 3, title: "Experiência", emoji: "💼" },
  { id: 4, title: "Recursos", emoji: "💡" },
  { id: 5, title: "Interesses", emoji: "🇺🇸" },
  { id: 6, title: "Contato", emoji: "📬" },
];

// Fields required for each step validation
const stepFields: Record<number, (keyof LeadFormData)[]> = {
  1: ["fullName", "email", "country"],
  2: ["educationLevel", "studyArea", "graduationYear"],
  3: ["isCurrentlyWorking"],
  4: ["financialSituation", "englishLevel"],
  5: [],
  6: ["howDidYouFind", "contactPreference"],
};

const LeadForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const turnstileContainerId = "turnstile-container";
  const widgetIdRef = useRef<string | null>(null);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      countryOther: "",
      phone: "",
      educationLevel: "",
      educationLevelOther: "",
      studyArea: "",
      graduationYear: "",
      isCurrentlyWorking: "",
      workArea: "",
      yearsExperience: "",
      previousWork: "",
      financialSituation: "",
      usaInterests: [],
      usaInterestsOther: "",
      englishLevel: "",
      howDidYouFind: "",
      howDidYouFindOther: "",
      contactPreference: "",
      whatsappContact: "",
      additionalMessage: "",
    },
    mode: "onChange",
  });

  const progress = (currentStep / steps.length) * 100;

  useEffect(() => {
    if (currentStep !== steps.length) return;
    
    let mounted = true;
    
    const renderTurnstile = () => {
      const container = document.getElementById(turnstileContainerId);
      if (!container || !window.turnstile || widgetIdRef.current) return;
      
      try {
        widgetIdRef.current = window.turnstile.render(`#${turnstileContainerId}`, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            if (mounted) {
              setTurnstileToken(token);
              setTurnstileError(false);
            }
          },
          "error-callback": () => {
            console.log("Turnstile error - allowing form submission without CAPTCHA");
            if (mounted) {
              setTurnstileError(true);
              setTurnstileToken("bypass");
            }
          },
          "expired-callback": () => {
            if (mounted) setTurnstileToken(null);
          },
        });
      } catch (e) {
        console.error("Turnstile render error:", e);
        if (mounted) {
          setTurnstileError(true);
          setTurnstileToken("bypass");
        }
      }
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      document.head.appendChild(script);
    }
    
    (window as unknown as Record<string, unknown>).onTurnstileLoad = () => {
      if (mounted) renderTurnstile();
    };

    return () => {
      mounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          console.error("Turnstile cleanup error:", e);
        }
      }
    };
  }, [currentStep]);

  const validateCurrentStep = async (): Promise<boolean> => {
    const fields = stepFields[currentStep];
    if (fields.length === 0) return true;
    
    const result = await form.trigger(fields);
    
    // Additional validation for conditional fields
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
    if (isValid && currentStep < steps.length) {
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

  const onSubmit = async (data: LeadFormData) => {
    if (!turnstileToken) {
      toast.error("Por favor, aguarde a verificação de segurança.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ...data,
            turnstileToken: turnstileError ? "bypass" : turnstileToken,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao enviar formulário");
      }

      setIsSubmitted(true);
      toast.success("Formulário enviado com sucesso! Verifique seu email.");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Erro ao enviar formulário. Tente novamente.");
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch (e) {
          console.error("Turnstile reset error:", e);
        }
      }
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
  }

  const renderStep = () => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Header */}
        <div className="form-section !p-4 md:!p-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{steps[currentStep - 1].emoji}</span>
              <div>
                <p className="text-xs text-muted-foreground">
                  Passo {currentStep} de {steps.length}
                </p>
                <h3 className="font-semibold text-primary">
                  {steps[currentStep - 1].title}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <Progress value={progress} className="h-2" />
          
          {/* Step dots */}
          <div className="flex justify-between mt-3">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (step.id < currentStep) {
                    setDirection("backward");
                    setCurrentStep(step.id);
                  }
                }}
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

        {/* Form Content */}
        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="form-section !p-4">
          {currentStep === steps.length && (
            <>
              <div id={turnstileContainerId} className="cf-turnstile flex justify-center mb-4" />
              {turnstileError && (
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Verificação de segurança não disponível. Você ainda pode enviar o formulário.
                </p>
              )}
            </>
          )}
          
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 h-12"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Voltar
              </Button>
            )}
            
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
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
      </form>
    </Form>
  );
};

declare global {
  interface Window {
    turnstile: {
      render: (container: string, options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback': () => void;
        'expired-callback': () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default LeadForm;
