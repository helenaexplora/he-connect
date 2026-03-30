import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const textFieldRegex = /^[a-zA-ZÀ-ÿ\s\-,./()&]+$/;

export const leadFormSchema = z.object({
  fullName: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(nameRegex, "Nome deve conter apenas letras"),
  email: z.string()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
  country: z.string().min(1, "Selecione seu país"),
  countryOther: z.string().max(100, "Máximo de 100 caracteres").optional(),
  phone: z.string()
    .refine((val) => !val || isValidPhoneNumber(val), "Número de telefone inválido")
    .optional(),
  educationLevel: z.string().min(1, "Selecione seu nível de educação"),
  educationLevelOther: z.string().max(100, "Máximo de 100 caracteres").optional(),
  studyArea: z.string()
    .min(1, "Informe sua área de estudo")
    .max(100, "Área de estudo deve ter no máximo 100 caracteres"),
  graduationYear: z.string().min(1, "Selecione o ano de conclusão"),
  isCurrentlyWorking: z.string().min(1, "Selecione uma opção"),
  workArea: z.string()
    .max(100, "Área de atuação deve ter no máximo 100 caracteres")
    .refine((val) => !val || textFieldRegex.test(val), "Área de atuação deve conter apenas letras")
    .optional(),
  yearsExperience: z.string().optional(),
  previousWork: z.string().max(500, "Máximo de 500 caracteres").optional(),
  financialSituation: z.string().min(1, "Selecione uma opção"),
  usaInterests: z.array(z.string()).optional(),
  usaInterestsOther: z.string().max(200, "Máximo de 200 caracteres").optional(),
  englishLevel: z.string().min(1, "Selecione seu nível de inglês"),
  howDidYouFind: z.string().min(1, "Informe como nos conheceu"),
  howDidYouFindOther: z.string().max(200, "Máximo de 200 caracteres").optional(),
  contactPreference: z.string().min(1, "Selecione sua preferência de contato"),
  whatsappContact: z.string()
    .refine((val) => !val || isValidPhoneNumber(val), "Número de WhatsApp inválido")
    .optional(),
  additionalMessage: z.string().max(1000, "Mensagem deve ter no máximo 1000 caracteres").optional(),
}).superRefine((data, ctx) => {
  if (data.isCurrentlyWorking === "Sim, trabalho atualmente") {
    if (!data.workArea || data.workArea.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe sua área de atuação",
        path: ["workArea"],
      });
    }

    if (!data.yearsExperience || data.yearsExperience.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione os anos de experiência",
        path: ["yearsExperience"],
      });
    }
  }

  if (data.isCurrentlyWorking === "Não, estou buscando oportunidades") {
    if (!data.previousWork || data.previousWork.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe o que você costumava fazer",
        path: ["previousWork"],
      });
    }
  }

  if (data.contactPreference === "WhatsApp") {
    if (!data.whatsappContact || data.whatsappContact.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe seu número de WhatsApp",
        path: ["whatsappContact"],
      });
    }
  }

  if (data.country === "Outro" && (!data.countryOther || data.countryOther.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Informe seu país",
      path: ["countryOther"],
    });
  }

  if (data.howDidYouFind === "Outro" && (!data.howDidYouFindOther || data.howDidYouFindOther.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Informe como nos conheceu",
      path: ["howDidYouFindOther"],
    });
  }
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const leadFormDefaultValues: LeadFormData = {
  fullName: "",
  email: "",
  country: "",
  countryOther: "",
  phone: "",
  educationLevel: "",
  educationLevelOther: "",
  studyArea: "",
  graduationYear: "",
  isCurrentlyWorking: "",
  workArea: "",
  yearsExperience: "",
  previousWork: "",
  financialSituation: "",
  usaInterests: [],
  usaInterestsOther: "",
  englishLevel: "",
  howDidYouFind: "",
  howDidYouFindOther: "",
  contactPreference: "",
  whatsappContact: "",
  additionalMessage: "",
};
