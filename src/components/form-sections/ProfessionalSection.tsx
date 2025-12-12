import { UseFormReturn } from "react-hook-form";
import { Briefcase, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        Experiência Profissional
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button" className="ml-2 text-muted-foreground hover:text-primary transition-colors">
              <HelpCircle className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-sm">
              <p>Não é uma avaliação. Cada percurso é diferente, e compreender onde você está hoje ajuda-me a abordar temas mais úteis para a comunidade.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="workArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Atuação *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Marketing, TI, Finanças, etc." {...field} />
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
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
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
                  <Textarea 
                    placeholder="Descreva brevemente sua experiência anterior ou área de atuação..."
                    className="min-h-[100px]"
                    {...field} 
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
