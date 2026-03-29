import type { LeadSubmissionData } from "../types.ts";
import { sanitizeHtml } from "../utils/sanitize.ts";

function formatInterests(data: LeadSubmissionData) {
  const interestsArray = Array.isArray(data.usaInterests) ? data.usaInterests : [];

  if (interestsArray.length > 0) {
    return interestsArray.join(", ") + (data.usaInterestsOther ? `, ${data.usaInterestsOther}` : "");
  }

  return data.usaInterestsOther || "Nenhum selecionado";
}

function buildWorkExperienceHtml(data: LeadSubmissionData) {
  if (data.isCurrentlyWorking === "Sim, trabalho atualmente") {
    return `<p><strong>Situação:</strong> Trabalha atualmente</p>
         <p><strong>Anos de Experiência:</strong> ${sanitizeHtml(data.yearsExperience || "N/A")}</p>
         <p><strong>Área de Atuação:</strong> ${sanitizeHtml(data.workArea || "N/A")}</p>`;
  }

  if (data.isCurrentlyWorking === "Não, estou buscando oportunidades") {
    return `<p><strong>Situação:</strong> Buscando oportunidades</p>
         <p><strong>Experiência Anterior:</strong> ${sanitizeHtml(data.previousWork || "N/A")}</p>`;
  }

  return `<p><strong>Situação:</strong> ${sanitizeHtml(data.isCurrentlyWorking || "N/A")}</p>`;
}

function buildContactHtml(data: LeadSubmissionData) {
  if (data.contactPreference === "WhatsApp") {
    return `<p><strong>Preferência:</strong> WhatsApp</p>
         <p><strong>Número WhatsApp:</strong> ${sanitizeHtml(data.whatsappContact || "N/A")}</p>`;
  }

  return `<p><strong>Preferência:</strong> ${sanitizeHtml(data.contactPreference)}</p>`;
}

export function buildLeadEmailHtml(data: LeadSubmissionData) {
  return `
      <h2>Novo Lead - Helena Explora</h2>
      <h3>Dados Pessoais</h3>
      <p><strong>Nome:</strong> ${sanitizeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(data.email)}</p>
      <p><strong>País:</strong> ${sanitizeHtml(data.country === "Outro" ? data.countryOther || data.country : data.country)}</p>
      <p><strong>Telefone:</strong> ${sanitizeHtml(data.phone || "N/A")}</p>
      <h3>Formação Acadêmica</h3>
      <p><strong>Nível:</strong> ${sanitizeHtml(data.educationLevel === "Outro" ? data.educationLevelOther || data.educationLevel : data.educationLevel)}</p>
      <p><strong>Área de Estudo:</strong> ${sanitizeHtml(data.studyArea)}</p>
      <p><strong>Ano de Conclusão:</strong> ${sanitizeHtml(data.graduationYear)}</p>
      <h3>Experiência Profissional</h3>
      ${buildWorkExperienceHtml(data)}
      <h3>Situação Financeira</h3>
      <p><strong>Situação:</strong> ${sanitizeHtml(data.financialSituation)}</p>
      <h3>Interesses Relacionados aos EUA</h3>
      <p><strong>Interesses:</strong> ${sanitizeHtml(formatInterests(data))}</p>
      <h3>Nível de Inglês</h3>
      <p><strong>Nível:</strong> ${sanitizeHtml(data.englishLevel)}</p>
      <h3>Comunicação</h3>
      <p><strong>Como conheceu:</strong> ${sanitizeHtml(data.howDidYouFind === "Outro" ? data.howDidYouFindOther || data.howDidYouFind : data.howDidYouFind)}</p>
      ${buildContactHtml(data)}
      <p><strong>Mensagem Adicional:</strong> ${sanitizeHtml(data.additionalMessage || "N/A")}</p>
    `;
}

export function buildLeadEmailSubject(fullName: string) {
  return `📋 Novo Lead: ${sanitizeHtml(fullName)}`;
}
