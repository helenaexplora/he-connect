import { RESEND_API_KEY } from "../constants.ts";

export async function sendEmail(to: string[], subject: string, html: string): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: "Helena Explora <ola@helenaexplora.hmpedro.com>",
      to,
      subject,
      html,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
      tags: [{ name: "category", value: "lead" }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${error}`);
  }
}
