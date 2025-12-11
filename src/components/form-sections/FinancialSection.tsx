import { UseFormReturn } from "react-hook-form";
import { DollarSign } from "lucide-react";
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

const investmentCapacities = [
  "Até $10.000 USD/ano",
  "$10.000 - $25.000 USD/ano",
  "$25.000 - $50.000 USD/ano",
  "Mais de $50.000 USD/ano",
  "Preciso de bolsa integral",
  "Prefiro não informar",
];

const scholarshipInterests = [
  "Sim, estou buscando bolsas ativamente",
  "Sim, mas não é essencial",
  "Não, tenho recursos próprios",
  "Ainda estou avaliando",
];

const FinancialSection = ({ form }: Props) => {
  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <h2 className="section-title">
        <DollarSign className="w-5 h-5" />
        Capacidade Financeira
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="investmentCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade de Investimento *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {investmentCapacities.map((capacity) => (
                    <SelectItem key={capacity} value={capacity}>
                      {capacity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scholarshipInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interesse em Bolsas de Estudo *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {scholarshipInterests.map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
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
