import { UseFormReturn } from "react-hook-form";
import { Briefcase } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="section-title">
        <Briefcase className="w-5 h-5" />
        Experiência Profissional
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
                  <FormLabel>Em que área?</FormLabel>
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
                  <FormLabel>Quantos anos de experiência?</FormLabel>
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
      </div>
    </div>
  );
};

export default ProfessionalSection;
