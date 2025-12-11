import { UseFormReturn } from "react-hook-form";
import { Target } from "lucide-react";
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

const programTypes = [
  "Graduação (Bachelor's)",
  "Pós-graduação (Master's)",
  "MBA",
  "Doutorado (PhD)",
  "Curso de Inglês",
  "Programa de estágio (CPT/OPT)",
  "Intercâmbio de curta duração",
  "Certificação profissional",
  "Outro",
];

const ProgramSection = ({ form }: Props) => {
  const watchProgramType = form.watch("programType");

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="section-title">
        <Target className="w-5 h-5" />
        Programa de Interesse
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="programType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Programa *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de programa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchProgramType === "Outro" && (
          <FormField
            control={form.control}
            name="programTypeOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especifique o Programa *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o tipo de programa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="mainQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suas Principais Dúvidas (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Compartilhe suas principais dúvidas sobre estudar nos EUA..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProgramSection;
