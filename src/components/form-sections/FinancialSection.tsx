import { UseFormReturn } from "react-hook-form";
import { DollarSign } from "lucide-react";
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

const financialSituations = [
  "Tenho alguns recursos e estou a pesquisar opções",
  "Tenho poucos recursos e procuro caminhos possíveis",
  "Não tenho recursos disponíveis, mas quero entender opções gerais",
  "Prefiro não responder",
];

const FinancialSection = ({ form }: Props) => {
  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="section-title">
        <DollarSign className="w-5 h-5" />
        <span className="flex-1">Situação Financeira *</span>
        <MobileTooltip 
          content="Esta pergunta é confidencial e não pede valores. Ela serve apenas para identificar que tipo de conteúdos a comunidade mais precisa — bolsas, caminhos acessíveis ou alternativas económicas."
        />
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="financialSituation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="leading-relaxed">
                Como você descreveria a sua situação atual relacionada ao seu sonho de estudar fora?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-auto min-h-[48px] whitespace-normal text-left py-3">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {financialSituations.map((situation) => (
                    <SelectItem 
                      key={situation} 
                      value={situation} 
                      className="py-3 whitespace-normal"
                    >
                      {situation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FinancialSection;
