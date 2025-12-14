import { UseFormReturn } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { InputWithCounter } from "@/components/ui/input-with-counter";
import { LeadFormData } from "../LeadForm";

interface Props {
  form: UseFormReturn<LeadFormData>;
}

const howDidYouFindOptions = [
  "YouTube",
  "Instagram",
  "TikTok",
  "Google",
  "Indicação de amigo",
  "Outro",
];

const contactPreferences = [
  "Email",
  "WhatsApp",
  "Zoom/Google Meet",
  "Qualquer um",
];

const CommunicationSection = ({ form }: Props) => {
  const watchHowDidYouFind = form.watch("howDidYouFind");
  const watchContactPreference = form.watch("contactPreference");

  return (
    <div className="form-section animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <h2 className="section-title">
        <MessageSquare className="w-5 h-5" />
        <span className="flex-1">Comunicação</span>
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="howDidYouFind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como nos conheceu? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {howDidYouFindOptions.map((option) => (
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

        {watchHowDidYouFind === "Outro" && (
          <FormField
            control={form.control}
            name="howDidYouFindOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especifique *</FormLabel>
                <FormControl>
                  <InputWithCounter 
                    placeholder="Como nos encontrou?" 
                    className="h-12"
                    maxLength={200}
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

        <FormField
          control={form.control}
          name="contactPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferência de Contato *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactPreferences.map((pref) => (
                    <SelectItem key={pref} value={pref} className="py-3">
                      {pref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchContactPreference === "WhatsApp" && (
          <FormField
            control={form.control}
            name="whatsappContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto WhatsApp *</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Insira seu WhatsApp"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="additionalMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem Adicional (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Algo mais que gostaria de compartilhar?"
                  className="min-h-[100px] resize-none text-base"
                  maxLength={1000}
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

export default CommunicationSection;
