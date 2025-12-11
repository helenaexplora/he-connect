import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY");
const RECIPIENT_EMAIL = "helenaexplora@hmpedro.com";

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60000;

function sanitizeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function maskSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const masked = { ...data };
  if (masked.email) masked.email = "***@***.***";
  if (masked.phone) masked.phone = "***-***-****";
  if (masked.turnstileToken) masked.turnstileToken = "***";
  return masked;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  // Allow bypass token for when Turnstile fails on client
  if (token === "bypass") {
    console.log("Turnstile bypassed due to client-side error");
    return true;
  }
  
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET!, response: token, remoteip: ip }),
    });
    const result = await response.json();
    return result.success;
  } catch (e) {
    console.error("Turnstile verification error:", e);
    return true; // Allow on verification error
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

async function sendEmail(to: string[], subject: string, html: string): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Helena Explora <noreply@helenaexplora.hmpedro.com>",
      to,
      subject,
      html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${error}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    if (!checkRateLimit(ip)) {
      console.log("Rate limit exceeded for IP:", ip.substring(0, 8) + "***");
      return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em 1 minuto." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await req.json();
    console.log("Received lead submission:", maskSensitiveData(data));

    // Verify Turnstile
    if (!await verifyTurnstile(data.turnstileToken, ip)) {
      return new Response(JSON.stringify({ error: "Verificação de segurança falhou." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { fullName, email, country, countryOther, phone, educationLevel, educationLevelOther,
      studyArea, graduationYear, yearsExperience, workArea, programType, programTypeOther,
      mainQuestions, investmentCapacity, scholarshipInterest, englishLevel, howDidYouFind,
      howDidYouFindOther, contactPreference, additionalMessage } = data;

    const leadHtml = `
      <h2>Novo Lead - Helena Explora</h2>
      <h3>Dados Pessoais</h3>
      <p><strong>Nome:</strong> ${sanitizeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
      <p><strong>País:</strong> ${sanitizeHtml(country === "Outro" ? countryOther || country : country)}</p>
      <p><strong>Telefone:</strong> ${sanitizeHtml(phone)}</p>
      <h3>Formação Académica</h3>
      <p><strong>Nível:</strong> ${sanitizeHtml(educationLevel === "Outro" ? educationLevelOther || educationLevel : educationLevel)}</p>
      <p><strong>Área:</strong> ${sanitizeHtml(studyArea)}</p>
      <p><strong>Ano de Conclusão:</strong> ${sanitizeHtml(graduationYear)}</p>
      <h3>Experiência Profissional</h3>
      <p><strong>Anos:</strong> ${sanitizeHtml(yearsExperience)}</p>
      <p><strong>Área:</strong> ${sanitizeHtml(workArea)}</p>
      <h3>Programa de Interesse</h3>
      <p><strong>Tipo:</strong> ${sanitizeHtml(programType === "Outro" ? programTypeOther || programType : programType)}</p>
      <p><strong>Dúvidas:</strong> ${sanitizeHtml(mainQuestions || "N/A")}</p>
      <h3>Financeiro</h3>
      <p><strong>Capacidade:</strong> ${sanitizeHtml(investmentCapacity)}</p>
      <p><strong>Interesse em Bolsas:</strong> ${sanitizeHtml(scholarshipInterest)}</p>
      <h3>Inglês</h3>
      <p><strong>Nível:</strong> ${sanitizeHtml(englishLevel)}</p>
      <h3>Comunicação</h3>
      <p><strong>Como conheceu:</strong> ${sanitizeHtml(howDidYouFind === "Outro" ? howDidYouFindOther || howDidYouFind : howDidYouFind)}</p>
      <p><strong>Preferência:</strong> ${sanitizeHtml(contactPreference)}</p>
      <p><strong>Mensagem:</strong> ${sanitizeHtml(additionalMessage || "N/A")}</p>
    `;

    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0a2458;">Olá, explorador(a)! ✨</h1>
        <p>Muito obrigada por preencher o formulário. Eu sou a Helena e compartilho conteúdos baseados na minha experiência pessoal como estudante internacional aqui nos Estados Unidos.</p>
        <p>A partir de agora, você receberá:</p>
        <ul>
          <li>Materiais educativos sobre estudo nos EUA</li>
          <li>Informações gerais sobre CPT e programas com estágio</li>
          <li>Dicas de inglês e vida acadêmica</li>
          <li>Experiências reais sobre a jornada F-1</li>
        </ul>
        <p>Aqui estão também minhas redes sociais para acompanhar mais conteúdos:</p>
        <p>
          <a href="https://www.youtube.com/@helenaexplora">YouTube</a> |
          <a href="https://www.instagram.com/helenaexplora_usa">Instagram</a> |
          <a href="https://www.tiktok.com/@helenaexplora">TikTok</a>
        </p>
        <p>Fico muito feliz por ter você aqui. Vamos explorar esta jornada juntos! 💙✈️</p>
        <p>Carinhosamente,<br><strong>Helena Explora</strong></p>
      </div>
    `;

    await Promise.all([
      sendEmail([RECIPIENT_EMAIL], `📋 Novo Lead: ${sanitizeHtml(fullName)}`, leadHtml),
      sendEmail([email], "🌎 Bem-vindo(a) à Comunidade Helena Explora!", welcomeHtml),
    ]);

    console.log("Emails sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Erro interno." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
