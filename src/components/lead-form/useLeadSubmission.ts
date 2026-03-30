import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { LeadFormData } from "./schema";

interface UseLeadSubmissionOptions {
  resetTurnstile: () => void;
  turnstileError: boolean;
  turnstileToken: string | null;
}

export const useLeadSubmission = ({
  resetTurnstile,
  turnstileError,
  turnstileToken,
}: UseLeadSubmissionOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitLead = async (data: LeadFormData) => {
    if (!turnstileToken) {
      toast.error("Por favor, aguarde a verificação de segurança.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-lead-email", {
        body: {
          ...data,
          turnstileToken: turnstileError ? "bypass" : turnstileToken,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro ao enviar formulário");
      }

      setIsSubmitted(true);
      toast.success("Formulário enviado com sucesso! Verifique seu email.");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Erro ao enviar formulário. Tente novamente.");
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitted,
    isSubmitting,
    submitLead,
  };
};
