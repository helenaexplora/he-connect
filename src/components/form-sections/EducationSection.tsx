import { UseFormReturn } from "react-hook-form";
import { GraduationCap } from "lucide-react";
import { MobileTooltip } from "@/components/ui/mobile-tooltip";
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

const educationLevels = [
  "Ensino Médio",
  "Técnico",
  "Graduação em andamento",
  "Graduação completa",
  "Pós-graduação",
  "Mestrado",
  "Doutorado",
  "Outro",
];

const graduationYears = Array.from({ length: 15 }, (_, i) => {
  const year = new Date().getFullYear() + 5 - i;
  return year.toString();
});

const EducationSection = ({ form }: Props) => {
  const watchEducationLevel = form.watch("educationLevel");

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h2 className="section-title">
        <GraduationCap className="w-5 h-5" />
        <span className="flex-1">Formação Académica</span>
        <MobileTooltip 
          content="Estas perguntas ajudam-me a entender em que fase dos estudos você está. Assim, consigo criar conteúdos que façam sentido para cada etapa."
        />
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de Educação *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione seu nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {educationLevels.map((level) => (
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

        {watchEducationLevel === "Outro" && (
          <FormField
            control={form.control}
            name="educationLevelOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especifique o Nível *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seu nível de educação" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="studyArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área de Estudo *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Administração, Engenharia, etc." 
                  className="h-12"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de Conclusão (ou previsto) *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {graduationYears.map((year) => (
                    <SelectItem key={year} value={year} className="py-3">
                      {year}
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

export default EducationSection;
