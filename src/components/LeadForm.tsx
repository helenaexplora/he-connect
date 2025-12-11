import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle } from "lucide-react";

import PersonalDataSection from "./form-sections/PersonalDataSection";
import EducationSection from "./form-sections/EducationSection";
import ProfessionalSection from "./form-sections/ProfessionalSection";
import FinancialSection from "./form-sections/FinancialSection";
import USAInterestsSection from "./form-sections/USAInterestsSection";
import EnglishSection from "./form-sections/EnglishSection";
import CommunicationSection from "./form-sections/CommunicationSection";

const formSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  country: z.string().min(1, "Selecione seu país"),
  countryOther: z.string().optional(),
  phone: z.string().max(20).optional(),
  educationLevel: z.string().min(1, "Selecione seu nível de educação"),
  educationLevelOther: z.string().optional(),
  studyArea: z.string().min(1, "Informe sua área de estudo").max(100),
  graduationYear: z.string().min(1, "Selecione o ano de conclusão"),
  isCurrentlyWorking: z.string().min(1, "Selecione uma opção"),
  workArea: z.string().max(100).optional(),
  yearsExperience: z.string().optional(),
  financialSituation: z.string().optional(),
  usaInterests: z.array(z.string()).optional(),
  usaInterestsOther: z.string().optional(),
  englishLevel: z.string().min(1, "Selecione seu nível de inglês"),
  howDidYouFind: z.string().min(1, "Informe como nos conheceu"),
  howDidYouFindOther: z.string().optional(),
  contactPreference: z.string().min(1, "Selecione sua preferência de contato"),
  whatsappContact: z.string().max(20).optional(),
  additionalMessage: z.string().max(1000).optional(),
});

export type LeadFormData = z.infer<typeof formSchema>;

const TURNSTILE_SITE_KEY = "0x4AAAAAACF73uW-8PrAMmCp";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
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
  });

  useEffect(() => {
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

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    // Load Turnstile script if not already present
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Define callback
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
  }, []);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalDataSection form={form} />
        <EducationSection form={form} />
        <ProfessionalSection form={form} />
        <FinancialSection form={form} />
        <USAInterestsSection form={form} />
        <EnglishSection form={form} />
        <CommunicationSection form={form} />

        <div className="form-section">
          <div id={turnstileContainerId} className="cf-turnstile flex justify-center mb-4" />
          
          {turnstileError && (
            <p className="text-sm text-muted-foreground text-center mb-4">
              Verificação de segurança não disponível. Você ainda pode enviar o formulário.
            </p>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="w-full h-12 text-lg font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar Formulário
              </>
            )}
          </Button>
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
