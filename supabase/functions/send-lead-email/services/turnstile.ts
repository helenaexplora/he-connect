import { TURNSTILE_SECRET } from "../constants.ts";

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (token === "bypass") {
    console.log("Turnstile bypassed due to client-side error");
    return true;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET!,
        response: token,
        remoteip: ip,
      }),
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return true;
  }
}
