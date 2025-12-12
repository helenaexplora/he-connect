import { UseFormReturn } from "react-hook-form";
import { Star } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadFormData } from "../LeadForm";

interface Props {
  form: UseFormReturn<LeadFormData>;
}

const interestOptions = [
  "Como funcionam os programas de estudo nos EUA",
  "Visto de estudante (informações gerais)",
  "CPT e OPT (explicações gerais)",
  "Aprender inglês / melhorar o inglês",
  "Faculdades e programas acessíveis",
  "Transição de carreira para TI",
  "Vida acadêmica",
  "Vida nos EUA no geral",
  "Bolsas de estudo (informações gerais)",
];

const USAInterestsSection = ({ form }: Props) => {
  const watchInterests = form.watch("usaInterests") || [];
  const showOtherInput = watchInterests.includes("Outro");

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.35s" }}>
      <h2 className="section-title">
        <Star className="w-5 h-5" />
        <span className="flex-1">Interesses Relacionados aos EUA</span>
      </h2>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="usaInterests"
          render={() => (
            <FormItem>
              <FormLabel className="leading-relaxed">
                O que você mais deseja entender ou acompanhar nos meus conteúdos? (Marque quantos quiser)
              </FormLabel>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {interestOptions.map((interest) => (
                  <FormField
                    key={interest}
                    control={form.control}
                    name="usaInterests"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(interest)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, interest]);
                              } else {
                                field.onChange(currentValue.filter((v) => v !== interest));
                              }
                            }}
                            className="mt-0.5 h-5 w-5"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer leading-relaxed flex-1">
                          {interest}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormField
                  control={form.control}
                  name="usaInterests"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes("Outro")}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            if (checked) {
                              field.onChange([...currentValue, "Outro"]);
                            } else {
                              field.onChange(currentValue.filter((v) => v !== "Outro"));
                              form.setValue("usaInterestsOther", "");
                            }
                          }}
                          className="mt-0.5 h-5 w-5"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer leading-relaxed flex-1">
                        Outro
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {showOtherInput && (
          <FormField
            control={form.control}
            name="usaInterestsOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especifique outros interesses</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seus outros interesses..." 
                    className="h-12"
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

export default USAInterestsSection;
