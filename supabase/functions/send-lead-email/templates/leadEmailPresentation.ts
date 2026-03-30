import type { LeadSubmissionData } from "../types.ts";

export interface LeadEmailField {
  label: string;
  value: string;
}

export interface LeadEmailSection {
  title: string;
  fields: LeadEmailField[];
}

const resolveOtherValue = (selectedValue: string, otherValue?: string) =>
  selectedValue === "Outro" ? otherValue || selectedValue : selectedValue;

const formatInterests = (data: LeadSubmissionData) => {
  const interestsArray = Array.isArray(data.usaInterests) ? data.usaInterests : [];

  if (interestsArray.length > 0) {
    return interestsArray.join(", ") + (data.usaInterestsOther ? `, ${data.usaInterestsOther}` : "");
  }

  return data.usaInterestsOther || "Nenhum selecionado";
};

const buildWorkExperienceFields = (data: LeadSubmissionData): LeadEmailField[] => {
  if (data.isCurrentlyWorking === "Sim, trabalho atualmente") {
    return [
      { label: "Situação", value: "Trabalha atualmente" },
      { label: "Anos de Experiência", value: data.yearsExperience || "N/A" },
      { label: "Área de Atuação", value: data.workArea || "N/A" },
    ];
  }

  if (data.isCurrentlyWorking === "Não, estou buscando oportunidades") {
    return [
      { label: "Situação", value: "Buscando oportunidades" },
      { label: "Experiência Anterior", value: data.previousWork || "N/A" },
    ];
  }

  return [{ label: "Situação", value: data.isCurrentlyWorking || "N/A" }];
};

const buildCommunicationFields = (data: LeadSubmissionData): LeadEmailField[] => {
  const fields: LeadEmailField[] = [
    {
      label: "Como conheceu",
      value: resolveOtherValue(data.howDidYouFind, data.howDidYouFindOther),
    },
  ];

  if (data.contactPreference === "WhatsApp") {
    fields.push(
      { label: "Preferência", value: "WhatsApp" },
      { label: "Número WhatsApp", value: data.whatsappContact || "N/A" },
    );
  } else {
    fields.push({ label: "Preferência", value: data.contactPreference });
  }

  fields.push({ label: "Mensagem Adicional", value: data.additionalMessage || "N/A" });

  return fields;
};

export const mapLeadSubmissionToEmailSections = (
  data: LeadSubmissionData,
): LeadEmailSection[] => [
  {
    title: "Dados Pessoais",
    fields: [
      { label: "Nome", value: data.fullName },
      { label: "Email", value: data.email },
      { label: "País", value: resolveOtherValue(data.country, data.countryOther) },
      { label: "Telefone", value: data.phone || "N/A" },
    ],
  },
  {
    title: "Formação Acadêmica",
    fields: [
      {
        label: "Nível",
        value: resolveOtherValue(data.educationLevel, data.educationLevelOther),
      },
      { label: "Área de Estudo", value: data.studyArea },
      { label: "Ano de Conclusão", value: data.graduationYear },
    ],
  },
  {
    title: "Experiência Profissional",
    fields: buildWorkExperienceFields(data),
  },
  {
    title: "Situação Financeira",
    fields: [{ label: "Situação", value: data.financialSituation }],
  },
  {
    title: "Interesses Relacionados aos EUA",
    fields: [{ label: "Interesses", value: formatInterests(data) }],
  },
  {
    title: "Nível de Inglês",
    fields: [{ label: "Nível", value: data.englishLevel }],
  },
  {
    title: "Comunicação",
    fields: buildCommunicationFields(data),
  },
];
