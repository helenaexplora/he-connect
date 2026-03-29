export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export const RECIPIENT_EMAIL = "helenaexplora@hmpedro.com";

export const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
export const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY");
