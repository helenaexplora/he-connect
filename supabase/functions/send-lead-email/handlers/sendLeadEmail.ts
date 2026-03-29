import { RECIPIENT_EMAIL, corsHeaders } from "../constants.ts";
import { checkRateLimit } from "../services/rateLimit.ts";
import { sendEmail } from "../services/resend.ts";
import { verifyTurnstile } from "../services/turnstile.ts";
import { buildLeadEmailHtml, buildLeadEmailSubject } from "../templates/leadEmail.ts";
import { buildWelcomeEmailHtml, WELCOME_EMAIL_SUBJECT } from "../templates/welcomeEmail.ts";
import type { LeadSubmissionData } from "../types.ts";
import { maskSensitiveData } from "../utils/maskSensitiveData.ts";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getClientIp(req: Request) {
  return req.headers.get("x-forwarded-for") || "unknown";
}

export async function handleSendLeadEmail(req: Request) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    console.log("Rate limit exceeded for IP:", ip.substring(0, 8) + "***");
    return jsonResponse({ error: "Muitas requisições. Tente novamente em 1 minuto." }, 429);
  }

  const data = (await req.json()) as LeadSubmissionData;
  console.log("Received lead submission:", maskSensitiveData(data as Record<string, unknown>));

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return jsonResponse({ error: "Verificação de segurança falhou." }, 400);
  }

  await Promise.all([
    sendEmail([RECIPIENT_EMAIL], buildLeadEmailSubject(data.fullName), buildLeadEmailHtml(data)),
    sendEmail([data.email], WELCOME_EMAIL_SUBJECT, buildWelcomeEmailHtml()),
  ]);

  console.log("Emails sent successfully");
  return jsonResponse({ success: true });
}
