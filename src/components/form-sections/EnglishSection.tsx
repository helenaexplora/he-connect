import { UseFormReturn } from "react-hook-form";
import { Languages } from "lucide-react";
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
import { LeadFormData } from "../LeadForm";

interface Props {
  form: UseFormReturn<LeadFormData>;
}

const englishLevels = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
  { value: "fluente", label: "Fluente" },
];

const EnglishSection = ({ form }: Props) => {
  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <h2 className="section-title">
        <Languages className="w-5 h-5" />
        <span className="flex-1">Nível de Inglês</span>
        <MobileTooltip 
          content="Muitas pessoas começam com níveis diferentes de inglês. Esta informação ajuda-me a preparar conteúdos adequados para quem está a começar e para quem já é avançado."
        />
      </h2>

      <FormField
        control={form.control}
        name="englishLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seu Nível de Inglês *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {englishLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-3">
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EnglishSection;
