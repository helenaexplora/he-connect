export function maskSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const masked = { ...data };

  if (masked.email) masked.email = "***@***.***";
  if (masked.phone) masked.phone = "***-***-****";
  if (masked.turnstileToken) masked.turnstileToken = "***";

  return masked;
}
