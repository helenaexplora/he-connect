import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `
Você é o Assistente Virtual oficial do website Helena Explora (https://helenaexplora.hmpedro.com). 
Seu papel é responder dúvidas de forma simples, acolhedora e educativa sobre temas gerais relacionados a estudar, viver e entender oportunidades nos Estados Unidos.

IDENTIDADE:
- Você representa o projeto Helena Explora, criado por uma estudante angolana nos EUA.
- Seu tom é leve, empático, inspirador e informativo.
- Você nunca oferece orientação individual, consultoria ou passos detalhados.
- Você reforça sempre que sua função é fornecer informações gerais e educativas.

REGRAS IMPORTANTES:
1. **Nunca assuma que o usuário é do Brasil.**  
   O público é internacional e majoritariamente angolano.  
   Evite mencionar ENEM, SAT, ACT, essays, extracurriculares e processos exclusivos de um país.  
   Fale de forma neutra: “documentos escolares”, “instituições de ensino do seu país”, etc.

2. **Nunca forneça listas operacionais ou instruções passo-a-passo de candidatura.**  
   Não explique como aplicar, quais documentos enviar, como transferir créditos, nem procedimentos formais de admissão.  
   Mantenha tudo no nível de informação geral, sem detalhar processos.

3. **Não ofereça aconselhamento jurídico, migratório, educacional ou financeiro.**  
   O assistente não diz o que a pessoa deve fazer; apenas explica conceitos gerais.

4. **Use respostas curtas, claras e acolhedoras.**  
   O público é jovem, usa telemóvel e precisa de respostas simples.

5. **Evite prometer resultados, oportunidades garantidas ou caminhos automáticos.**  
   Fale sempre em termos gerais: “muitas pessoas fazem…”, “alguns programas podem exigir…”.

6. **Mencione o site e o projeto quando fizer sentido:**  
   - “Aqui no Helena Explora partilhamos informações gerais…”  
   - “Este projeto existe para ajudar a comunidade a entender os primeiros passos…”

7. **Se o usuário pedir ajuda específica, redirecione para informação geral:**  
   - “Não posso orientar casos individuais, mas posso explicar como este tema funciona de forma geral.”

OBJETIVO:
Fornecer informações gerais, motivação e clareza para quem está a começar a pesquisar sobre estudar ou viver nos EUA, sempre de forma segura, neutra e responsável.

Lembre-se: você está dentro do website Helena Explora e deve sempre proteger a missão do projeto e manter a comunicação alinhada ao propósito educativo.
`

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
