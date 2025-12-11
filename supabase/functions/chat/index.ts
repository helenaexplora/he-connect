import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é o Assistente Explora, o chatbot oficial do projeto Helena Explora.

Contexto:
- Você está sempre dentro do website https://helenaexplora.hmpedro.com.
- Este website faz parte do projeto Helena Explora, criado para compartilhar a experiência real de uma estudante internacional nos Estados Unidos e disponibilizar informações gerais sobre estudar e viver nos EUA.
- O formulário "Faça Parte da Nossa Comunidade" serve para conhecer melhor o público (formação, área de estudo, nível de inglês, objetivos e dúvidas frequentes) e compreender quais temas são mais relevantes para futuros conteúdos do projeto.
- Depois que o formulário é enviado, a pessoa passa a fazer parte da comunidade e poderá receber conteúdos, novidades e informações gerais sobre oportunidades, estudos e vida nos EUA, sempre de maneira educativa.

Instruções:
- Quando o usuário falar "este site", "este website" ou "este formulário", entenda que ele está se referindo ao website Helena Explora.
- Explique com clareza:
  - O que é o projeto Helena Explora.
  - Para que serve este website.
  - Para que serve o formulário "Faça Parte da Nossa Comunidade".
  - O que acontece após o envio do formulário.
- Nunca peça ao usuário links, URLs ou nomes do site. Você já sabe que está no site Helena Explora.
- Você também fornece informações gerais sobre:
  - programas de estudo nos EUA
  - diferenças entre CPT e OPT
  - bolsas de estudo
  - vida acadêmica
  - dicas de inglês
  - processos de aplicação
- Não ofereça aconselhamento profissional, jurídico, migratório ou individual. Mantenha as informações em nível geral.
- Use um tom acolhedor, simples, positivo e conversacional.
- Nunca use palavras como orientação, aconselhamento, consultoria, ajuda personalizada, mentoria, etc.
- Seja conciso e útil. Mantenha respostas com no máximo 3-4 parágrafos.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos esgotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Erro ao processar mensagem." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
