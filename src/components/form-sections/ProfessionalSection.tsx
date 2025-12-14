import { UseFormReturn } from "react-hook-form";
import { Briefcase } from "lucide-react";
import { MobileTooltip } from "@/components/ui/mobile-tooltip";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputWithCounter } from "@/components/ui/input-with-counter";
import { TextareaWithCounter } from "@/components/ui/textarea-with-counter";
import { LeadFormData } from "../LeadForm";

interface Props {
  form: UseFormReturn<LeadFormData>;
}

const workingOptions = [
  "Sim, trabalho atualmente",
  "Não, estou buscando oportunidades",
  "Não, sou estudante em tempo integral",
  "Prefiro não responder",
];

const experienceLevels = [
  "Sem experiência",
  "Menos de 1 ano",
  "1-2 anos",
  "3-5 anos",
  "5-10 anos",
  "Mais de 10 anos",
];

const ProfessionalSection = ({ form }: Props) => {
  const isWorking = form.watch("isCurrentlyWorking");
  const showWorkDetails = isWorking === "Sim, trabalho atualmente";
  const showPreviousWork = isWorking === "Não, estou buscando oportunidades";

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="section-title">
        <Briefcase className="w-5 h-5" />
        <span className="flex-1">Experiência Profissional</span>
        <MobileTooltip 
          content="Não é uma avaliação. Cada percurso é diferente, e compreender onde você está hoje ajuda-me a abordar temas mais úteis para a comunidade."
        />
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="isCurrentlyWorking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Você trabalha atualmente? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workingOptions.map((option) => (
                    <SelectItem key={option} value={option} className="py-3">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showWorkDetails && (
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="workArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação *</FormLabel>
                  <FormControl>
                    <InputWithCounter 
                      placeholder="Ex: Marketing, TI, Finanças, etc." 
                      className="h-12"
                      maxLength={100}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anos de Experiência *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level} className="py-3">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {showPreviousWork && (
          <FormField
            control={form.control}
            name="previousWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>O que você costumava fazer? *</FormLabel>
                <FormControl>
                  <TextareaWithCounter 
                    placeholder="Descreva brevemente sua experiência anterior ou área de atuação..."
                    className="min-h-[100px] text-base"
                    maxLength={500}
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ProfessionalSection;
