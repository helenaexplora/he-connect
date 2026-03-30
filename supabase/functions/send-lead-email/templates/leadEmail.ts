import type { LeadSubmissionData } from "../types.ts";
import { sanitizeHtml } from "../utils/sanitize.ts";
import { mapLeadSubmissionToEmailSections } from "./leadEmailPresentation.ts";

const renderField = (label: string, value: string) =>
  `<p><strong>${sanitizeHtml(label)}:</strong> ${sanitizeHtml(value)}</p>`;

const renderSection = (
  title: string,
  fields: { label: string; value: string }[],
) => `
      <h3>${sanitizeHtml(title)}</h3>
      ${fields.map((field) => renderField(field.label, field.value)).join("\n")}
    `;

export function buildLeadEmailHtml(data: LeadSubmissionData) {
  const sections = mapLeadSubmissionToEmailSections(data);

  return `
      <h2>Novo Lead - Helena Explora</h2>
      ${sections.map((section) => renderSection(section.title, section.fields)).join("\n")}
    `;
}

export function buildLeadEmailSubject(fullName: string) {
  return `📋 Novo Lead: ${sanitizeHtml(fullName)}`;
}
