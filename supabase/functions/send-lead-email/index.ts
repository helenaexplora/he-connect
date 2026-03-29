import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "./constants.ts";
import { handleSendLeadEmail } from "./handlers/sendLeadEmail.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    return await handleSendLeadEmail(req);
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Erro interno." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
